import { response, request } from 'express';
import bcryptjs from 'bcryptjs';
import Usuario from '../models/Usuario.js';
import { generarJWT } from '../helpers/generarJWT.js';

// Controlador para iniciar sesión
export const login = async ( req = request, res = response ) => {

    // Obtenemos los datos de la petición
    const { correo, contrasena } = req.body;

    try {

        // Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });   
        if( !usuario ) {
        
            return res.status(400).json({ errors: [
                {
                    msg: 'Usuario y/o contraseña incorrectos'
                }
            ]});

        }

        // Verificar si el usuario está activo todavía
        if( !usuario.estado ) {
        
            return res.status(400).json({ errors: [
                {
                    msg: 'Usuario y/o contraseña incorrectos'
                }
            ]});

        }
        
        // Verificamos la contraseña
        const validPassword = bcryptjs.compareSync( contrasena, usuario.contrasena );
        if ( !validPassword ) {

            return res.status(400).json({ errors: [
                {
                    msg: 'Usuario y/o contraseña incorrectos'
                }
            ]});

        }

        // Generamos el JWT
        const token = await generarJWT( usuario.id );

        // Devolvemos una respuesta
        return res.status(200).json({
            usuario,
            token
        });

    } catch( error ) {

        console.log( error );
        return res.status(500).json({
            errors: [
                {
                    type: '',
                    value: '',
                    msg: 'Algo ha salido mal (500)',
                    path: '',
                    location: ''
                }
            ]
        });

    }

}
