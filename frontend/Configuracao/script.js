document.addEventListener('DOMContentLoaded', function() {
    const API_BASE_URL = 'http://localhost:5555';
    const profileForm = document.getElementById('profileForm');
    const nameInput = document.getElementById('name');
    const nameError = document.getElementById('nameError');
    const toast = document.getElementById('toast');
    const imageUpload = document.getElementById('imageUpload');
    const uploadButton = document.getElementById('upload-button');
    const removeButton = document.getElementById('remove-button');
    const imagePreview = document.getElementById('imagePreview');
    const defaultIcon = document.querySelector('.default-icon');

    // Carrega os dados salvos quando a página de configurações abrir
    loadProfileData();
    
    // Lógica de upload de imagem
    uploadButton.addEventListener('click', () => imageUpload.click());

    imageUpload.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
                defaultIcon.style.display = 'none';
            }
            reader.readAsDataURL(file);
        }
    });

    removeButton.addEventListener('click', function() {
        imagePreview.src = '';
        imagePreview.style.display = 'none';
        defaultIcon.style.display = 'block';
        imageUpload.value = '';
    });

    profileForm.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateForm()) {
            saveProfileData();
            showToast("Perfil salvo com sucesso!");
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
    
    // --- FUNÇÃO DE SALVAR CORRIGIDA ---
    function saveProfileData() {
        const nameValue = nameInput.value.trim();
        const avatarSrc = imagePreview.src;

        // Salva com as chaves que a outra página está lendo
        localStorage.setItem('loggedInUsername', nameValue);

        if (avatarSrc && imagePreview.style.display === 'block') {
            localStorage.setItem('loggedInUserAvatar', avatarSrc);
        } else {
            localStorage.removeItem('loggedInUserAvatar');
        }
    }

    // --- FUNÇÃO DE CARREGAR CORRIGIDA ---
    function loadProfileData() {
        // Carrega usando as chaves corretas para preencher o formulário
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

    function showToast(message) {
        toast.textContent = message;
        toast.className = 'show';
        setTimeout(function() {
            toast.className = toast.className.replace('show', '');
        }, 3000);
    }
});