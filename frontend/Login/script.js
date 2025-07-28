// /Login/script.js

document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'http://localhost:5555';

    const loginForm = document.getElementById("login-form");
    const emailInput = document.getElementById("login-nome");
    const senhaInput = document.getElementById("login-senha");
    const msg = document.getElementById("msgLogin");
    const loginButton = document.getElementById("loginButton");

    loginForm.addEventListener('submit', async (event) => {
        
        event.preventDefault();

        const login = emailInput.value.trim();
        const password = senhaInput.value;

        // Limpa mensagens de erro anteriores
        msg.textContent = "";

        // Validação
        if (login === "" || password === "") {
            msg.textContent = "Por favor, preencha todos os campos!";
            return;
        }

        loginButton.disabled = true;
        loginButton.textContent = "Entrando...";

        try {
            // Requisição para a API
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login: login, senha: password }),
            });

            const data = await response.json();

            if (response.ok) {
                msg.style.color = "green";
                msg.textContent = "Login bem-sucedido! Redirecionando...";

                localStorage.setItem('authToken', data.token);
                localStorage.setItem('userName', data.usuarioDTO.name);
                localStorage.setItem('userId', data.usuarioDTO.id);

               
                setTimeout(() => {
                    window.location.href = "./dashboard.html";
                }, 1000);
            } else {
                msg.style.color = "red";
                msg.textContent = data.message || "Email ou senha inválidos.";
            }
        } catch (error) {
            console.error("Erro na requisição de login:", error);
            msg.style.color = "red";
            msg.textContent = "Erro de conexão com o servidor. Tente mais tarde.";
        } finally {
            loginButton.disabled = false;
            loginButton.textContent = "Entrar";
        }
    });
});