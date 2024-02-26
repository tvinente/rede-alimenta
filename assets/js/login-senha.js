function validarEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    emailValido = regexEmail.test(email);

    if (!emailValido) {
        mostrarAlerta('Por favor, insira um e-mail válido.');
    }
}

function validarSenha(senha) {
    const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{6,}$/;
    senhaValida = regexSenha.test(senha);

    if (!senhaValida) {
        mostrarAlerta('A senha deve conter pelo menos 6 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial (@, #, $, !, %, *, ?, &).');
    }
}

function mostrarAlerta(mensagem) {
    alert(mensagem);
}

let emailValido = false;
let senhaValida = false;

document.querySelector('.formulario-rede').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email-rede').value.trim();
    const senha = document.getElementById('senha-rede').value;

    validarEmail(email);
    validarSenha(senha);

    // validação email e senha para acessar conta
    if (emailValido && senhaValida) {
        mostrarAlerta('Redirecionando para a conta...');
    }
});

//irá direcionar um link para email cadastrado no site
document.getElementById('senha-esqueci').addEventListener('click', (e) => {
    e.preventDefault();     
    mostrarAlerta('Por favor, verifique seu e-mail para redefinir sua senha.');
});
