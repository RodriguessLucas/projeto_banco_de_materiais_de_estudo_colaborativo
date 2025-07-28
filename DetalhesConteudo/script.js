document.addEventListener('DOMContentLoaded', () => {
    // --- Seleção de Elementos do DOM ---
    const usernameDisplay = document.getElementById('username-display');
    const userAvatar = document.getElementById('user-avatar');
    const addContentForm = document.getElementById('addContentForm');
    const materialFileInput = document.getElementById('materialFile');
    const fileNameSpan = document.getElementById('fileName');
    const categoryInput = document.getElementById('category');
    const titleInput = document.getElementById('title');
    const feedbackMessage = document.getElementById('feedbackMessage');
    const discardButton = document.getElementById('discardButton');
    const clearButton = document.getElementById('clearButton');
    const addButton = document.getElementById('addButton');

    // Elementos para mensagens de erro individuais
    const materialFileError = document.getElementById('materialFileError');
    const categoryError = document.getElementById('categoryError');
    const titleError = document.getElementById('titleError');

    // --- Funções Principais ---

    /**
     * Carrega as informações do usuário salvas no localStorage.
     * Nota: Garanta que as chaves 'loggedInUsername' e 'loggedInUserAvatar' são as mesmas
     * usadas na sua página de configurações ao salvar os dados.
     */
    function loadUserInfo() {
        const username = localStorage.getItem('loggedInUsername') || 'Usuário Padrão';
        const userAvatarUrl = localStorage.getItem('loggedInUserAvatar') || 'placeholder-avatar.png'; // Imagem padrão

        usernameDisplay.textContent = username;
        userAvatar.src = userAvatarUrl;
    }

    /**
     * Limpa completamente o formulário, incluindo mensagens de erro e feedback.
     * Função centralizada para evitar repetição de código.
     */
    function clearForm() {
        addContentForm.reset();
        fileNameSpan.textContent = 'Nenhum arquivo escolhido';

        // Limpa a mensagem de feedback principal
        feedbackMessage.textContent = '';
        feedbackMessage.className = 'feedback-message';

        // Limpa todas as mensagens de erro individuais e classes de erro dos inputs
        const errorMessages = [materialFileError, categoryError, titleError];
        errorMessages.forEach(el => el.textContent = '');

        const inputsWithErrors = [categoryInput, titleInput];
        inputsWithErrors.forEach(el => el.classList.remove('error'));
    }
    
    /**
     * Valida o formulário e exibe mensagens de erro específicas.
     * @returns {boolean} - Retorna true se todos os campos são válidos.
     */
    function validateForm() {
        // Limpa erros antigos antes de uma nova validação
        [materialFileError, categoryError, titleError].forEach(el => el.textContent = '');
        [categoryInput, titleInput].forEach(el => el.classList.remove('error'));

        let isValid = true;

        if (materialFileInput.files.length === 0) {
            materialFileError.textContent = 'Por favor, escolha um arquivo.';
            isValid = false;
        }

        if (categoryInput.value.trim() === '') {
            categoryError.textContent = 'Por favor, digite a categoria.';
            categoryInput.classList.add('error'); // Adiciona classe de erro visual
            isValid = false;
        }

        if (titleInput.value.trim() === '') {
            titleError.textContent = 'Por favor, digite o título.';
            titleInput.classList.add('error'); // Adiciona classe de erro visual
            isValid = false;
        }

        return isValid;
    }

    // --- Configuração dos Eventos ---

    // Atualiza o nome do arquivo na interface
    materialFileInput.addEventListener('change', () => {
        if (materialFileInput.files.length > 0) {
            fileNameSpan.textContent = materialFileInput.files[0].name;
            materialFileError.textContent = ''; // Limpa o erro específico ao selecionar um arquivo
        } else {
            fileNameSpan.textContent = 'Nenhum arquivo escolhido';
        }
    });

    // Botão "Limpar" chama a função centralizada
    clearButton.addEventListener('click', clearForm);

    // Botão "Descartar" pede confirmação e redireciona
    discardButton.addEventListener('click', () => {
        if (confirm('Tem certeza que deseja descartar e voltar para a página inicial?')) {
            window.location.href = 'home.html';
        }
    });

    // Evento de submissão do formulário
    addContentForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!validateForm()) {
            feedbackMessage.textContent = 'Por favor, corrija os erros indicados.';
            feedbackMessage.className = 'feedback-message error'; // Usa a classe de erro
            return;
        }

        // Limpa mensagens antigas e desabilita o botão para feedback de "carregando"
        feedbackMessage.textContent = '';
        feedbackMessage.className = 'feedback-message';
        addButton.disabled = true;
        addButton.textContent = 'Adicionando...';

        // Simulação de envio para o servidor
        setTimeout(() => {
            feedbackMessage.textContent = 'Material adicionado com sucesso!';
            feedbackMessage.className = 'feedback-message success';
            clearForm(); // Usa a função centralizada para limpar o form

            // Reabilita o botão após a conclusão
            addButton.disabled = false;
            addButton.textContent = 'Adicionar';
        }, 1500);
    });

    // --- Inicialização ---
    loadUserInfo();
});

//novo

/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}