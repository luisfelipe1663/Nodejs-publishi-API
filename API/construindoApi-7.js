// 7ºpasso: Ajustes para publicação e consumo
const http = require('http');
const url = require('url');

let pedidos = [{
    id: 1,
    cliente: "Fernanda",
    produto: "Hamburguer",
    status: "pendente"
}];

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', "application/JSON");

    const urlCompleta = url.parse(req.url, true);

    const rota = urlCompleta.pathname;
    const metodo = req.method;
    //liberação do CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    //METODO OPTIONS
    if (metodo === "OPTIONS") {
        res.statusCode = 204;
        res.end();
        return;
    }

    //Metodo GET
    if (rota === '/pedidos' && metodo === 'GET') {
        res.end(JSON.stringify({
            mensagem: "Lista de pedidos",
            dados: pedidos
        }));
        return;
    }

    //Metodo POST
    if (rota === '/pedidos' && metodo === 'POST') {
        let body = '';

        req.on('data', parte => {
            body += parte
        });

        req.on('end', () => {
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
    if (rota === '/pedidos' && metodo === 'PUT') {
        let body = '';
        req.on('data', parte => {
            body += parte;
        });
        req.on('end', () => {
            const dados = JSON.parse(body);
            let encontrado = false;

            pedidos = pedidos.map(pedido => {
                if (pedido.id === dados.id) {
                    encontrado = true;
                    return {
                        ...pedido,
                        status: dados.status
                    };

                }
                return pedido;
            });
            if (!encontrado) {
                res.statusCode = 404;
                res.end(JSON.stringify({
                    mensagem: "pedido Não encontrado"
                }));
                return;
            }
            res.end(JSON.stringify({
                mensagem: "pedido atualizado com sucesso",
                dados: pedidos
            }));
        });
        return;
    }

    //METODO DELETE

    if (rota === '/pedidos' && metodo === 'DELETE') {
        let body = ''
        req.on('data', parte => {
            body += parte
        });
        req.on('end', () => {
            const dados = JSON.parse(body);
            const tamanhoAntes = pedidos.length;
            pedidos = pedidos.filter(pedido => pedido.id !== dados.id);
            if (pedidos.length === tamanhoAntes) {
                res.statusCode = 404;
                res.end(JSON.stringify({
                    mensagem: "Pedido não encontrado"
                }));
                return;
            }
            res.end(JSON.stringify({
                mensagem: "Pedido removido",
                dados: pedidos
            }))
        });
        return;
    }

    res.statusCode = 404;
    res.end(JSON.stringify({
        mensagem: "ROTA NÃO ENCONTRADA"
    }));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running in ${PORT}`);
});