document.addEventListener('DOMContentLoaded', () => {
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

    // Função para validar o formato do e-mail
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Função para validar a força da senha (mínimo 6 caracteres, letras e números)
    const isValidPassword = (password) => {
        return password.length >= 6 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password);
    };

    // Atualiza o nome do arquivo escolhido no span
    fotoPerfilInput.addEventListener('change', () => {
        if (fotoPerfilInput.files.length > 0) {
            fileNameSpan.textContent = fotoPerfilInput.files[0].name;
            fotoPerfilError.textContent = ''; // Limpa o erro se um arquivo for selecionado
        } else {
            fileNameSpan.textContent = 'Nenhum arquivo escolhido';
        }
    });

    cadastroForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Limpa todas as mensagens de erro e feedback anteriores
        nomeCompletoError.textContent = '';
        emailError.textContent = '';
        senhaError.textContent = '';
        confirmarSenhaError.textContent = '';
        fotoPerfilError.textContent = '';
        feedbackMessage.textContent = '';
        feedbackMessage.className = 'feedback-message'; // Reseta as classes

        let isValid = true; // Flag para verificar a validade geral do formulário

        const nomeCompleto = nomeCompletoInput.value.trim();
        const email = emailInput.value.trim();
        const senha = senhaInput.value;
        const confirmarSenha = confirmarSenhaInput.value;
        const fotoPerfil = fotoPerfilInput.files[0]; // Pega o primeiro arquivo

        // Validação: Nome completo
        if (nomeCompleto === '') {
            nomeCompletoError.textContent = 'Por favor, digite seu nome completo.';
            isValid = false;
        }

        // Validação: E-mail
        if (email === '') {
            emailError.textContent = 'Por favor, digite seu e-mail.';
            isValid = false;
        } else if (!isValidEmail(email)) {
            emailError.textContent = 'Por favor, digite um e-mail válido.';
            isValid = false;
        }

        // Validação: Senha
        if (senha === '') {
            senhaError.textContent = 'Por favor, digite uma senha.';
            isValid = false;
        } else if (!isValidPassword(senha)) {
            senhaError.textContent = 'A senha deve ter no mínimo 6 caracteres, incluindo letras e números.';
            isValid = false;
        }

        // Validação: Confirmar Senha
        if (confirmarSenha === '') {
            confirmarSenhaError.textContent = 'Por favor, confirme sua senha.';
            isValid = false;
        } else if (senha !== confirmarSenha) {
            confirmarSenhaError.textContent = 'As senhas não coincidem.';
            isValid = false;
        }

        // Validação: Foto de perfil (opcional, mas com feedback se não for selecionada)
        if (!fotoPerfil) {
            fotoPerfilError.textContent = 'É recomendado adicionar uma foto de perfil.';
            // isValid = false; // Remova esta linha se a foto de perfil não for obrigatória
        }

        // Se o formulário não for válido, para a execução
        if (!isValid) {
            feedbackMessage.textContent = 'Por favor, corrija os erros no formulário.';
            feedbackMessage.classList.add('error');
            return;
        }

        // Se tudo estiver válido, simula o cadastro
        cadastrarButton.disabled = true; // Desabilita o botão durante o processamento
        cadastrarButton.textContent = 'Cadastrando...';

        setTimeout(() => {
            // Simula o sucesso ou falha do cadastro
            const success = Math.random() > 0.2; // 80% de chance de sucesso para demonstração

            cadastrarButton.disabled = false; // Reabilita o botão
            cadastrarButton.textContent = 'Cadastrar';

            if (success) {
                feedbackMessage.textContent = `Cadastro realizado com sucesso para ${nomeCompleto}! Redirecionando para a página de login...`;
                feedbackMessage.classList.add('success');
                cadastroForm.reset(); // Limpa o formulário após o sucesso
                fileNameSpan.textContent = 'Nenhum arquivo escolhido'; // Reseta o texto do arquivo
                setTimeout(() => {
                    window.location.href = 'login.html'; // Redireciona para a página de login
                }, 2000);
            } else {
                feedbackMessage.textContent = 'Ocorreu um erro no cadastro. Tente novamente mais tarde.';
                feedbackMessage.classList.add('error');
            }
        }, 2000); // Simula 2 segundos de atraso para o processo de cadastro
    });

    // Opcional: Validação em tempo real (ou no evento 'blur')
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