const express = require('express');
// const app = express();
const bodyParser = require('body-parser');
const users = require('./data');

const app = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Root route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/' + 'index.html');
  });
  
  // Returns all users
  app.get('/api/users', (req, res) => {
    res.send(users);
  });
  
  // Form submission
  app.get('/api/users/new', function (req, res) {
    res.sendFile(__dirname + '/' + 'new.html');
  });
  
  // Fetches a specific user by ID.
  app.get('/api/users/:id', (req, res) => {
    const user = users.find((h) => h.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User ID not found.');
    else res.send(user);
  });
  
  // Retrieves and displays parameters.
  app.get('/api/users/:id/:name/:email/:age/:salary', (req, res) => {
    res.send(req.params);
  });
  
  // Adds a new user through form submission.
  app.post('/api/users', urlencodedParser, function (req, res) {
    // Prepare output in JSON format
    let response = {
      id: users.length + 1,
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      salary: req.body.salary,
    };
  
    users.push(response);
    res.send(users);
  });
  
  // Deletes a user by ID.
  app.delete('/api/delete/:id', (req, res) => {
    let user = users.find((h) => h.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User ID not found.');
    else {
      let userIndex = users.findIndex((h) => h.id === parseInt(req.params.id));
      users.splice(userIndex, 1);
      res.send(users);
    }
  });
  
  module.exports = app;