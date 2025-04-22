// Mock de conta para validação
const mockAccount = {
    email: "usuario@triade.com",
    password: "senha1234"
};

// Referência ao formulário
const loginForm = document.querySelector('form');

// Adiciona o evento de submissão ao formulário
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o envio padrão do formulário

        // Obtém os valores dos campos de e-mail e senha
        const email = document.querySelector('input[name="username"]').value;
        const password = document.querySelector('input[name="password"]').value;

        // Verifica se o e-mail e a senha correspondem ao mock
        if (email === mockAccount.email && password === mockAccount.password) {
            // Salva o nome do usuário no localStorage
            const username = document.querySelector('input[usario="username"]').value;
            localStorage.setItem('username', username);

            alert('Login realizado com sucesso! Redirecionando para a página inicial...');
            window.location.href = 'home.html'; // Redireciona para home.html
        } else {
            alert('E-mail ou senha incorretos. Tente novamente.');
        }
    });
}

// Recupera o nome do usuário na página home.html
if (window.location.pathname.includes('home.html')) {
    const userName = localStorage.getItem('username');
    const userNameElement = document.getElementById('user-name');

    if (userNameElement) {
        // Exibe o nome do usuário no elemento <span>
        userNameElement.textContent = userName || 'Usuário';
    }
}
// Referência ao campo de upload e à imagem
const fileInput = document.getElementById('file-upload');
const uploadedImage = document.getElementById('uploaded-image');

// Adiciona um evento para capturar o arquivo enviado
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0]; // Obtém o arquivo enviado

    if (file && file.type.startsWith('image/')) { // Verifica se é uma imagem
        const reader = new FileReader();

        reader.onload = (e) => {
            uploadedImage.src = e.target.result; // Define o src da imagem
            uploadedImage.style.display = 'block'; // Exibe a imagem
        };

        reader.readAsDataURL(file); // Lê o arquivo como uma URL de dados
    } else {
        uploadedImage.style.display = 'none'; // Oculta a imagem se não for válida
        alert('Por favor, envie um arquivo de imagem válido.');
    }
});

// Inicializa o EmailJS
emailjs.init("SEU_PUBLIC_KEY"); // Substitua "SEU_PUBLIC_KEY" pela sua Public Key do EmailJS

// Referência ao formulário
const formulario = document.getElementById("formulario");

// Adiciona o evento de envio ao formulário
formulario.addEventListener("submit", (e) => {
    e.preventDefault(); // Impede o envio padrão do formulário

    // Obtém os dados do formulário
    const formData = new FormData(formulario);
    const formObject = Object.fromEntries(formData.entries()); // Converte para objeto

    // Envia o e-mail usando EmailJS
    emailjs
        .send("service_7o94tuc", "SEU_TEMPLATE_ID", formObject)
        .then(() => {
            alert("Ocorrência registrada com sucesso! E-mail enviado.");
            formulario.reset(); // Limpa o formulário
        })
        .catch((error) => {
            console.error("Erro ao enviar o e-mail:", error);
            alert("Ocorreu um erro ao registrar a ocorrência. Tente novamente.");
        });
});