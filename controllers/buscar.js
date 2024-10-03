const { request, response } = require('express');
const { ObjectId } = require('mongoose').Types;
const { Usuario, Categoria, Producto } = require('../models');

const coleccionesPermitidas = [
    'categorias',
    'productos',
    'roles',
    'usuarios'
];

// Función para buscar por usuario
const buscarUsuarios = async ( termino = '', res = response ) => {

    // Validamos si es un mongoID
    const esMongoID = ObjectId.isValid( termino );
    if( esMongoID ) {
    
        const usuario = await Usuario.findById( termino );
        return res.json({
            results: ( usuario ) ? [ usuario ] : []
        });

    }

    // Usamos una expresión regular para buscar
    const regexp = new RegExp( termino, 'i' );

    // El término es una palabra. Buscamos por NOMBRE o EMAIL
    const usuarios = await Usuario.find({
        $or: [{ name: regexp }, { email: regexp }],
        $and: [{ state: true }]
    });

    // Devolvemos el resultado
    return res.json({
        results: usuarios
    });

}

// Función para buscar por categoría
const buscarCategorias = async ( termino = '', res = response ) => {

    // Validamos si es un mongoID
    const esMongoID = ObjectId.isValid( termino );
    if( esMongoID ) {
    
        const categoria = await Categoria.findById( termino );
        return res.json({
            results: ( categoria ) ? [ categoria ] : []
        });

    }

    // Usamos una expresión regular para buscar
    const regexp = new RegExp( termino, 'i' );

    // El término es una palabra. Buscamos por NOMBRE o EMAIL
    const categorias = await Categoria.find({ nombre: regexp, estado: true });

    // Devolvemos el resultado
    return res.json({
        results: categorias
    });

}

// Función para buscar por producto
const buscarProductos = async ( termino = '', res = response ) => {

    // Validamos si es un mongoID
    const esMongoID = ObjectId.isValid( termino );
    if( esMongoID ) {
    
        const producto = await Producto.findById( termino ).populate('categoria', 'nombre');
        return res.json({
            results: ( producto ) ? [ producto ] : []
        });

    }

    // Usamos una expresión regular para buscar
    const regexp = new RegExp( termino, 'i' );

    // El término es una palabra. Buscamos por NOMBRE o EMAIL
    const productos = await Producto.find({ nombre: regexp, estado: true }).populate('categoria', 'nombre');

    // Devolvemos el resultado
    return res.json({
        results: productos
    });

}

const buscar = (req = request, res = response) => {

    // Obtenemos los datos de la petición
    const { coleccion, termino } = req.params;

    // Comprobamos si la colección a buscar está en el servidor
    if( !coleccionesPermitidas.includes( coleccion ) ) {

        res.status(400).json({
            msg: `Las colecciones permitidas son: ${ coleccionesPermitidas }`
        });

    }

    // Según la colección seleccionada, hacemos una búsqueda u otra
    switch( coleccion ) {

        case 'categorias':
            buscarCategorias( termino, res );
            break;

        case 'productos':
            buscarProductos( termino, res );
            break;

        case 'usuarios':
            buscarUsuarios( termino, res );
            break;

        default:
            res.status(500).json({
                msg: 'Se me olvidó hacer esta búsqueda'
            });
            break;

    }

}

module.exports = {
    buscar
}