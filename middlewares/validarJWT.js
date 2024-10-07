import { request, response } from 'express';
import jwt from 'jsonwebtoken';

export const validarJWT = async ( req = request, res = response, next ) => {

    // Obtenemos el token de la cabecera
    const token = req.header('x-token');

    // Validamos que recibimos el token
    if( !token ) {

        return res.status(401).json({ errors: [
            { msg: 'No hay token en la petición' }
        ]});

    }

    // Validamos que el JWT sea correcto
    try {

        // Obtenemos el ID del usuario y lo pasamos al controlador
        const { uid } = jwt.verify( token, process.env.JWT_KEY );
        req.uid = uid;
        next();

    } catch ( error ) {

        console.log(error);
        return res.status(401).json({ errors: [
            { msg: 'Token no válido' }
        ]});

    }

}
