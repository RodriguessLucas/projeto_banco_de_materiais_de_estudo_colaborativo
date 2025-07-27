// /js/auth.js - VERSÃO AJUSTADA PARA O BACKEND EXISTENTE

// const API_URL = 'https://projeto-banco-de-materiais-de-estudo.onrender.com';


const API_URL = 'http://localhost:5555';
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // Lógica para o formulário de LOGIN
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault(); 

            // Os nomes das variáveis aqui não importam, podem continuar como 'email' e 'password'.
            const login = document.getElementById('email').value;
            const senha = document.getElementById('password').value;

            try {
                const response = await fetch(`${API_URL}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    // ===================================================================
                    // MUDANÇA 1: Enviando 'login' e 'senha' para o backend
                    // Pegamos os valores dos campos 'email' e 'password' do formulário
                    // e enviamos no JSON com as chaves que o backend espera.
                    body: JSON.stringify({ login: login, senha: senha }),
                    // ===================================================================
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Erro ao fazer login.');
                }

                const data = await response.json();
                
                // ===================================================================
                // MUDANÇA 2: Lendo a resposta que o backend envia ('usuarioDTO' e 'token')
                // O seu backend retorna um objeto com 'usuarioDTO' e 'token'.
                localStorage.setItem('authToken', data.token);
                // Assumindo que seu DTO tem as propriedades 'name' e 'id'.
                localStorage.setItem('userName', data.usuarioDTO.name);
                localStorage.setItem('userId', data.usuarioDTO.id);
                // ===================================================================

                alert('Login bem-sucedido!');
                window.location.href = '/home.html';

            } catch (error) {
                alert(error.message);
            }
        });
    }

    // A lógica de cadastro não precisa ser alterada, pois se refere a outra rota/controller.
    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const age = document.getElementById('age').value;
            const password = document.getElementById('password').value;
            
            try {
                 const response = await fetch(`${API_URL}/user`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, age: parseInt(age), password }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Erro ao cadastrar.');
                }
                
                alert('Cadastro realizado com sucesso! Você será redirecionado para a página de login.');
                window.location.href = '/index.html';

            } catch(error) {
                alert(error.message);
            }
        });
    }
});