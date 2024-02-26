/*********entrar na conta da Rede*************/

/****Funções para validação de email e senha com expressões regulares****/
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

    /**validação email e senha para acessar conta**/
    if (emailValido && senhaValida) {
        mostrarAlerta('Redirecionando para a conta...');
    }
});

/**irá direcionar um link para email cadastrado no site**/
document.getElementById('senha-esqueci').addEventListener('click', (e) => {
    e.preventDefault();     
    mostrarAlerta('Por favor, verifique seu e-mail para redefinir sua senha.');
});

/*********cadastro na Rede*************/
document.getElementById('cadastroForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const emailCadastro = document.getElementById('email-novo').value.trim();
    const senhaCadastro = document.getElementById('password-new').value;

    if (validarEmailCadastro(emailCadastro) && validarSenhaCadastro(senhaCadastro)) {
        const tipoConta = determinarTipoConta(emailCadastro);
        if (tipoConta) {
            redirecionarParaFormulario(tipoConta);
        } else {
            mostrarAlerta('Não foi possível determinar o tipo de conta.');
        }
    }
});

function validarEmailCadastro(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValido = regexEmail.test(email);

    if (!emailValido) {
        mostrarAlerta('Por favor, insira um e-mail válido.');
    }

    return emailValido;
}

function validarSenhaCadastro(senha) {
    const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{6,}$/;
    const senhaValida = regexSenha.test(senha);

    if (!senhaValida) {
        mostrarAlerta('A senha deve conter pelo menos 6 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial (@, #, $, !, %, *, ?, &).');
    }

    return senhaValida;
}

function mostrarAlerta(mensagem) {
    alert(mensagem);
}


document.getElementById('cadastroForm').addEventListener('submit',  (e) => {
    e.preventDefault();

    const emailCadastro = document.getElementById('email-novo').value.trim();
    const senhaCadastro = document.getElementById('password-new').value;
    const escolhaUsuario = document.querySelector('button[type="submit"]:focus').value;

    const emailValidoCadastro = validarEmailCadastro(emailCadastro);
    const senhaValidaCadastro = validarSenhaCadastro(senhaCadastro);

    // validação email e senha para acessar conta
    if (emailValidoCadastro && senhaValidaCadastro) {
        if (escolhaUsuario === 'empresa') {
            window.location.href = './empresa-formulario.html'; // Redirecionar para o formulário de empresa
        } else if (escolhaUsuario === 'ong') {
            window.location.href = './ONG-formulario.html'; // Redirecionar para o formulário de ONG
        } else {
            mostrarAlerta('Por favor, selecione uma opção.');
        }
    }
});
