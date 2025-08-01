// Funções de menu lateral (mantidas)
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
        alert('Você precisa estar logado para adicionar conteúdo.');
        window.location.href = './login.html';
        return;
    }
    
    const usernameDisplay = document.getElementById('username-display');

    function loadUserInfo() {
        const username = localStorage.getItem('userName');
        if (usernameDisplay && username) {
            usernameDisplay.textContent = username;
        }
    }
    

    const addContentForm = document.getElementById('addContentForm');
    const materialFileInput = document.getElementById('materialFile');
    const fileNameSpan = document.getElementById('fileName'); // Pega o <span> para o nome do arquivo
    const titleInput = document.getElementById('title');
    const materiaNameInput = document.getElementById('materia-name');
    const categoryNameInput = document.getElementById('category-name');
    const descriptionInput = document.getElementById('description');
    const institutionInput = document.getElementById('institution');
    const courseInput = document.getElementById('course');
    const professorInput = document.getElementById('professor');
    const addButton = document.getElementById('addButton');
    const feedbackMessage = document.getElementById('feedbackMessage');


    materialFileInput.addEventListener('change', () => {
        if (materialFileInput.files.length > 0) {
            fileNameSpan.textContent = materialFileInput.files[0].name;
        } else {
            fileNameSpan.textContent = 'Nenhum arquivo escolhido';
        }
    });
    // FIM DA CORREÇÃO

    addContentForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        feedbackMessage.textContent = '';
        addButton.disabled = true;

        const file = materialFileInput.files[0];
        const title = titleInput.value.trim();
        const nomeMateria = materiaNameInput.value.trim();
        const nomeCategoria = categoryNameInput.value.trim();
        const description = descriptionInput ? descriptionInput.value.trim() : '';
        const institution = institutionInput ? institutionInput.value.trim() : '';
        const course = courseInput ? courseInput.value.trim() : '';
        const professor = professorInput ? professorInput.value.trim() : '';

        if (!file || !title || !nomeMateria) {
            feedbackMessage.textContent = 'Arquivo, título e nome da matéria são obrigatórios.';
            feedbackMessage.className = 'feedback-message error';
            addButton.disabled = false;
            return;
        }

        try {
            addButton.textContent = 'Verificando matéria...';
            const materiaResponse = await fetch(`${API_BASE_URL}/materias`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    nome_materia: nomeMateria,
                    nome_categoria: nomeCategoria || 'Genérico'
                })
            });

            if (!materiaResponse.ok) {
                const errorData = await materiaResponse.json();
                throw new Error(`Erro na matéria: ${errorData.message || 'Não foi possível verificar a matéria.'}`);
            }

            const materiaData = await materiaResponse.json();
            const materiaId = materiaData.id;

            if (!materiaId) {
                throw new Error('Não foi possível obter o ID da matéria da resposta da API.');
            }
            
            addButton.textContent = 'Enviando arquivo...';
            const formData = new FormData();
            
            formData.append('arquivo', file);
            formData.append('nome_material', title);
            formData.append('id_materia', materiaId);
            formData.append('descricao_material', description);
            formData.append('instituicao', institution);
            formData.append('curso', course);
            formData.append('nome_professor', professor);

            const uploadResponse = await fetch(`${API_BASE_URL}/usuario/cadastrarMateriais`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData,
            });

            const uploadData = await uploadResponse.json();

            if (uploadResponse.ok) {
                feedbackMessage.textContent = 'Material adicionado com sucesso!';
                feedbackMessage.className = 'feedback-message success';
                addContentForm.reset();
                setTimeout(() => { window.location.href = 'home.html'; }, 1500);
            } else {
                throw new Error(`Erro no upload: ${uploadData.message || 'Não foi possível enviar o arquivo.'}`);
            }
        } catch (error) {
            feedbackMessage.textContent = error.message;
            feedbackMessage.className = 'feedback-message error';
        } finally {
            addButton.disabled = false;
            addButton.textContent = 'Adicionar';
        }
    });

    loadUserInfo();
});