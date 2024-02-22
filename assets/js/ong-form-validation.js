let validForm = {
    emailResponsavelOng: false,
    emailGrupoOng: false,
    telefoneResponsavelOng: false,
    telefoneOng: false,
    cnpjOng: false,
    nomeGrupoOng: false,
    nomeResponsavelOng: false,
    cpfResponsavelOng: false,
    websiteGrupoOng: false,
    numeroColetaOng: false,
    melhorDiaColetar: false,
    melhorHorarioaColetar: false,
};

// Form validation functions

function validateEmail() {
    // const emailInput = document.getElementById("email");
    const email = this.value.trim();
    const key = this.name;
    // const email = emailInput.value.trim();

    if (isValidEmail(email)) {
        // Email is valid
        this.classList.remove("invalid");
        this.classList.add("valid");
        validForm[key] = true;
    } else {
        // Email is invalid
        this.classList.remove("valid");
        this.classList.add("invalid");
        validForm[key] = false;
    }
}

function validatePhoneNumber() {
    // const emailInput = document.getElementById("email");
    const phone = this.value.trim();
    const key = this.name;
    // const email = emailInput.value.trim();

    if (isValidPhoneNumber(phone)) {
        // Email is valid
        this.classList.remove("invalid");
        this.classList.add("valid");
        validForm[key] = true;
    } else {
        // Email is invalid
        this.classList.remove("valid");
        this.classList.add("invalid");
        validForm[key] = false;
    }
}

function validateCNPJ() {
    const cnpj = this.value.trim();
    const key = this.name;

    if (isValidCNPJ(cnpj)) {
        // Email is valid
        this.classList.remove("invalid");
        this.classList.add("valid");
        validForm[key] = true;
    } else {
        // Email is invalid
        this.classList.remove("valid");
        this.classList.add("invalid");
        validForm[key] = false;
    }
}

function validateName() {
    const name = this.value.trim();
    const key = this.name;

    if (isValidName(name)) {
        // Email is valid
        this.classList.remove("invalid");
        this.classList.add("valid");
        validForm[key] = true;
    } else {
        // Email is invalid
        this.classList.remove("valid");
        this.classList.add("invalid");
        validForm[key] = false;
    }
}

function validateCpf() {
    const cpf = this.value.trim();
    const key = this.name;

    if (isValidCPF(cpf)) {
        // Email is valid
        this.classList.remove("invalid");
        this.classList.add("valid");
        validForm[key] = true;
    } else {
        // Email is invalid
        this.classList.remove("valid");
        this.classList.add("invalid");
        validForm[key] = false;
    }
}

function validateWebsite() {
    const website = this.value.trim();
    const key = this.name;

    if (isValidWebsite(website)) {
        // Email is valid
        this.classList.remove("invalid");
        this.classList.add("valid");
        validForm[key] = true;
    } else {
        // Email is invalid
        this.classList.remove("valid");
        this.classList.add("invalid");
        validForm[key] = false;
    }
}

function validateAddressNumber() {
    const number = this.value.trim();
    const key = this.name;

    if (isValidAddressNumber(number)) {
        // Email is valid
        this.classList.remove("invalid");
        this.classList.add("valid");
        validForm[key] = true;
    } else {
        // Email is invalid
        this.classList.remove("valid");
        this.classList.add("invalid");
        validForm[key] = false;
    }
}

function validateChoice() {
    const choice = this.value.trim();
    const key = this.name;

    if (isValidChoice(choice)) {
        // Email is valid
        this.classList.remove("invalid");
        this.classList.add("valid");
        // validForm[key] = true;
    } else {
        // Email is invalid
        this.classList.remove("valid");
        this.classList.add("invalid");
        // validForm[key] = false;
    }
}
// Is valid functions

function isValidEmail(email) {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhoneNumber(phoneNumber) {
    const phoneRegex =
        /^\(?([1-9]{2})\)?[-. ]?([2-9][0-9]{3,4})[-. ]?([0-9]{4})$/;
    return phoneRegex.test(phoneNumber);
}

function isValidCNPJ(cnpj) {
    // Remove special characters from CNPJ string
    cnpj = cnpj.replace(/[^\d]+/g, "");

    // CNPJ must have exactly 14 digits
    if (cnpj.length !== 14) return false;

    // Check for known invalid CNPJ patterns (e.g., all digits are the same)
    const invalidCNPJs = [
        "00000000000000",
        "11111111111111",
        "22222222222222",
        "33333333333333",
        "44444444444444",
        "55555555555555",
        "66666666666666",
        "77777777777777",
        "88888888888888",
        "99999999999999",
    ];
    if (invalidCNPJs.includes(cnpj)) return false;

    // Validate CNPJ using the algorithm
    let sum = 0;
    let position = 5;

    for (let i = 0; i < 12; i++) {
        sum += parseInt(cnpj.charAt(i)) * position;
        position--;
        if (position < 2) position = 9;
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (parseInt(cnpj.charAt(12)) !== result) return false;

    sum = 0;
    position = 6;

    for (let i = 0; i < 13; i++) {
        sum += parseInt(cnpj.charAt(i)) * position;
        position--;
        if (position < 2) position = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (parseInt(cnpj.charAt(13)) !== result) return false;

    return true;
}

function isValidName(name) {
    // Regular expression for basic name validation
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    return nameRegex.test(name);
}

function isValidCPF(cpf) {
    // Remove special characters from CPF string
    cpf = cpf.replace(/[^\d]+/g, "");

    // CPF must have exactly 11 digits
    if (cpf.length !== 11) return false;

    // Check for known invalid CPF patterns (e.g., all digits are the same)
    const invalidCPFs = [
        "00000000000",
        "11111111111",
        "22222222222",
        "33333333333",
        "44444444444",
        "55555555555",
        "66666666666",
        "77777777777",
        "88888888888",
        "99999999999",
    ];
    if (invalidCPFs.includes(cpf)) return false;

    // Validate CPF using the algorithm
    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++)
        sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) remainder = 0;

    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++)
        sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) remainder = 0;

    if (remainder !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}

