const express = require('express');

const server = express();

server.use(express.json());

// Query params = ?test=1
// Route params = /users/1
// Request body = { "name":"Catherine", "email":"email@domain.com" } 

// CRUD = Create, Read, Update, Delete

const users = ['Catherine', 'Filipe', 'Frank']; 

// Global middleware
server.use((req, res, next) => {
  console.time('Request');
  console.log(`Método ${req.method}; URL: ${req.url};`);

  next();

  console.timeEnd('Request');
});

// Middlewares
function checkUserExists(req, res, next) {
  if(!req.body.name) {
    return res.status(400).json({ error: 'User name is required'});
  }

  return next();
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];

  if (!user){
    return res.status(400).json({ error: 'User does not exist'});
  }

  req.user = user;

  return next();
}

// Read user(s)
server.get('/users', (req, res) => {
  return res.json(users);
});

server.get('/users/:index', checkUserInArray, (req, res) =>{
  return res.json(req.user);
});

// Create user
server.post('/users', checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

// Update user
server.put('/users/:index', checkUserInArray, checkUserExists, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

// Delete user
server.delete('/users/:index', checkUserInArray, (req, res) =>{
  const { index } = req.params;

  users.splice(index, 1);

  return res.send();
});

server.listen(3000);