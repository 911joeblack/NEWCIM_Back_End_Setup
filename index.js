const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const roles = ['dev', 'admin', 'viewer', 'passenger'];

let users = [
  { id: 1, name: 'User1', role: 'dev' },
  { id: 2, name: 'User2', role: 'admin' },
  { id: 3, name: 'User3', role: 'viewer' },
  { id: 4, name: 'User4', role: 'passenger' },
];

// Endpoint to get all users
app.get('/users', (req, res) => {
  res.json(users);
});

// Endpoint to get a user by ID
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

// Endpoint to change a user's role
app.put('/users/:id/role', (req, res) => {
  const userId = req.params.id;
  const newRole = req.body.role;
  
  if (!roles.includes(newRole)) {
    return res.status(400).send('Invalid role');
  }

  const user = users.find(u => u.id == userId);
  if (user) {
    user.role = newRole;
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
