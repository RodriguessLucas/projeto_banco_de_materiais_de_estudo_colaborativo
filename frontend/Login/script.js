// /Login/script.js

document.addEventListener('DOMContentLoaded', () => {
    // Definindo a URL da API aqui para testes locais
    const API_BASE_URL = 'http://localhost:5555';

    // Selecionando os elementos do HTML
    const loginForm = document.getElementById("login-form");
    const emailInput = document.getElementById("login-nome");
    const senhaInput = document.getElementById("login-senha");
    const msg = document.getElementById("msgLogin");
    const loginButton = document.getElementById("loginButton");

    // Usando o evento 'submit' do formulário
    loginForm.addEventListener('submit', async (event) => {
        // Impede que a página recarregue ao enviar o formulário
        event.preventDefault();

        const email = emailInput.value.trim();
        const password = senhaInput.value;

        // Limpa mensagens de erro anteriores
        msg.textContent = "";

        // Validação
        if (email === "" || password === "") {
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
                // MUDANÇA CRÍTICA: Enviando 'login' e 'senha' como o backend espera
                body: JSON.stringify({ login: email, senha: password }),
            });

            const data = await response.json();

            if (response.ok) {
                msg.style.color = "green";
                msg.textContent = "Login bem-sucedido! Redirecionando...";

                // MUDANÇA CRÍTICA: Salvando os dados corretos que a API retorna
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('userName', data.usuarioDTO.name);
                localStorage.setItem('userId', data.usuarioDTO.id);

                // Redireciona para a página do dashboard após o login
                setTimeout(() => {
                    window.location.href = "../dashboard.html";
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