function marcar(id) {
    let elemento = document.getElementById(`${id}`);
    let descricao = document.getElementById(`descricao${id}`);
    if (descricao.value == "") {
        alert("Insira uma descrição de uso dos produtos antes de marcar.");
    } else {
        secaoColetasMarcadas.getElementsByTagName("h3")[0].style.display =
            "none";
        descricao.disabled = true;

        elemento.querySelectorAll(".ong-flex-inner")[0].style.display = "none";
        elemento.querySelectorAll(".ong-flex-inner")[1].style.display = "flex";

        secaoColetasMarcadas.appendChild(elemento); // Append new element
    }
}

function desmarcar(id) {
    let descricao = document.getElementById(`descricao${id}`);
    let elemento = document.getElementById(`${id}`);

    if (secaoColetasMarcadas.childElementCount < 3) {
        secaoColetasMarcadas.getElementsByTagName("h3")[0].style.display =
            "flex";
    }
    descricao.disabled = false;

    elemento.querySelectorAll(".ong-flex-inner")[0].style.display = "flex";
    elemento.querySelectorAll(".ong-flex-inner")[1].style.display = "none";

    secaoColetasParaMarcar.appendChild(elemento); // Append new element
}

function aviso(id) {
    alert("Coleta confirmada!");
}
