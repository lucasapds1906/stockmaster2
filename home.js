const homeForm = {
    criarButton: () => document.getElementById("criarButton"),
    atualizarButton: () => document.getElementById("atualizarButton")
}

function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "/index.html";
    }).catch(() => {
        alert('Erro ao fazer logout');
    })
}

// homeForm.criarButton().addEventListener('click', () => {

//     alert("Produto Cadastrado com sucesso!")

//     fetch('https://stockmaster-9d77b-default-rtdb.firebaseio.com/produtos.json', {

//         method: 'POST',
//         body: JSON.stringify(
//             {
//                 id: 7,
//                 produto: document.getElementById('produtoNome').value,
//                 valor: document.getElementById('produtoValor').value
//             }
//         )


//     })
//         .then(response => response.json()) // TRANSFORMA O ARQUIVO PARA .JSON
//         .then(data => console.log(data)) // ACESSA OS DADOS
//         .catch(error => console.log(error)) // TRATAMENTO DE ERROS

// })

function atualizarTabela() {
    fetch('https://stockmaster-9d77b-default-rtdb.firebaseio.com/produtos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar dados do Firebase');
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            renderProductsTable(data);
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

homeForm.atualizarButton().addEventListener('click', () => {
    atualizarTabela();
})



function renderProductsTable(produtos) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = ''; // Limpa o conteúdo da tabela antes de renderizar os novos dados

    // Converter os produtos em um array de pares [id, produto]
    const produtosArray = Object.entries(produtos);

    // Ordenar o array de produtos com base nos IDs
    produtosArray.sort((a, b) => a[1].id - b[1].id);

    // Renderizar os produtos ordenados na tabela
    for (const [productId, product] of produtosArray) {
        console.log(productId)
        const row = `<tr>
                        <td>${product.id}</td>
                        <td>${product.produto}</td>
                        <td>R$ ${product.valor}</td>
                        <td><button class="btn btn-danger" onclick="excluirProduto('${productId}')">Excluir</button></td>
                    </tr>`;
        tableBody.innerHTML += row;
    }
}


// Função para buscar o próximo ID disponível
function buscarProximoID() {
    return fetch('https://stockmaster-9d77b-default-rtdb.firebaseio.com/produtos.json')
        .then(response => response.json())
        .then(data => {
            const ids = [];
            for (const key in data) {
                const chaveProduto = data[key];
                ids.push(parseInt(chaveProduto.id));
            }
            return idAutoIncrement(ids);
        });
}

// Função para incrementar o ID
function idAutoIncrement(array) {
    array.sort((a, b) => a - b);
    let proximo = 1;
    for (let i = 0; i < array.length; i++) {
        if (array[i] !== proximo) {
            return proximo;
        }
        proximo++;
    }
    return proximo;
}

// Adiciona um listener de evento para o botão
homeForm.criarButton().addEventListener('click', () => {
    alert("Produto Cadastrado com sucesso!");

    // Chamada da função buscarProximoID antes de enviar a requisição
    buscarProximoID()
        .then(proximoID => {
            // Aqui você usa o próximo ID obtido
            fetch('https://stockmaster-9d77b-default-rtdb.firebaseio.com/produtos.json', {
                method: 'POST',
                body: JSON.stringify({
                    id: proximoID,
                    produto: document.getElementById('produtoNome').value,
                    valor: document.getElementById('produtoValor').value
                })
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.log(error));
        });
});

function excluirProduto(id) {
    // Realizar uma requisição para excluir o produto com o ID especificado
    fetch(`https://stockmaster-9d77b-default-rtdb.firebaseio.com/produtos/${id}.json`, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao excluir o produto');
            }
            alert('Produto excluído com sucesso!');
            // Atualizar a tabela após excluir o produto, se necessário
            // renderProductsTable(); // Chame a função para renderizar a tabela novamente
        })
        .catch(error => {
            alert('Erro ao excluir o produto:', error);
        });
}

atualizarTabela();