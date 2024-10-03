const path = require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = ( files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '' ) => {
    return new Promise( (resolve, reject) => {

        // Guardamos la referencia del archivo (nombre, extension, etc...)
        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[ nombreCortado.length - 1 ];

        // Validamos la extensión del archivo
        if( !extensionesValidas.includes( extension ) ) {

            reject(`La extensión ${ extension } no está permitida. Extensiones permitidas: ${ extensionesValidas }`);

        }

        // Preparamos la ruta y el nombre donde guardar el archivo
        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join( __dirname, '../uploads/', carpeta, nombreTemp);

        // Movemos el archivo al directorio
        archivo.mv( uploadPath, (err) => {

            // Si ha habido un error, devolvemos un mensaje
            if (err) {
                reject( err );
            }

            // Si todo ha ido bien, devolvemos un mensaje
            resolve( nombreTemp );

        });
    
    });
}

module.exports = {
    subirArchivo
}