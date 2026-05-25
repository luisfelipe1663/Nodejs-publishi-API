// Função responsavel por buscar todos os pedidos na api e exibir na tela
function listarPedidos() {
    //busca o elemento HTML(lista), onde a listagem de pedidos será exibida
    const lista = document.getElementById("lista");
    //Conexão suave entre a interfce e a conexão da API
    lista.innerHTML = "Carregando pedidos...";

    //Faz a uma requisição GET para a API com a url publicada
    fetch("https://nodejs-publishi-api.onrender.com/pedidos")

        //convertendo a resposta da API para JSON
        .then(res => res.json())
        //Trabalhando o resultado da API
        .then(resultado => {
            //Limpando a lista para preencher com os pedidos
            lista.innerHTML = "";
            //Percorrendo o array de pedidos recebido da API
            resultado.dados.forEach(pedido => {
                //Cria um itam de linha para cada pedido
                const item = document.createElement("li");

                //Define como o texto será exibido na tela
                item.textContent = `${pedido.id} - ${pedido.cliente} | ${pedido.produto} | ${pedido.status}`;
                //Adiciona o item dentro da lista 
                lista.appendChild(item);
            });
        })
        //Caso o front não consiga acessar a API para trazer os dados
        .catch(() => {
            lista.innerHTML = "Erro ao carregar os pedidos"
        });
};

// Função responsável pela criação de novo pedidos
function cadastrarPedido() {
    //Pega os valores digitados nos inputs do HTML e depois limpar
    const cliente = document.getElementById("cliente").value;
    const produto = document.getElementById("produto").value;

    //Envia uma requisição POST para a API
    fetch("https://nodejs-publishi-api.onrender.com/pedidos", {
            method: "POST",
            headers: {
                'Content-Type': 'application/JSON'
            },
            //Converte os dados em JSON, para entregar para o BODY
            body: JSON.stringify({
                id: Date.now(),
                cliente: cliente,
                produto: produto,
                status: 'pendente'
            })
        })
        //Converter a resposta da API para JSON
        .then(res => res.json())
        .then(() => {
            //Limpar os inputs apos o envio de cadastro 
            document.getElementById("cliente").value = "";
             document.getElementById("produto").value = "";
             //Atualiza a lista de pedidos
             listarPedidos();
        })
        //Alerta para caso não seja possivel relizar o cadastro de podido
        .catch(()=>{
            alert("Erro ao cadastrar pedido")
        });
}

//Função responsavel por atulizar o status de um pedido
function AtualizarPedido(){
    //Pega o ID informado e força a ser um numero
const id = Number(document.getElementById("idAtualizar").value);

//Pega o novo status do pedido(digitado no input)
const status = document.getElementById("statusAtualizar").value;

// Envia uma requisição PUT para a API
 fetch("https://nodejs-publishi-api.onrender.com/pedidos", {
    method: "PUT", 
    headers: {'Content-Type': 'application/JSON'},
    body:JSON.stringify({
        //Envia o ID e o novo status do pedido
        id:id,
        status:status
    })
 })

 .then(res => res.json())
 //Dwpois de atualizar, buscara a lista de pedidos novamente e limpara os campos de id e status
 .then(() =>{
    document.getElementById("idAtualizar").value="";
    document.getElementById("statusAtualizar").value="";
    listarPedidos();
 })
 .catch(()=>{
    alert("erro ao editar o pedido");
 });
}
//Função responsavel por remover um pedido
function removerPedido(){
      //Pega o ID informado e força a ser um numero
const id = Number(document.getElementById("idRemover").value);

fetch("https://nodejs-publishi-api.onrender.com/pedidos", {
    method: "DELETE",
    headers: {'Content-Type':'application/JSON'},
    //Envia apenas o ID do pedido a ser removido
    body: JSON.stringify({
        id:id
    })
})
.then(res => res.json())
//limpar o campo de ID e atualiza a lista de pedidos
.then(()=>{
    document.getElementById("idRemover").value=""
    listarPedidos();
})
.catch(()=>{
    alert("Erro ao cancelar o pedido")
})

}
//Chama a função assim que a pagina carregar
listarPedidos();