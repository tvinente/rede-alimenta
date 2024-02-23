// Data
let ongDB = {
    id00: {
        id: "00",
        texto: `<p>MegaCorp</p>
            <p>Roberto Alexandre (99) 12345-6789</p>
            <p>Rua DEA 449, Cidade A. DT</p>
            <ul>
                <li>Bata Asterix (2 kg)</li>
                <li>Leite (2 Litros)</li>
                <li>Cebola Branca (1,4 Kg)</li>
            </ul>`,
        horaColeta: "22:00 horas",
        dataColeta: "10/10/23",
    },
    id01: {
        id: "01",
        texto: `<p>OutraCorp</p>
            <p>Bob Pessoa (99) 12345-6789</p>
            <p>Rua ABC 234, Cidade D. CC</p>
            <ul>
                <li>Cebola Roxa (1 Kg)</li>
                <li>Pepino (0,5 Kg)</li>
            </ul>`,
        horaColeta: "08:00 horas",
        dataColeta: "23/11/23",
    },
};

// DOM elements
let secaoColetasParaMarcar = document.getElementById("ong-coletas-para-marcar");
let secaoColetasMarcadas = document.getElementById("ong-coletas-marcadas");

// Classes

//// Class to define color scheme of posts
class colorPallet {
    constructor(pallet = []) {
        this.colors = pallet;
        this.index = 0;
    }
    getColor() {
        let currentIndex = this.index;
        this.index++;
        if (this.index == this.colors.length) {
            this.index = this.index - this.colors.length;
        }
        return this.colors[currentIndex];
    }
}

// Class to connect JavaScript loop to Data
class OngPosts {
    constructor() {
        this.Posts = [];
    }
    newPost(id, text, timeToColecte, dateToColecte) {
        let newpost = new Post(id, text, timeToColecte, dateToColecte);
        this.Posts.push(newpost);
    }
    // Load Data function. Change if database structure is changed.
    loadData(database) {
        for (let id in database) {
            let newpost = new Post(
                database[id].id,
                database[id].texto,
                database[id].horaColeta,
                database[id].dataColeta
            );
            this.Posts.push(newpost);
        }
    }
}
class Post {
    constructor(id, text, timeToColecte, dateToColecte) {
        this.id = id;
        this.text = text;
        this.timeToColecte = timeToColecte;
        this.dateToColecte = dateToColecte;
    }
}

// Main loop

//// Load ongDB
let currentPosts = new OngPosts();
currentPosts.loadData(ongDB);

//// Load color scheme
let colorScheme = new colorPallet(["ong-bg-blue", "ong-bg-amarelo"]);

//// Loop to populate DOM with posts
for (let i = 0; i < currentPosts.Posts.length; i++) {
    // Load information about post
    let id = currentPosts.Posts[i].id;
    let text = currentPosts.Posts[i].text;
    let timeToColecte = currentPosts.Posts[i].timeToColecte;
    let dateToColecte = currentPosts.Posts[i].dateToColecte;

    // Create DOM elements
    let novaPostagem = document.createElement("form");
    novaPostagem.method = "post";
    novaPostagem.className = "forms-container";
    novaPostagem.action = "";
    novaPostagem.id = id.toString();

    // String template
    novaPostagem.innerHTML = `
    <div class="texto ong-informacoes ${colorScheme.getColor()}">
        ${text}
    </div>
    <div style="justify-content: center; flex-direction: column;">
        <div>
            <input type="text" id="hora-coleta" name="horaColeta" value="${timeToColecte}" class="texto" disabled>
            <input type="text" id="data-coleta" name="dataColeta" class="texto" value="${dateToColecte}" disabled/>
        </div>
    <div>
        <input type="text" autocomplete="off" id="descricao${id}" name="descricao" placeholder="Como esses produtos vão ser usados?" class="texto"/> 
    </div>
    <div class="ong-flex-inner">
        <button type="button" onclick="marcar('${id}')" class="texto-botao primario">Marcar</button>
    </div>
    <div style="display:none" class="ong-flex-inner">
        <button type="button" onclick="aviso('${id}')" class="texto-botao primario">Confirmar coleta</button>
        <button type="button" onclick="desmarcar('${id}')" class="texto-botao primario">Cancelar</button>
    </div>`;

    // Append element to DOM
    secaoColetasParaMarcar.appendChild(novaPostagem);
}
