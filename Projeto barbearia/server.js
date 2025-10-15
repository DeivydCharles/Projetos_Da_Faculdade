const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const db = new sqlite3.Database('./database.db');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Cria tabela de usuários (se não existir)
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);
});

// ======= ROTA DE REGISTRO =======
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ error: 'Preencha todos os campos.' });

  // Criptografa a senha
  const hashedPassword = await bcrypt.hash(password, 10);

  db.run(
    `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
    [name, email, hashedPassword],
    function (err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ error: 'E-mail já registrado.' });
        }
        return res.status(500).json({ error: 'Erro ao registrar usuário.' });
      }

      res.json({ success: true, message: 'Usuário registrado com sucesso!' });
    }
  );
});

// ======= ROTA DE LOGIN =======
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (err) return res.status(500).json({ error: 'Erro no servidor.' });
    if (!user) return res.status(401).json({ error: 'Usuário não encontrado.' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Senha incorreta.' });

    res.json({ success: true, message: 'Login bem-sucedido!' });
  });
});

// ======= SERVIDOR RODANDO =======
const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Servidor rodando em http://localhost:${PORT}`));
