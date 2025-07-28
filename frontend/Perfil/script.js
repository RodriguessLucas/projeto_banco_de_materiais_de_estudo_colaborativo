// /Perfil/script.js

document.addEventListener('DOMContentLoaded', () => {
    // ---- CONFIGURAÇÃO E SEGURANÇA ----
    const API_URL = 'https://projeto-banco-de-materiais-de-estudo.onrender.com';
    const token = localStorage.getItem('authToken');

    if (!token) {
        window.location.href = './login.html';
        return;
    }

    // ---- SELEÇÃO DOS ELEMENTOS DO HTML (AJUSTADO) ----
    const userNameElement = document.getElementById('user-name');
    const userEmailElement = document.getElementById('user-email');
    const userStarsElement = document.getElementById('user-stars'); // Novo elemento
    
    // ---- LÓGICA PRINCIPAL ----
    async function loadProfileData() {
        try {
            const response = await fetch(`${API_URL}/usuarios/perfil`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                localStorage.clear();
                window.location.href = './login.html';
                throw new Error('Sessão inválida. Por favor, faça o login novamente.');
            }

            const profileData = await response.json();

            // Preenche os campos do HTML com os dados da API (AJUSTADO)
            userNameElement.textContent = profileData.nome;
            userEmailElement.textContent = profileData.login;
            // A API retorna o campo como 'qntd_estrelas'
            userStarsElement.textContent = profileData.qntd_estrelas; 

        } catch (error) {
            console.error('Erro ao carregar perfil:', error);
            alert(error.message);
        }
    }

    // Chama a função para carregar os dados
    loadProfileData();
});