function isValidWebsite(website) {
    // Regular expression for basic website URL validation
    const websiteRegex =
        /^(https?:\/\/)?([\w\d.-]+\.[a-z]{2,})(:[0-9]+)?(\/.*)?$/i;
    return websiteRegex.test(website);
}

function isValidAddressNumber(number) {
    // Regular expression for basic positive integer validation
    const numberRegex = /^\d+$/;
    return numberRegex.test(number);
}

function isValidChoice(number) {
    return !(number === "00");
}
// Add events
document.addEventListener("DOMContentLoaded", function () {
    // Emails
    const emailInput1 = document.getElementById("email-grupo-ong");
    emailInput1.addEventListener("blur", validateEmail);

    const emailInput2 = document.getElementById("email-responsavel-ong");
    emailInput2.addEventListener("blur", validateEmail);

    // Phone numbers
    const phoneInput1 = document.getElementById("telefone-grupo-ong");
    phoneInput1.addEventListener("blur", validatePhoneNumber);

    const phoneInput2 = document.getElementById("telefone-responsavel-ong");
    phoneInput2.addEventListener("blur", validatePhoneNumber);

    // CNPJ
    const cnpjInput = document.getElementById("cnpj-ong");
    cnpjInput.addEventListener("blur", validateCNPJ);

    // Names
    const ongName = document.getElementById("nome-grupo-ong");
    ongName.addEventListener("blur", validateName);

    const ongRespName = document.getElementById("nome-responsavel-ong");
    ongRespName.addEventListener("blur", validateName);

    // CPF
    const cpf = document.getElementById("cpf-responsavel-ong");
    cpf.addEventListener("blur", validateCpf);

    // website
    const website = document.getElementById("Website-grupo-ong");
    website.addEventListener("blur", validateWebsite);

    // CEP
    // Is coded in html onblur trigger

    // Address number
    const number = document.getElementById("numero-coleta-ong");
    number.addEventListener("blur", validateAddressNumber);

    // Select choices
    const choiceBestDay = document.getElementById("melhor-dia-coletar");
    choiceBestDay.addEventListener("blur", validateChoice);

    const choiceBestTime = document.getElementById("melhor-horario-coletar");
    choiceBestTime.addEventListener("blur", validateChoice);
});

// Form submission
function submitForm() {
    const someTruthy = Object.values(validForm).some((val) => val === false);

    if (!someTruthy) {
        console.log("Form submitted!");
        setTimeout(function () {
            window.location = "./ONG-coletas-abertas.html";
        }, 1000);
    }
}

// Remove default button action
document
    .getElementById("submitBtn")
    .addEventListener("click", function (event) {
        event.preventDefault();
    });

// CEP Source: https://viacep.com.br/

function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById("rua").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("uf").value = "";
    // document.getElementById("ibge").value = "";
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById("endereco-coleta-ong").value =
            conteudo.logradouro;
        document.getElementById("bairro-coleta-ong").value = conteudo.bairro;
        document.getElementById("cidade-coleta").value = conteudo.localidade;
        document.getElementById("uf-coleta").value = conteudo.uf;
        // document.getElementById('ibge').value=(conteudo.ibge);
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {
    //Nova variável "cep" somente com dígitos.
    let cep = valor.replace(/\D/g, "");

    //Verifica se campo cep possui valor informado.
    if (cep != "") {
        //Expressão regular para validar o CEP.
        let validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {
            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById("endereco-coleta-ong").value = "...";
            document.getElementById("bairro-coleta-ong").value = "...";
            document.getElementById("cidade-coleta").value = "...";
            document.getElementById("uf-coleta").value = "...";
            // document.getElementById('ibge').value="...";

            //Cria um elemento javascript.
            let script = document.createElement("script");

            //Sincroniza com o callback.
            script.src =
                "https://viacep.com.br/ws/" +
                cep +
                "/json/?callback=meu_callback";

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);
        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
}
