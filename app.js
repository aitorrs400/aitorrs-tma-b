import dotenv from 'dotenv';
import Server from './models/Server.js';

// Configuración de las variables de entorno
dotenv.config();

// Inicialización del servidor
const server = new Server();

// Arrancamos el servidor
server.listen();
