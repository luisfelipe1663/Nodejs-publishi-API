// 1ºpasso: Criçao e teste do servidor
const http = require('http');
 
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/JSON');
  res.end(JSON.stringify({ message: 'Servidor funcionando!'
  }));
});
 
server.listen(3000, () => {
  console.log('servidor running in http://localhost:3000');
});