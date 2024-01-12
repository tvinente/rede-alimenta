// Função para adicionar eventos nos elementos da classe colapsáveis
function elementosColapsaveis () {

    // Definições das variáveis
    var arrayElementos = document.getElementsByClassName("colapsaveis");
    var i;

    // Loop sob todos os elementos da classe colapsáveis
    for (i = 0; i < arrayElementos.length; i++) {

        // Adição de evento click
        arrayElementos[i].addEventListener("click", function() {

            // Ativa o modo ativo do elemento
            this.classList.toggle("ativo");

            // Pega o elemento filho (conteúdo a ser exibido)
            var content = this.nextElementSibling;

            // Modifica maxHeight para mostrar o conteúdo
            if (content.style.maxHeight){
                // Fechar
                content.style.maxHeight = null;
            } else {
                // Abrir
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    }
}
