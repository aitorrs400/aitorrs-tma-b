require('dotenv').config(); // Cargamos las variables de entorno

const Server = require('./models/Server');

// Instanciamos el servidor
const server = new Server();

// Arrancamos el servidor
server.start();