// Adicionar evento de clique ao botão de adicionar produto
botaoAdicionarProduto.addEventListener('click', function(e) {
    e.preventDefault();

    // Capturar os valores dos campos de entrada existentes
    const produto = inputProduto.value;
    const quantidade = inputQuantidade.value;

    // Verificar se o produto não esta zerado
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

    // Selecionar o elemento <select> correto pelo ID
    const selectUnidade = document.getElementById('unidadeProduto');
    const unidade = selectUnidade.value;

    // Criar um novo item de lista para o produto
    const novoItemLista = document.createElement('div');
    novoItemLista.classList.add('contribuicoes-input', 'proj-info-leftRightPadding');

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

    // Definir o id para o novo elemento select
    novaUnidade.id = 'novaUnidade';

    // Desabilitar o novo elemento select
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
});

// Adicionar evento de clique ao botão FAZER POSTAGEM
const botaoFazerPostagem = document.getElementById('botao-postagem');
botaoFazerPostagem.addEventListener('click', function(e) {
    e.preventDefault();
    console.log("voce clicou no botão de postagem")
});
