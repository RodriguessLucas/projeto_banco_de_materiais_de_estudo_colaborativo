// No arquivo: Perfil/script.js

document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'http://localhost:5555';
    const token = localStorage.getItem('authToken');

    if (!token) {
        window.location.href = './login.html';
        return;
    }

    // Seleção dos elementos do HTML
    const userNameElement = document.getElementById('user-name');
    const userEmailElement = document.getElementById('user-email');
    const userStarsElement = document.getElementById('user-stars');
    const userMaterialsGrid = document.getElementById('user-materials-grid'); 
    
    async function loadProfileData() {
        try {
            const response = await fetch(`${API_BASE_URL}/usuarios/perfil`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) {
                // ... (sua lógica de erro)
            }

            const profileData = await response.json();

            userNameElement.textContent = profileData.nome;
            userEmailElement.textContent = profileData.login;
            userStarsElement.textContent = profileData.qntd_estrelas; 

            renderUserMaterials(profileData.materiais_criados);

        } catch (error) {
            console.error('Erro ao carregar perfil:', error);
            alert(error.message);
        }
    }

    function renderUserMaterials(materials) {
        userMaterialsGrid.innerHTML = ''; 

        if (!materials || materials.length === 0) {
            userMaterialsGrid.innerHTML = '<p>Você ainda não compartilhou nenhum material.</p>';
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
            } else if (material.mimetype === 'application/pdf') {
                previewSrc = '../img/pdfpreview.png';
            } else {
                previewSrc = 'https://via.placeholder.com/300x200.png?text=Material';
            }

            card.innerHTML = `
                <img src="${previewSrc}" alt="Preview do Material">
                <h2>${material.nome_material.toUpperCase()}</h2>
            `;

            cardLink.appendChild(card);
            userMaterialsGrid.appendChild(cardLink);
        });
    }

    loadProfileData();
});