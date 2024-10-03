const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config');

class Server {
    
    constructor() {

        // Inicialización del servidor
        this.app = express();
        this.port = process.env.PORT;

        // Rutas del servidor API
        this.paths = {
            auth:       '/api/auth',
            buscar:     '/api/buscar',
            categorias: '/api/categorias',
            uploads:    '/api/uploads',
            usuarios:   '/api/usuarios',
            productos:  '/api/productos'
        }

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

        // Carga del directorio público
        this.app.use( express.static('public') );

        // Subida de archivos al servidor
        this.app.use( fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));

    }

    // Declaración de rutas
    routes() {
    
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
        this.app.use(this.paths.usuarios, require('../routes/user'));
        this.app.use(this.paths.productos, require('../routes/productos'));

    }

    // Arranque del servidor
    start() {
        this.app.listen( this.port, () => {
            console.log('Servidor iniciado en el puerto', this.port );
        });
    }

}

module.exports = Server;