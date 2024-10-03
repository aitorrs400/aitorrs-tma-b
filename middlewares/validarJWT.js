const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const validarJWT = async ( req = request, res = response, next ) => {

    const token = req.header('x-token');

    // Validamos si se recibe un token en la petición
    if( !token ) {
    
        return res.status(401).json({
            msg: 'No hay un token en la petición'
        });

    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // Leemos el usuario que corresponde con el uid
        const usuario = await Usuario.findById( uid );

        // Validamos que nos regrese un usuario
        if( !usuario ) {
        
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe en BD'
            });
            
        }

        // Verificar si el usuario no está eliminado
        if( !usuario.state ) {
        
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado eliminado'
            });

        }

        req.usuario = usuario;
        
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });

    }

}

module.exports = {
    validarJWT
}