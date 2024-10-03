const { request, response } = require('express');
const { Categoria } = require('../models');


// paginado - total - populate
const obtenerCategorías = async (req = request, res = response) => {

    // Obtenemos los datos de la petición
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    // Consultamos en la base de datos
    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments( query ),
        Categoria.find( query )
            .populate('usuario', 'name')
            .skip( Number(desde) )
            .limit( Number(limite) )
    ]);

    // Devolvemos la respuesta
    res.json({
        total,
        categorias
    });

}

// populate
const obtenerCategoria = async (req = request, res = response) => {

    // Obtenemos los datos de la petición
    const { id } = req.params;

    // Obtenemos los datos de la base de datos
    const categoria = await Categoria.findById( id ).populate('usuario', 'name');

    // Devolvemos el resultado
    res.json( categoria );

}

const crearCategoria = async (req = request, res = response) => {

    // Obtenemos los datos de la petición
    const nombre = req.body.nombre.toUpperCase();

    // Revisamos si ya existe una categoría con ese nombre
    const categoriaDB = await Categoria.findOne({ nombre });
    if( categoriaDB ) {

        res.status(400).json({
            msg: `La categoría ${ categoriaDB.nombre } ya existe`
        });

    }

    // Generamos los datos a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    // Grabamos los datos en la BD
    const categoria = new Categoria( data );
    await categoria.save();

    // Devolvemos el resultado
    res.status(201).json( categoria );

}

const actualizarCategoria = async (req = request, res = response) => {

    // Obtenemos los datos de la petición
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    // Preparamos los datos a actualizar
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    // Realizamos la actualización en la BD
    const categoria = await Categoria.findByIdAndUpdate( id, data, { new: true });

    // Devolvemos el resultado
    res.json( categoria );

}

const borrarCategoria = async (req = request, res = response) => {

    // Obtenemos los datos de la petición
    const { id } = req.params;

    // Realizamos la actualización en la BD
    const categoria = await Categoria.findByIdAndUpdate( id, { estado: false }, { new: true });

    // Devolvemos el resultado
    res.json( categoria );

}

module.exports = {
    obtenerCategorías,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
}