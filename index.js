const express = require('express');

const server = express();

server.get('/teste', (req, res) =>{
  console.log('teste');
});

server.listen(3000);