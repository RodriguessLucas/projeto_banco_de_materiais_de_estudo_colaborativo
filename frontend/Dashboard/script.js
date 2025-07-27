// /Configuracao/script.js

document.addEventListener('DOMContentLoaded', () => {
    // ---- CONFIGURAÇÃO E SEGURANÇA ----
    const API_URL = 'http://localhost:5555';
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');

    // Proteção de Rota: Se não houver token ou ID, volta para o login.
    if (!token || !userId) {
        window.location.href = '../Login/login.html';
        return;
    }

    // ---- ELEMENTOS DA PÁGINA ----
    const configForm = document.getElementById('config-form');
    const nameInput = document.getElementById('user-name');
    const emailInput = document.getElementById('user-email');
    const passwordInput = document.getElementById('user-password');
    const saveButton = configForm.querySelector('button');

    // ---- LÓGICA DA PÁGINA ----

    // 1. Função para carregar os dados do usuário e preencher o formulário
    async function loadUserData() {
        try {
            // Busca os dados do perfil do usuário na API
            const response = await fetch(`${API_URL}/user/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Não foi possível carregar os dados do perfil.');
            }

            const userData = await response.json();

            // Preenche os campos do formulário com os dados recebidos
            nameInput.value = userData.name;
            emailInput.value = userData.email;

        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

    // 2. Evento para salvar as alterações do formulário
    configForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Impede o recarregamento da página

        const originalButtonText = saveButton.textContent;
        saveButton.textContent = 'Salvando...';
        saveButton.disabled = true;

        // Monta o objeto 'payload' apenas com os dados que serão atualizados
        const payload = {
            name: nameInput.value,
            email: emailInput.value,
        };

        // Apenas adiciona a senha ao payload se o usuário tiver digitado algo
        if (passwordInput.value) {
            payload.password = passwordInput.value;
        }

        try {
            // Envia os dados para a API para atualização (método PUT)
            const response = await fetch(`${API_URL}/user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Não foi possível salvar as alterações.');
            }

            const updatedUser = await response.json();
            
            // Atualiza o nome do usuário no localStorage para refletir a mudança no dashboard
            localStorage.setItem('userName', updatedUser.name);

            alert('Alterações salvas com sucesso!');

        } catch (error) {
            console.error(error);
            alert(error.message);
        } finally {
            saveButton.textContent = originalButtonText;
            saveButton.disabled = false;
        }
    });

    // Inicia a página carregando os dados do usuário
    loadUserData();
});