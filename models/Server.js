import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { dbConnection } from '../database/config.js';
import { authRoutes, servicioRoutes, lineaRoutes, paradaRoutes } from '../routes/index.js';

class Server {
    
    constructor() {

        // Inicialización del servidor
        this.app = express();
        this.port = process.env.PORT;
        this.authPath = '/api/auth';
        this.servicioPath = '/api/servicio';
        this.lineaPath = '/api/linea';
        this.paradaPath = '/api/parada';

        // Conexión a la base de datos
        this.conexionDB();

        // Middlewares (complementos del servidor)
        this.middlewares();

        // Cargamos las rutas del servidor
        this.routes();

    }

    async conexionDB() {
        await dbConnection();
    }

    // Declaración de middlewares
    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body de las peticiones
        this.app.use( express.json() );

    }

    // Declaración de rutas
    routes() {
    
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.servicioPath, servicioRoutes);
        this.app.use(this.lineaPath, lineaRoutes);
        this.app.use(this.paradaPath, paradaRoutes);

        // Preparamos variables para el directorio
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);

        // Obtener el directorio padre del directorio actual
        const parentDir = join(__dirname, '..');

        // Servimos la aplicación de React
        this.app.use( express.static(parentDir + '/public') );

        // Configuramos ruta para el Front-End
        this.app.get('*', (req, res) => {
            res.sendFile( parentDir + '/public/index.html');
        });

    }

    // Arranque del servidor
    listen() {

        // Empezamos a escuchar
        this.app.listen( this.port, () => {
            console.log('Servidor iniciado en el puerto', this.port );
        });

    }

}

export default Server;
