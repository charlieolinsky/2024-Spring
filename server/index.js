/*
    NodeJS using the CommonJS Module System, not ESModules
*/
const express = require('express'); //this is an artifact of CommonJS

const app = express();
const PORT = 3000;

// Here we are setting up routes: the essence of a web server

//If we have a get request on the root path, send back hello world
app.get('/', (req, res) => {
  res.send('Hello New Paltz!');
});

//this allows the app to conitnue listening for requests
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});

//Note, after any changes, you need to restart the server
//Or you can use nodemon to automatically restart the server
