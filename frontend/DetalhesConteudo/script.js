// Funções de menu lateral
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'http://localhost:5555';
    const token = localStorage.getItem('authToken');
    
    const usernameDisplay = document.getElementById('username-display');

    function loadUserInfo() {
        const username = localStorage.getItem('userName');
        if (usernameDisplay && username) {
            usernameDisplay.textContent = username;
        }
    }

    if (!token) {
        window.location.href = './login.html';
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const materialId = urlParams.get('id');

    const materialTitle = document.getElementById('material-title');
    const materialDescription = document.getElementById('material-description');
    const materialAuthor = document.getElementById('material-author');
    const materialDate = document.getElementById('material-date');
    const materialPreview = document.getElementById('material-preview');
    const downloadButton = document.getElementById('download-button');
    const previewLink = document.getElementById('preview-link');

    async function fetchMaterialDetails() {
        if (!materialId) {
            document.querySelector('.main-content').innerHTML = '<h1>ID do material não fornecido.</h1>';
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/materiais/${materialId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) {
                throw new Error('Material não encontrado.');
            }

            const material = await response.json();

            // Preenche os elementos da página
            materialTitle.textContent = material.nome_material.toUpperCase();
            materialDescription.textContent = material.descricao_material || 'Nenhuma descrição fornecida.';
            materialAuthor.textContent = material.criador ? material.criador.nome : 'Autor desconhecido';
            materialDate.textContent = new Date(material.createdAt).toLocaleDateString('pt-BR');
            
            // Lógica de preview (continua a mesma)
            if (material.mimetype && material.mimetype.startsWith('image/')) {
                materialPreview.src = `${API_BASE_URL}/uploads/${material.caminho_arquivo}`;
            } else {
                materialPreview.src = '../img/pdfpreview.png';
            }

            downloadButton.dataset.materialId = material.id;
            previewLink.dataset.materialId = material.id;

        } catch (error) {
            console.error(error);
            document.querySelector('.main-content').innerHTML = `<h1>Erro ao carregar material: ${error.message}</h1>`;
        }
    }


    async function handleDownload(event) {
        event.preventDefault();
        const materialId = event.currentTarget.dataset.materialId;
        if (!materialId) return;

        try {
            const response = await fetch(`${API_BASE_URL}/materiais/${materialId}/download`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Falha no download.');
            }

           
            const disposition = response.headers.get('content-disposition');
            let filename = 'material.bin';
            if (disposition && disposition.includes('attachment')) {
                const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                const matches = filenameRegex.exec(disposition);
                if (matches != null && matches[1]) { 
                filename = matches[1].replace(/['"]/g, '');
                }
            }

            
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

        } catch(error) {
            console.error('Erro ao baixar o arquivo:', error);
            alert(error.message);
        }
    }

    loadUserInfo();
    fetchMaterialDetails();


    downloadButton.addEventListener('click', handleDownload);
    previewLink.addEventListener('click', handleDownload);
});