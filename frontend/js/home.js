// /js/home.js

const API_URL = 'http://localhost:5555';

document.addEventListener('DOMContentLoaded', () => {

    // --- PROTEÇÃO DA ROTA ---
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = '/index.html'; // Se não há token, volta para o login
        return;
    }

    // --- LÓGICA DE BOAS-VINDAS E LOGOUT ---
    const userName = localStorage.getItem('userName');
    const welcomeMessage = document.getElementById('welcome-message');
    const logoutButton = document.getElementById('logout-button');

    if (welcomeMessage && userName) {
        welcomeMessage.textContent = `Bem-vindo(a), ${userName}!`;
    }

    // Funcionalidade do botão de logout
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.clear(); // Limpa tudo (token, nome, id)
            window.location.href = '/index.html'; // Volta para a página de login
        });
    }

    // --- LÓGICA PARA BUSCAR DADOS DA API ---
    async function fetchMaterials() {
        const materialsContainer = document.getElementById('materials-container');
        try {
            const response = await fetch(`${API_URL}/content`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Falha ao buscar materiais.');
            }

            const materials = await response.json();
            
            // Limpa a mensagem "Carregando..."
            materialsContainer.innerHTML = ''; 

            if (materials.length === 0) {
                materialsContainer.innerHTML = '<p style="text-align: center;">Nenhum material encontrado.</p>';
                return;
            }

            // Para cada material, cria um "card" e adiciona na tela
            materials.forEach(material => {
                const card = document.createElement('div');
                card.className = 'material-card'; // Adicione estilos para .material-card no seu CSS
                card.innerHTML = `
                    <h3>${material.title}</h3>
                    <p>Categoria: ${material.category}</p>
                    <button>Baixar</button>
                `;
                materialsContainer.appendChild(card);
            });
            
        } catch (error) {
            console.error(error);
            materialsContainer.innerHTML = '<p style="text-align: center; color: red;">Ocorreu um erro ao carregar os materiais.</p>';
        }
    }

    fetchMaterials();
});