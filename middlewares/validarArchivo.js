const { request, response } = require('express');

const validarArchivo = (req = request, res = response, next) => {

    // Revisamos si se ha subido un archivo
    if ( !req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) {

        return res.status(400).send({ msg: 'No hay archivos que subir. Asegúrate de enviar el archivo con el identificador "archivo"' }) 
        
    }

    next();

}

module.exports = {
    validarArchivo
}