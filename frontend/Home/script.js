function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'http://localhost:5555';
    
    
    const token = localStorage.getItem('authToken');

    
    if (!token) {
        window.location.href = './login.html';
        return;
    }


    const usernameDisplay = document.getElementById('username-display');
    const userAvatar = document.getElementById('user-avatar');
    const materialsGrid = document.getElementById('card-grid'); 
    const logoutLink = document.getElementById('logout-link');

    

    
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

            materials.forEach(material => {
                const cardLink = document.createElement('a');
                cardLink.href = `./detalhes-conteudo.html?id=${material.id}`;
                cardLink.className = 'card-link'; 
                
                const card = document.createElement('div');
                card.className = 'card'; 
                
                let previewSrc = '';

                if (material.mimetype && material.mimetype.startsWith('image/')) {
                    previewSrc = `${API_BASE_URL}/uploads/${material.caminho_arquivo}`;
                } 
                else if (material.mimetype === 'application/pdf') {
                    previewSrc = '../img/pdfpreview.png'; 
                } 
                
                else {
                    previewSrc = 'https://via.placeholder.com/300x200.png?text=Material';
                }
                
                card.innerHTML = `
                    <img src="${previewSrc}" alt="Preview do Material" style="object-fit: cover; height: 120px;">
                    <h2 style="font-size: 1rem; margin: 8px;">${material.nome_material.toUpperCase()}</h2>
                `;
                
                cardLink.appendChild(card);
                materialsGrid.appendChild(cardLink);
            });
            
        } catch (error) {
            console.error(error);
            materialsGrid.innerHTML = '<p style="text-align: center; color: red; width: 100%;">Ocorreu um erro ao carregar os materiais.</p>';
        }
    }
    
    loadUserInfo();
    fetchAndRenderMaterials();
});