const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
    
        await mongoose.connect( process.env.MONGODB_CNN );
        console.log('Conectado a la base de datos');

    } catch( error ) {
        console.error( error );
        throw new Error('Error al intentar conectar a la base de datos');
    }

}

module.exports = {
    dbConnection
};