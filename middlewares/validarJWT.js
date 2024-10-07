import { request, response } from 'express';
import jwt from 'jsonwebtoken';
const Usuario = require('../models/Usuario');

export const validarJWT = async ( req = request, res = response, next ) => {

    // Obtenemos el token de la cabecera
    const token = req.header('x-token');

    // Validamos si se recibe un token en la petición
    if( !token ) {
    
        return res.status(401).json({
            msg: 'No hay un token en la petición'
        });

    }

    // Validamos que el JWT sea correcto
    try {

        const { uid } = jwt.verify( token, process.env.JWT_KEY );

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
        req.uid = uid;
        next();

    } catch (error) {

        console.log(error);
        return res.status(401).json({ errors: [
            { msg: 'Token no válido' }
        ]});

    }

}
