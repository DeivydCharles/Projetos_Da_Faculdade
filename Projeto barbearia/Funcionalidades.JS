// Abrir modal de registro
function openRegisterModal() {
  document.getElementById('registerModal').style.display = 'flex';
}

// Fechar modal de registro
function closeRegisterModal() {
  document.getElementById('registerModal').style.display = 'none';
}

// Validar e processar o formulário de registro
document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const confirmPassword = document.getElementById('register-confirm-password').value;

  if (password !== confirmPassword) {
    alert('As senhas não coincidem!');
    return;
  }

  // Aqui você pode adicionar o código para enviar o registro para o servidor.
  alert(`Registro realizado com sucesso para ${name}!`);
  closeRegisterModal();
});

// Abrir modal de login
function openLoginModal() {
  document.getElementById('loginModal').style.display = 'flex';
}

// Fechar modal de login
function closeLoginModal() {
  document.getElementById('loginModal').style.display = 'none';
}

// Simulação de validação de login
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Simulação de validação (substitua por lógica de autenticação real)
  if (username === 'admin' && password === '1234') {
    alert('Login realizado com sucesso!');
    closeLoginModal();
  } else {
    document.getElementById('loginError').style.display = 'block';
  }
});