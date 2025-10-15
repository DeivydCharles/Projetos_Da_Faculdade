document.addEventListener("DOMContentLoaded", () => {
  const loginModal = document.getElementById("loginModal");
  const registerModal = document.getElementById("registerModal");
  const loginTrigger = document.querySelector(".login-trigger");
  const registerTrigger = document.querySelector(".register-trigger");
  const loginError = document.getElementById("loginError");

  // === ABRIR MODAIS ===
  loginTrigger.addEventListener("click", (e) => {
    e.preventDefault();
    loginModal.style.display = "block";
  });

  registerTrigger.addEventListener("click", (e) => {
    e.preventDefault();
    registerModal.style.display = "block";
  });

  // === FECHAR MODAIS ===
  window.closeLoginModal = () => (loginModal.style.display = "none");
  window.closeRegisterModal = () => (registerModal.style.display = "none");

  // Fecha se clicar fora
  window.addEventListener("click", (event) => {
    if (event.target === loginModal) closeLoginModal();
    if (event.target === registerModal) closeRegisterModal();
  });

  // === LOGIN COM BACKEND ===
  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Login realizado com sucesso!");
        loginError.style.display = "none";
        closeLoginModal();
      } else {
        loginError.style.display = "block";
      }
    } catch (err) {
      alert("Erro ao conectar com o servidor.");
    }
  });

  // === REGISTRO COM BACKEND ===
  document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("register-name").value.trim();
    const email = document.getElementById("register-email").value.trim();
    const password = document.getElementById("register-password").value;
    const confirm = document.getElementById("register-confirm-password").value;

    if (password !== confirm) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Usuário registrado com sucesso!");
        closeRegisterModal();
      } else {
        alert(data.error || "Erro ao registrar.");
      }
    } catch (err) {
      alert("Erro ao conectar com o servidor.");
    }
  });
});
