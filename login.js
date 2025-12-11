// Captura o formulário de login
const form = document.getElementById("form-login");

// Ao submeter o formulário, previne envio padrão e executa validação local
// NOTA: para produção, substitua esta validação por autenticação segura no servidor.
form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Lê valores dos campos e normaliza espaços
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const msg_erro = document.getElementById("msg_erro");

    // Credenciais de exemplo usadas apenas para teste local
    // login válido: admin@admin.com / admin
    if (email === "admin@admin.com" && senha === "admin") {
        // marca sessão autenticada (apenas para demo local)
        sessionStorage.setItem('authenticated', 'true');
        window.location.href = "sistemas.html";
        return;
    }

    // Mostra erro simples na página
    msg_erro.textContent = "E-mail ou senha inválidos!";
    msg_erro.style.color = 'crimson';
});