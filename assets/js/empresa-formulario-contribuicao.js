// Array que vai armazenar a lista de produtos
let listaItens = [];
let idCount = 0; // Variável para gerar identificadores únicos

// Adicionar evento de clique ao botão de adicionar produto
document.addEventListener('DOMContentLoaded', function() {
    const botaoAdicionarProduto = document.getElementById('botaoAdicionarProduto');
    if (botaoAdicionarProduto) {
        botaoAdicionarProduto.addEventListener('click', function(e) {
            e.preventDefault();

            // Capturar os valores dos campos de entrada existentes
            const inputProduto = document.getElementById('inputProduto');
            const inputQuantidade = document.getElementById('inputQuantidade');
            const selectUnidade = document.getElementById('unidadeProduto');

            const produto = inputProduto.value;
            const quantidade = inputQuantidade.value;
            const unidade = selectUnidade.value;

            // Verificar se o produto não está zerado
            if (produto.trim() === '' || parseFloat(produto) === 0) {
                alert('O nome do produto não pode estar zerado');
                return;
            }

            // Verificar se a quantidade não é zerada
            if (quantidade.trim() === '' || parseFloat(quantidade) === 0) {
                alert('A quantidade não pode ser zero.');
                return;
            }

            // Limpar os campos de entrada iniciais
            inputProduto.value = ''; 
            inputQuantidade.value = ''; 

            // Criar um novo item de lista para o produto
            const novoItemLista = document.createElement('div');
            novoItemLista.classList.add('item-dinamico', 'proj-info-leftRightPadding');

            // Criar elementos para exibir o nome do produto e sua quantidade
            const novoInputProduto = document.createElement('input');
            novoInputProduto.setAttribute('type', 'text');
            novoInputProduto.setAttribute('placeholder', produto);
            novoInputProduto.setAttribute('disabled', 'true');
            novoInputProduto.classList.add('contribuicoes-input');

            const novoInputQuantidade = document.createElement('input');
            novoInputQuantidade.setAttribute('type', 'text');
            novoInputQuantidade.setAttribute('placeholder', quantidade);
            novoInputQuantidade.setAttribute('disabled', 'true');
            novoInputQuantidade.classList.add('contribuicoes-input');

            // Criar o novo elemento select
            const novaUnidade = document.createElement('select');
            novaUnidade.setAttribute('disabled', 'true');

            // Adicionar as opções ao novo elemento select
            const opcaoLitros = document.createElement('option');
            opcaoLitros.value = 'litros';
            opcaoLitros.textContent = 'Litros';

            const opcaoQuilos = document.createElement('option');
            opcaoQuilos.value = 'quilos';
            opcaoQuilos.textContent = 'Quilos';

            // Desabilitar a opção correspondente ao valor selecionado no select original
            if (unidade === 'litros') {
                opcaoQuilos.disabled = true;
            } else {
                opcaoLitros.disabled = true;
            }

            // Adicionar as opções ao novo elemento select
            novaUnidade.appendChild(opcaoLitros);
            novaUnidade.appendChild(opcaoQuilos);

            // Adicionar os elementos à lista
            novoItemLista.appendChild(novoInputProduto);
            novoItemLista.appendChild(novoInputQuantidade);
            novoItemLista.appendChild(novaUnidade);

            // Adicionar o novo item à lista de doações
            const listaDoacoes = document.querySelector('.contribuicao-leftPadding');
            listaDoacoes.appendChild(novoItemLista);

            // Incrementar o contador de identificação único
            idCount++;

            const novoItem = {
                id: idCount,
                produto: produto,
                quantidade: quantidade,
                unidade: unidade,
                elemento: novoItemLista
            };

            listaItens.push(novoItem);

            novoItemLista.addEventListener('click', function() {
                removerItem(novoItem.id);
            });

            console.log('Novo item adicionado:', novoItem);
        });
    }
});

// Função para remover item
function removerItem(id) {
    const index = listaItens.findIndex(item => item.id === id);
    if (index !== -1) {
        const item = listaItens[index];
        item.elemento.remove();
        listaItens.splice(index, 1);
        console.log('Item removido:', item);
    }
}

// Adicionar evento de clique ao botão FAZER POSTAGEM
const botaoFazerPostagem = document.getElementById('botao-postagem');
if (botaoFazerPostagem) {
    botaoFazerPostagem.addEventListener('click', function(e) {
        e.preventDefault();

        const elementosDinamicos = document.querySelectorAll('.item-dinamico');
        elementosDinamicos.forEach(elemento => elemento.remove());

        console.log("Você clicou no botão de postagem");
        const selectedHoraColeta = document.getElementById("horario-coleta");
        const horaColeta = selectedHoraColeta.value;
        const selectedDiaColeta = document.getElementById("dia-coleta");
        const diaColeta = selectedDiaColeta.value;
        console.log(diaColeta);
        console.log(horaColeta);
        console.log(listaItens);
    });
}
