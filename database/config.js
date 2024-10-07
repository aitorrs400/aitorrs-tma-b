import mongoose from 'mongoose';

export const dbConnection = async () => {

    try {
    
        mongoose.set('strictQuery', false);
        await mongoose.connect( process.env.MONGODB_CNN, { dbName: 'aitorrs-tma' } );
        
        console.log('Conexión a la base de datos realizada con éxito');

    } catch( error ) {

        console.error( error );
        throw new Error('Error al intentar conectar a la base de datos');
        
    }

}
