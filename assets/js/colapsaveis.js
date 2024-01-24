/**
 * Função que adiciona EventListener nos elementos da classe colapsaveis
 */
function adicionaEventoColapsaveis () {
    // Definições das variáveis
    let arrayElementos = document.getElementsByClassName("proj-info-colapsaveis");

    // Loop sob todos os elementos da classe colapsáveis
    for (let i = 0; i < arrayElementos.length; i++) {
        arrayElementos[i].addEventListener("click", function() {
            this.classList.toggle("ativo");
            let content = this.nextElementSibling;
            if (content.style.maxHeight){
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    }
}


adicionaEventoColapsaveis()