// Função que pega os elementos colapsáveis da página e cria reações a eventos quando o elemento é clicado
function elementosColapsaveis () {

    // Definições das variaveis
    var coll = document.getElementsByClassName("colapsaveis");
    var i;

    // Loop que sob todos os elementos colapsáveis
    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("ativo");
            var content = this.nextElementSibling;
            if (content.style.maxHeight){
            content.style.maxHeight = null;
            } else {
            content.style.maxHeight = content.scrollHeight + "px";
            }
        });
        }
}
