const API_BASE_URL = 'https://projeto-banco-de-materiais-de-estudo.onrender.com';

document.addEventListener('DOMContentLoaded', () => {
    const recoveryForm = document.getElementById('recoveryForm');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const feedbackMessage = document.getElementById('feedbackMessage');
    const sendButton = document.getElementById('sendButton');

    // Function to validate email format
    const isValidEmail = (email) => {
        // Basic regex for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Event listener for form submission
    recoveryForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        // Clear previous messages
        emailError.textContent = '';
        feedbackMessage.textContent = '';
        feedbackMessage.className = 'feedback-message'; // Reset classes

        const email = emailInput.value.trim();

        if (email === '') {
            emailError.textContent = 'Por favor, digite seu e-mail.';
            emailInput.focus();
            return;
        }

        if (!isValidEmail(email)) {
            emailError.textContent = 'Por favor, digite um e-mail válido.';
            emailInput.focus();
            return;
        }

        // Simulate API call for password recovery
        // In a real application, you would send an AJAX request here
        sendButton.disabled = true; // Disable button during processing
        sendButton.textContent = 'Enviando...';

        setTimeout(() => {
            // Simulate success or failure
            const success = Math.random() > 0.3; // 70% chance of success for demonstration

            sendButton.disabled = false; // Re-enable button
            sendButton.textContent = 'Enviar';

            if (success) {
                feedbackMessage.textContent = `Um link de recuperação de senha foi enviado para ${email}. Por favor, verifique sua caixa de entrada.`;
                feedbackMessage.classList.add('success');
                recoveryForm.reset(); // Clear the form
            } else {
                feedbackMessage.textContent = 'Ocorreu um erro ao tentar recuperar a senha. Por favor, tente novamente mais tarde.';
                feedbackMessage.classList.add('error');
            }
        }, 2000); // Simulate 2-second delay for API call
    });

    // Optional: Real-time validation as user types (or on blur)
    emailInput.addEventListener('input', () => {
        if (emailInput.value.trim() !== '') {
            if (!isValidEmail(emailInput.value.trim())) {
                emailError.textContent = 'Formato de e-mail inválido.';
            } else {
                emailError.textContent = ''; // Clear error if valid
            }
        } else {
            emailError.textContent = ''; // Clear error if empty (will be caught by submit)
        }
    });
});