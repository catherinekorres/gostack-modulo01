const express = require('express');

const server = express();

// Query params = ?test=1
// Route params = /users/1
// Request body = { "name":"Catherine", "email":"email@domain.com" } 

// CRUD = Create, Read, Update, Delete

const users = ['Catherine', 'Filipe', 'Frank']; 

server.get('/users', (req, res) => {
  return res.json(users);
});

server.get('/users/:index', (req, res) =>{
  const { index } = req.params;

  return res.json(users[index]);
});

server.listen(3000);