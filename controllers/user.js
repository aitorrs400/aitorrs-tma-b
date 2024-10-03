const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/Usuario');

// Controladores de las rutas de usuarios

const userGet = async ( req = request, res = response ) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { state: true };

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find( query )
            .skip( Number(from) )
            .limit( Number(limit) )
    ]);

    res.json({
        total,
        usuarios
    });

}

const userPost = async ( req = request, res = response ) => {

    // Obtenemos los datos de la petición
    const { name, email, password, role } = req.body;
    const usuario = new Usuario({ name, email, password, role });

    // Encripar la contraseña
    const salt = await bcryptjs.genSaltSync();
    usuario.password = await bcryptjs.hashSync( password, salt );

    // Guardar el usuario en la base de datos
    await usuario.save();

    res.status(201).json({
        msg: 'Post API - controlador',
        usuario
    });

}

const userPut = async ( req = request, res = response ) => {

    const id = req.params.id;
    const { _id, password, google, ...user } = req.body;

    //TODO validar que el usuario no sea nulo
    if( password ) {
    
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync( password, salt );
    
    }

    const usuario = await Usuario.findByIdAndUpdate( id, user );

    res.json({
        msg: 'Put API - controlador',
        usuario
    });

}

const userDelete = async ( req, res = response ) => {

    const { id } = req.params;
    
    const usuario = await Usuario.findByIdAndUpdate( id, { state: false } );
    const usuarioAutenticado = req.usuario;

    res.json({ usuario, usuarioAutenticado });

}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
}