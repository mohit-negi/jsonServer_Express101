const express = require('express');

const app = express();
const port = 3000;

// Custom CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
// Routes
app.get('/get/usernamebyid/:id', (req, res) => {
    const userId = req.params.id;
    // Perform logic to retrieve the username based on the userId
  
    // Example response
    const username = 'John Doe';
    res.send(`Username for ID ${userId}: ${username}`);
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
