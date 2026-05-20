// 5ºpasso: Criar o metodo POST
//Agora o usuario poderá atualizar um pedido novo
const http = require('http');
const url = require('url');

let pedidos = [{
    id: 1,
    cliente: "Fernanda",
    produto: "Hamburguer",
    status: "pendente"
}, ];

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', "application/JSON");

    const urlCompleta = url.parse(req.url, true);

    const rota = urlCompleta.pathname;
    const metodo = req.method;

    //Metodo GET
    if(rota === '/pedidos' && metodo === 'GET'){
        res.end(JSON.stringify({
            mensagem: "Lista de pedidos",
            dados: pedidos
        }));
        return;
    }

    //Metodo POST
    if(rota === '/pedidos' && metodo ==='POST'){
        let body = '';
        
        req.on('data', parte =>{
            body+=parte
        });

        req.on('end', () =>{
            const novoPedido = JSON.parse(body);
            pedidos.push(novoPedido);

            res.statusCode = 201;
            res.end(JSON.stringify({
                mensagem: "Pedido cadastrado com sucesso",
                pedido: novoPedido
            }));
        });
        return;
    }
    //Metodo PUT
    res.statusCode = 404;
    res.end(JSON.stringify({
        mensagem: "ROTA NÃO ENCONTRADA"
    }))
});


server.listen(3000, () => {
    console.log('servidor running in http://localhost:3000');
});