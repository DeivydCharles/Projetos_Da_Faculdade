# BarberDevLops

**BarberDevLops** — aplicação simples de site para barbearia com frontend estático e backend em Node.js + Express + SQLite.

---

## Sumário

1. [Visão Geral](#vis%C3%A3o-geral)
2. [Pré-requisitos](#pr%C3%A9-requisitos)
3. [Estrutura do Projeto](#estrutura-do-projeto)
4. [Instalação e Execução](#instala%C3%A7%C3%A3o-e-execu%C3%A7%C3%A3o)
5. [API (endpoints)](#api-endpoints)
6. [Banco de Dados](#banco-de-dados)
7. [Segurança e Boas Práticas](#seguran%C3%A7a-e-boas-pr%C3%A1ticas)
8. [Deploy / Produção](#deploy--produ%C3%A7%C3%A3o)
9. [Testes e Debug](#testes-e-debug)
10. [Possíveis Extensões](#poss%C3%ADveis-extens%C3%B5es)
11. [Licença](#licen%C3%A7a)

---

## Visão Geral

Este projeto oferece um **frontend estático** (HTML/CSS/JS) servido pela pasta `public/` e um **backend** em Node.js com Express que fornece rotas de **registro** e **login**, armazenando usuários em um banco **SQLite** local (`database.db`). A criptografia das senhas é feita com **bcryptjs**.

O objetivo é ser um ponto de partida simples e seguro para um sistema de autenticação em aplicações pequenas.

---

## Pré-requisitos

* Node.js (recomenda-se v14+ ou v16+)
* npm
* Git (opcional)

---

## Estrutura do Projeto

```
barberdevlops/
│
├── public/
│   ├── index.html         # Frontend (HTML) - página principal
│   ├── styles.css         # Estilos
│   └── funcionalidades.js # JS frontend (fetch para o backend)
│
├── server.js              # Servidor Express + rotas API
├── package.json
└── database.db            # Banco SQLite (criado automaticamente)
```

---

## Instalação e Execução

1. Clone o repositório (ou crie a pasta do projeto):

```bash
git clone <seu-repo-aqui> barberdevlops
cd barberdevlops
```

2. Instale dependências:

```bash
npm install express sqlite3 bcryptjs body-parser cors
```

3. Inicie o servidor:

```bash
node server.js
```

Por padrão o servidor roda em `http://localhost:3000` (ajustável no `server.js`). Abra o navegador e acesse `http://localhost:3000`.

> Obs: o arquivo `database.db` será criado automaticamente quando o servidor inicializar.

---

## API (endpoints)

### `POST /api/register`

Registra um novo usuário.

**Request body (JSON):**

```json
{
  "name": "Seu Nome",
  "email": "seu@email.com",
  "password": "suaSenha"
}
```

**Resposta de sucesso:**

```json
{ "success": true, "message": "Usuário registrado com sucesso!" }
```

**Erros comuns:**

* 400: campos faltando
* 400: e-mail já registrado
* 500: erro interno

### `POST /api/login`

Faz a autenticação do usuário.

**Request body (JSON):**

```json
{
  "email": "seu@email.com",
  "password": "suaSenha"
}
```

**Resposta de sucesso:**

```json
{ "success": true, "message": "Login bem-sucedido!" }
```

**Erros comuns:**

* 401: usuário não encontrado
* 401: senha incorreta
* 500: erro interno

### Exemplos com `curl`

Registrar:

```bash
curl -X POST http://localhost:3000/api/register \
  -H 'Content-Type: application/json' \
  -d '{"name":"João","email":"joao@example.com","password":"1234"}'
```

Login:

```bash
curl -X POST http://localhost:3000/api/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"joao@example.com","password":"1234"}'
```

---

## Banco de Dados

* Usamos **SQLite** para simplicidade. O arquivo `database.db` é criado automaticamente.
* A tabela `users` tem os campos: `id`, `name`, `email` (unique), `password` (hash).

**Observação:** SQLite é ótimo para desenvolvimento e projetos pequenos. Para produção em escala, considere PostgreSQL, MySQL ou outro banco relacional.

---

## Segurança e Boas Práticas

* **Hash de senhas:** usamos `bcryptjs` com salt (10 rounds no exemplo). Nunca armazene senhas em texto claro.
* **Validação:** valide e sanitize todos os inputs no backend (ex.: tamanho mínimo de senha, formato do e-mail).
* **HTTPS:** em produção, sempre sirva via HTTPS.
* **CORS:** atualmente `cors()` está habilitado de forma permissiva; restrinja o `origin` em ambiente de produção.
* **Tokens / Sessões:** este exemplo não cria sessões. Para manter usuário logado ✓ use JWT ou sessions (ex.: `express-session` + cookies seguros) — ver seção Possíveis Extensões.
* **Rate limiting / Proteção brute-force:** recomenda-se adicionar limitação de taxa nas rotas de login.

---

## Deploy / Produção

Sugestões para colocar em produção:

* Use um processo gerenciador (PM2, systemd) para rodar o Node.js.
* Configure variáveis de ambiente (`PORT`, `DATABASE_URL` caso troque de DB).
* Use um banco gerenciado (Postgres, MySQL) para maior confiabilidade.
* Configure backup automático do banco.
* Configure reverse proxy (NGINX) para servir arquivos estáticos e gerenciar HTTPS.

---

## Testes e Debug

* Logs do servidor aparecem no console ao rodar `node server.js`.
* Use ferramentas como Postman/Insomnia para testar rotas.
* Caso haja erro `SQLITE_BUSY` ou similar, reinicie o servidor e verifique se não há múltiplas conexões concorrentes.

---

## Possíveis Extensões

* Autenticação com **JWT** (tokens) e refresh tokens.
* Área de perfil do usuário (rota protegida) e upload de avatar.
* Agendamento real: persistir os agendamentos no banco, criar endpoints CRUD para horários.
* Painel administrativo para visualizar/gerenciar agendamentos e usuários.
* Mudar para um banco relacional em nuvem para produção.

---

## Troubleshooting (problemas comuns)

* **Erro `EADDRINUSE`**: porta já em uso — mude o `PORT` ou mate o processo que está usando a porta.
* **CORS**: se o frontend não conseguir chamar a API, verifique as configurações de CORS e a origem das requests.
* **SQLite lock**: certifique-se de não manipular o arquivo `database.db` simultaneamente com outro processo.

---

## Licença

Este projeto está sob a licença **MIT** — faça o fork, copie e adapte para seus propósitos.

---

## Contato

Se quiser que eu adicione autenticação JWT, endpoints para CRUD de agendamentos, integração com um painel admin ou deploy automático — me avisa que eu já te gero o código pronto e o passo a passo.
