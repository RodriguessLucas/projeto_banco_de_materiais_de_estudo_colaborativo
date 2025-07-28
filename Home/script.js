// Funções do menu lateral
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'https://projeto-banco-de-materiais-de-estudo.onrender.com';
    
    const token = localStorage.getItem('authToken');

    
    if (!token) {
        window.location.href = './login.html';
        return;
    }

    // ---- ELEMENTOS DA PÁGINA ----
    const usernameDisplay = document.getElementById('username-display');
    const userAvatar = document.getElementById('user-avatar');
    const materialsGrid = document.getElementById('card-grid'); 
    const logoutLink = document.getElementById('logout-link');

    // ---- LÓGICA DA PÁGINA ----

    // 1. Carrega informações do usuário do localStorage
    function loadUserInfo() {
        const username = localStorage.getItem('userName'); 
        const userAvatarUrl = localStorage.getItem('userAvatar'); 

        if (usernameDisplay && username) {
            usernameDisplay.textContent = username;
        }
        if (userAvatar && userAvatarUrl) {
            userAvatar.src = userAvatarUrl;
        }
    }
    
    // 2. Configura o botão de Sair
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.clear();
            window.location.href = './login.html';
        });
    }

    async function fetchAndRenderMaterials() {
        try {
            const response = await fetch(`${API_BASE_URL}/materiais`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    localStorage.clear();
                    window.location.href = './login.html';
                }
                throw new Error('Falha ao buscar materiais.');
            }

            const materials = await response.json();
            
            materialsGrid.innerHTML = '';

            if (materials.length === 0) {
                materialsGrid.innerHTML = '<p style="text-align: center; width: 100%;">Nenhum material compartilhado no momento.</p>';
                return;
            }

            // Exibe os materiais recebidos
            materials.forEach(material => {
                const cardLink = document.createElement('a');
              
                
                const card = document.createElement('div');
                card.className = 'card'; 
                
                card.innerHTML = `
                    <img src="https://via.placeholder.com/300x200.png?text=Preview" alt="Preview do Material">
                    <h2>${material.title.toUpperCase()}</h2>
                `;
                
                cardLink.appendChild(card);
                materialsGrid.appendChild(cardLink);
            });
            
        } catch (error) {
            console.error(error);
            materialsGrid.innerHTML = '<p style="text-align: center; color: red; width: 100%;">Ocorreu um erro ao carregar os materiais.</p>';
        }
    }

    // --- INICIALIZAÇÃO ---
    loadUserInfo();
    fetchAndRenderMaterials();
});