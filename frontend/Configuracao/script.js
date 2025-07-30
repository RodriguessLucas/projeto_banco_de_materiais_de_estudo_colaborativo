document.addEventListener('DOMContentLoaded', function() {
    const API_BASE_URL = 'http://localhost:5555';
    const profileForm = document.getElementById('profileForm');
    
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = './login.html';
        return;
    }

    const nameInput = document.getElementById('name');
    const nameError = document.getElementById('nameError');
    const toast = document.getElementById('toast');
    const imageUpload = document.getElementById('imageUpload');
    const uploadButton = document.getElementById('upload-button');
    const removeButton = document.getElementById('remove-button');
    const imagePreview = document.getElementById('imagePreview');
    const defaultIcon = document.querySelector('.default-icon');

    loadProfileData();
    
    uploadButton.addEventListener('click', () => imageUpload.click());

    profileForm.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateForm()) {
            saveProfileData(); 
        }
    });

    function validateForm() {
        const nameValue = nameInput.value.trim();
        let isValid = true;
        nameError.textContent = '';
        nameInput.classList.remove('error');
        if (nameValue === '') {
            nameError.textContent = 'O campo Nome é obrigatório.';
            nameInput.classList.add('error');
            isValid = false;
        } else if (nameValue.length < 3) {
            nameError.textContent = 'O nome deve ter no mínimo 3 caracteres.';
            nameInput.classList.add('error');
            isValid = false;
        }
        return isValid;
    }
    
    async function saveProfileData() {
        const nameValue = nameInput.value.trim();

        try {
            const response = await fetch(`${API_BASE_URL}/usuarios/perfil`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify({ nome: nameValue }), 
            });

            const updatedProfile = await response.json();

            if (!response.ok) {
                throw new Error(updatedProfile.erro || 'Não foi possível atualizar o perfil.');
            }

        
            localStorage.setItem('userName', updatedProfile.nome);
            
            
            alert("Perfil salvo com sucesso!");
            window.location.href = 'home.html';

        } catch (error) {
            console.error('Erro ao salvar perfil:', error);
            alert(`Erro: ${error.message}`); 
        }
    }

    function loadProfileData() {
        const savedUsername = localStorage.getItem('loggedInUsername');
        const savedAvatar = localStorage.getItem('loggedInUserAvatar');

        if (savedUsername) {
            nameInput.value = savedUsername;
        }

        if (savedAvatar) {
            imagePreview.src = savedAvatar;
            imagePreview.style.display = 'block';
            defaultIcon.style.display = 'none';
        }
    }
});