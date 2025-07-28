document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'http://localhost:5555';

    const cadastroForm = document.getElementById('cadastroForm');
    const nomeCompletoInput = document.getElementById('nomeCompleto');
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');
    const confirmarSenhaInput = document.getElementById('confirmarSenha');
    const fotoPerfilInput = document.getElementById('fotoPerfil');
    const fileNameSpan = document.getElementById('fileName');

    const nomeCompletoError = document.getElementById('nomeCompletoError');
    const emailError = document.getElementById('emailError');
    const senhaError = document.getElementById('senhaError');
    const confirmarSenhaError = document.getElementById('confirmarSenhaError');
    const fotoPerfilError = document.getElementById('fotoPerfilError');
    const feedbackMessage = document.getElementById('feedbackMessage');
    const cadastrarButton = document.getElementById('cadastrarButton');

   
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPassword = (password) => password.length >= 6 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password);

  
    fotoPerfilInput.addEventListener('change', () => {
        if (fotoPerfilInput.files.length > 0) {
            fileNameSpan.textContent = fotoPerfilInput.files[0].name;
            fotoPerfilError.textContent = '';
        } else {
            fileNameSpan.textContent = 'Nenhum arquivo escolhido';
        }
    });

    
    cadastroForm.addEventListener('submit', async (event) => {
        event.preventDefault();

      
        nomeCompletoError.textContent = '';
        emailError.textContent = '';
        senhaError.textContent = '';
        confirmarSenhaError.textContent = '';
        fotoPerfilError.textContent = '';
        feedbackMessage.textContent = '';
        feedbackMessage.className = 'feedback-message';

        let isValid = true;
        const nomeCompleto = nomeCompletoInput.value.trim();
        const email = emailInput.value.trim();
        const senha = senhaInput.value;
        const confirmarSenha = confirmarSenhaInput.value;

    
        if (nomeCompleto === '') {
            nomeCompletoError.textContent = 'Por favor, digite seu nome completo.';
            isValid = false;
        }
        if (senha !== confirmarSenha) {
            confirmarSenhaError.textContent = 'As senhas não coincidem.';
            isValid = false;
        }

        if (!isValid) {
            feedbackMessage.textContent = 'Por favor, corrija os erros no formulário.';
            feedbackMessage.classList.add('error');
            return;
        }

        cadastrarButton.disabled = true;
        cadastrarButton.textContent = 'Cadastrando...';

        try {
            
            const payload = {
                nome: nomeCompleto,
                login: email, 
                senha: senha,
                idade: 0 
            };

            const response = await fetch(`${API_URL}/cadastrarUsuario`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                feedbackMessage.textContent = data.message || "Cadastro realizado com sucesso! Redirecionando...";
                feedbackMessage.classList.add('success');
                setTimeout(() => {
                    window.location.href = 'login.html'; 
                }, 2000);
            } else {
                throw new Error(data.message || 'Ocorreu um erro no cadastro.');
            }

        } catch (error) {
            feedbackMessage.textContent = error.message;
            feedbackMessage.classList.add('error');
        } finally {
            cadastrarButton.disabled = false;
            cadastrarButton.textContent = 'Cadastrar';
        }
    });


 
    nomeCompletoInput.addEventListener('input', () => {
        if (nomeCompletoInput.value.trim().length < 3) {
            nomeCompletoError.textContent = 'Nome muito curto.';
        } else {
            nomeCompletoError.textContent = '';
        }
    });

    emailInput.addEventListener('input', () => {
        if (emailInput.value.trim() !== '' && !isValidEmail(emailInput.value.trim())) {
            emailError.textContent = 'Formato de e-mail inválido.';
        } else {
            emailError.textContent = '';
        }
    });

    senhaInput.addEventListener('input', () => {
        if (senhaInput.value !== '' && !isValidPassword(senhaInput.value)) {
            senhaError.textContent = 'A senha deve ter no mínimo 6 caracteres, incluindo letras e números.';
        } else {
            senhaError.textContent = '';
        }
        // Também verifica a confirmação de senha se a senha mudar
        if (confirmarSenhaInput.value !== '' && senhaInput.value !== confirmarSenhaInput.value) {
            confirmarSenhaError.textContent = 'As senhas não coincidem.';
        } else {
            confirmarSenhaError.textContent = '';
        }
    });

    confirmarSenhaInput.addEventListener('input', () => {
        if (confirmarSenhaInput.value !== '' && senhaInput.value !== confirmarSenhaInput.value) {
            confirmarSenhaError.textContent = 'As senhas não coincidem.';
        } else {
            confirmarSenhaError.textContent = '';
        }
    });
});