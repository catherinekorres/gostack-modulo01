const express = require('express');

const server = express();

server.use(express.json());

// Query params = ?test=1
// Route params = /users/1
// Request body = { "name":"Catherine", "email":"email@domain.com" } 

// CRUD = Create, Read, Update, Delete

const users = ['Catherine', 'Filipe', 'Frank']; 

// Read user(s)
server.get('/users', (req, res) => {
  return res.json(users);
});

server.get('/users/:index', (req, res) =>{
  const { index } = req.params;

  return res.json(users[index]);
});

// Create user
server.post('/users', (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

// Update user
server.put('/users/:index', (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

// Delete user
server.delete('/users/:index', (req, res) =>{
  const { index } = req.params;

  users.splice(index, 1);

  return res.send();
});

server.listen(3000);