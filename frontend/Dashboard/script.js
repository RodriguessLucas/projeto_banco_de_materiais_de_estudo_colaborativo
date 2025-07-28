// /Dashboard/script.js

document.addEventListener('DOMContentLoaded', () => {
    // ---- CONFIGURAÇÃO E SEGURANÇA ----
    const API_URL = 'http://localhost:5555';
    const token = localStorage.getItem('authToken');

    // Se não houver token, o usuário não está logado. Redireciona para o login.
    if (!token) {
        window.location.href = '../Login/login.html';
        return;
    }

    // ---- ELEMENTOS DA PÁGINA ----
    const userNameDisplay = document.getElementById('user-name-display');
    const userProfile = document.getElementById('user-profile');
    const materialsGrid = document.getElementById('materials-grid');

    // ---- LÓGICA DA PÁGINA ----

    // 1. Exibir nome do usuário e configurar o link para as configurações
    const userName = localStorage.getItem('userName');
    if (userName) {
        userNameDisplay.textContent = userName;
    }
    
    userProfile.addEventListener('click', () => {
        // Leva para a página de configurações ao clicar
        window.location.href = '../Configuracao/configuracoes.html';
    });

    // 2. Função para buscar e renderizar os materiais na tela
    async function fetchAndRenderMaterials() {
        try {
            const response = await fetch(`${API_URL}/materiais`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                // Se o token for inválido, redireciona para o login
                if (response.status === 401 || response.status === 403) {
                    localStorage.clear();
                    window.location.href = '../Login/login.html';
                }
                throw new Error('Falha ao buscar materiais.');
            }

            const materials = await response.json();
            
            // Limpa a mensagem "Carregando..."
            materialsGrid.innerHTML = ''; 

            if (materials.length === 0) {
                materialsGrid.innerHTML = '<p style="text-align: center;">Nenhum material compartilhado no momento.</p>';
                return;
            }

            // Exibe os materiais recebidos
            materials.forEach(material => {
                const card = document.createElement('div');
                card.className = 'material-card'; // Adicione estilos para esta classe no seu CSS
                
                card.innerHTML = `
                    <img src="https://via.placeholder.com/220x150.png?text=Preview" alt="Preview do Material">
                    <div class="card-title">${material.title}</div>
                `;
                materialsGrid.appendChild(card);
            });
            
        } catch (error) {
            console.error(error);
            materialsGrid.innerHTML = '<p style="text-align: center; color: red;">Ocorreu um erro ao carregar os materiais.</p>';
        }
    }

    // 3. Inicia a busca pelos materiais assim que a página carrega
    fetchAndRenderMaterials();
});