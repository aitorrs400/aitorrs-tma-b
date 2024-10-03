const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const { Usuario } = require('../models');
const { generarJWT, googleVerify } = require('../helpers');

// Controlador para iniciar sesión
const login = async ( req = request, res = response ) => {

    // Obtenemos los datos de la petición
    const { email, password } = req.body;

    try {

        // Verificar si el email existe
        const user = await Usuario.findOne({ email });
        
        if( !user ) {
        
            return res.status(400).json({
                errors: [
                    {
                        type: 'filed',
                        value: '',
                        msg: 'No existe un usuario con ese correo',
                        path: 'email',
                        location: 'body'
                    }
                ]
            });

        }

        // Verificar si el usuario está activo todavía
        if( user.state == false ) {
        
            return res.status(400).json({
                errors: [
                    {
                        type: 'filed',
                        value: '',
                        msg: 'No existe un usuario con ese correo',
                        path: 'email',
                        location: 'body'
                    }
                ]
            });

        }
        
        // Verificar la contraseña
        const validPassword = bcrypt.compareSync( password, user.password );
        if( !validPassword ) {

            return res.status(400).json({
                errors: [
                    {
                        type: 'filed',
                        value: '',
                        msg: 'La contraseña es incorrecta',
                        path: 'password',
                        location: 'body'
                    }
                ]
            });
        
        }

        // Generar JWT
        const token = await generarJWT( user.id );

        // Si todo ha ido bien, 
        res.json({
            msg: 'Login OK',
            user,
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

const googleSignIn = async ( req = request, res = response ) => {

    const { id_token } = req.body;

    try {

        const { name, picture, email } = await googleVerify( id_token );

        // Revisamos si existe el usuario en la BD
        let usuario = await Usuario.findOne({ email });
        if( !usuario ) {

            const data = {
                name,
                email,
                password: 'xD',
                img: picture,
                role: 'USER_ROLE',
                state: true,
                google: true
            };

            usuario = new Usuario( data );
            await usuario.save();

        }

        // Si el usuario en BD está eliminado
        if( !usuario.state ) {
        
            return res.status(401).json({
                msg: 'Esta cuenta está deshabilitada. Habla con el administrador'
            });

        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );
        
        res.json({
            msg: 'Todo OK',
            usuario,
            token
        });

    } catch (error) {

        console.log( error );
        res.status(400).json({
            msg: 'El token no se ha podido verificar'
        });

    }

}

module.exports = {
    login,
    googleSignIn
}