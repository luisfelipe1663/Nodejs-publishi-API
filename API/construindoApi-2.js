// 2ºpasso: exibiçãi da rota e do método
const http = require('http');
const url = require('url');
 
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', "application/JSON");
  
  const urlCompleta = url.parse(req.url, true);

  const rota = urlCompleta.pathname;
  const metodo = urlCompleta.method;
  res.end(JSON.stringify({ 
    message: 'Servidor funcionando!',
    rota: rota,
    medoto: metodo
  }));
});

server.listen(3000, () => {
  console.log('servidor running in http://localhost:3000');
});