const { request, response } = require('express');
const { Producto, Categoria } = require('../models');


// paginado - total - populate
const obtenerProductos = async (req = request, res = response) => {

    // Obtenemos los datos de la petición
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    // Consultamos en la base de datos
    const [ total, productos ] = await Promise.all([
        Producto.countDocuments( query ),
        Producto.find( query )
            .populate('usuario', 'name')
            .populate('categoria', 'nombre')
            .skip( Number(desde) )
            .limit( Number(limite) )
    ]);

    // Devolvemos la respuesta
    res.json({
        total,
        productos
    });

}

// populate
const obtenerProducto = async (req = request, res = response) => {

    // Obtenemos los datos de la petición
    const { id } = req.params;

    // Obtenemos los datos de la base de datos
    const producto = await Producto.findById( id )
        .populate('usuario', 'name')
        .populate('categoria', 'nombre');

    // Devolvemos el resultado
    res.json( producto );

}

const crearProducto = async (req = request, res = response) => {

    // Obtenemos los datos de la petición
    const { estado, usuario, ...body } = req.body;

    // Revisamos si ya existe un producto con ese nombre
    const productoDB = await Producto.findOne({ nombre: body.nombre.toUpperCase() });
    if( productoDB ) {

        res.status(400).json({
            msg: `El producto ${ productoDB.nombre } ya existe`
        });

    }

    // Generamos los datos a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    // Grabamos los datos en la BD
    const producto = new Producto( data );
    await producto.save();

    // Devolvemos el resultado
    res.status(201).json( producto );

}

const actualizarProducto = async (req = request, res = response) => {

    // Obtenemos los datos de la petición
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    // Preparamos los datos a actualizar
    if( data.nombre ) {
        data.nombre = data.nombre.toUpperCase();
    }
    data.usuario = req.usuario._id;

    // Realizamos la actualización en la BD
    const producto = await Producto.findByIdAndUpdate( id, data, { new: true });

    // Devolvemos el resultado
    res.json( producto );

}

const borrarProducto = async (req = request, res = response) => {

    // Obtenemos los datos de la petición
    const { id } = req.params;

    // Realizamos la actualización en la BD
    const producto = await Producto.findByIdAndUpdate( id, { estado: false }, { new: true });

    // Devolvemos el resultado
    res.json( producto );

}

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
}