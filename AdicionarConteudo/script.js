import { API_BASE_URL } from "../config";

// Funções de menu lateral (mantidas)
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

document.addEventListener('DOMContentLoaded', () => {
    
    
    const token = localStorage.getItem('authToken');

    if (!token) {
        alert('Você precisa estar logado para adicionar conteúdo.');
        window.location.href = '../login.html';
        return;
    }

    
    const addContentForm = document.getElementById('addContentForm');
    const materialFileInput = document.getElementById('materialFile');
    const titleInput = document.getElementById('title');
    const materiaNameInput = document.getElementById('materia-name');
    const categoryNameInput = document.getElementById('category-name');
    const addButton = document.getElementById('addButton');
    const feedbackMessage = document.getElementById('feedbackMessage');
    

    
    addContentForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        feedbackMessage.textContent = '';
        addButton.disabled = true;

        // Pega os valores dos campos
        const file = materialFileInput.files[0];
        const title = titleInput.value.trim();
        const nomeMateria = materiaNameInput.value.trim();
        const nomeCategoria = categoryNameInput.value.trim();

        // Validação simples
        if (!file || !title || !nomeMateria || !nomeCategoria) {
            feedbackMessage.textContent = 'Todos os campos são obrigatórios.';
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
                    nome_categoria: nomeCategoria
                })
            });

            if (!materiaResponse.ok) {
                const errorData = await materiaResponse.json();
                throw new Error(`Erro na matéria: ${errorData.message || 'Não foi possível verificar a matéria.'}`);
            }

            const materiaData = await materiaResponse.json();
            const materiaId = materiaData.id_materia; 

            if (!materiaId) {
                throw new Error('Não foi possível obter o ID da matéria da resposta da API.');
            }

            
            addButton.textContent = 'Enviando arquivo...';
            const formData = new FormData();
            formData.append('title', title);
            formData.append('id_materia', materiaId); 
            formData.append('arquivo', file);

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
                setTimeout(() => { window.location.href = '../home.html'; }, 1500);
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

});