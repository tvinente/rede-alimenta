const postagensAbertas = {
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


let secaoColetasParaMarcar = document.getElementById("ong-coletas-para-marcar");
let secaoColetasMarcadas = document.getElementById("ong-coletas-marcadas");
let colorPallet = ["ong-bg-blue","ong-bg-amarelo"]
if (Object.keys(postagensAbertas).length > colorPallet.length) {
  colorPallet = Array(Object.keys(postagensAbertas).length).fill(colorPallet).flat()
}
let colorPalletIndex = 0

function marcar(id) {
  let elemento = document.getElementById(`id${id}`);
  let descricao = document.getElementById(`descricao${id}`);
  if (descricao.value == "") {
    alert("Insira uma descrição de uso dos produtos antes de marcar.");
  } else {
    secaoColetasMarcadas.getElementsByTagName("h3")[0].style.display = "none";
    descricao.disabled = true;

    elemento.querySelectorAll(".ong-flex-inner")[0].style.display = "none";
    elemento.querySelectorAll(".ong-flex-inner")[1].style.display = "flex";

    secaoColetasMarcadas.appendChild(elemento); // Append new element
  }
}

function desmarcar(id) {
  let descricao = document.getElementById(`descricao${id}`);
  let elemento = document.getElementById(`id${id}`);

  if (secaoColetasMarcadas.childElementCount < 3) {
    secaoColetasMarcadas.getElementsByTagName("h3")[0].style.display = "flex";
  }
  descricao.disabled = false;

  elemento.querySelectorAll(".ong-flex-inner")[0].style.display = "flex";
  elemento.querySelectorAll(".ong-flex-inner")[1].style.display = "none";

  secaoColetasParaMarcar.appendChild(elemento); // Append new element
}

function aviso(id) {
  alert("Coleta confirmada!");
}

for (let id in postagensAbertas) {
  let informacoes = postagensAbertas[id];
  let currentId = String(informacoes.id);
  let novaPostagem = document.createElement("form"); // Create HTML element
  novaPostagem.method = "post";
  novaPostagem.className = "forms-container";
  novaPostagem.action = "";
  novaPostagem.id = id.toString();

  novaPostagem.innerHTML = `
    <div class="texto ong-informacoes ${colorPallet[colorPalletIndex]}">
        ${informacoes.texto}
    </div>
    <div style="justify-content: center; flex-direction: column;">
        <div>
            <input type="text" id="hora-coleta" name="horaColeta" value="${informacoes.horaColeta}" class="texto" disabled>
            <input type="text" id="data-coleta" name="dataColeta" class="texto" value="${informacoes.dataColeta}" disabled/>
        </div>
    <div>
        <input type="text" id="descricao${currentId}" name="descricao" placeholder="Como esses produtos vão ser usados?" class="texto"/> 
    </div>
    <div class="ong-flex-inner">
        <button type="button" onclick="marcar('${currentId}')" class="texto-botao primario">Marcar</button>
    </div>
    <div style="display:none" class="ong-flex-inner">
        <button type="button" onclick="aviso('${currentId}')" class="texto-botao primario">Confirmar coleta</button>
        <button type="button" onclick="desmarcar('${currentId}')" class="texto-botao primario">Cancelar</button>
    </div>`;
    colorPalletIndex ++
  secaoColetasParaMarcar.appendChild(novaPostagem); // Append new element
}
