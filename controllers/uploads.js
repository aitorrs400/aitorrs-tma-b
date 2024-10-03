const path = require('path');
const fs = require('fs');
const { request, response } = require('express');
const { subirArchivo } = require('../helpers');
const { Usuario, Producto } = require('../models');


const cargarArchivo = async (req = request, res = response ) => {

    try {
        
        // Imagenes
        const nombre = await subirArchivo( req.files, undefined, 'imgs' );

        res.json({
            nombre
        });

    } catch (msg) {

        res.json({
            msg
        })
        
    }

}

const actualizarImagen = async (req = request, res = response) => {

    const { coleccion, id } = req.params;

    let modelo;

    // Según la colección recibida, haremos una cosa u otra
    switch ( coleccion ) {
        case 'usuarios':
            
            modelo = await Usuario.findById(id);
            if( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                });
            }
            break;

        case 'productos':
            
            modelo = await Producto.findById(id);
            if( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${ id }`
                });
            }
            break;
    
        default:
            
            return res.status(500).json({
                msg: 'Se me olvidó validar esto'
            });

    }

    // Limpiamos imágenes previas
    try {

        if( modelo.img ) {

            // Vamos a borrar la imagen
            const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img );
            if( fs.existsSync(pathImagen) ) {
                fs.unlinkSync( pathImagen );
            }
            
        }
        
    } catch (error) {
        
    }

    // Subimos el archivo a la carpeta correspondiente
    const nombre = await subirArchivo( req.files, undefined, coleccion );
    modelo.img = nombre;

    // Guardamos la dirección de la imagen en la BD
    await modelo.save();

    res.json( modelo );

}

const mostrarImagen = async (req = request, res = response) => {

    // Obtenemos los datos de la petición
    const { id, coleccion } = req.params;

    let modelo;

    // Según la colección recibida, haremos una cosa u otra
    switch ( coleccion ) {
        case 'usuarios':
            
            modelo = await Usuario.findById(id);
            if( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                });
            }
            break;

        case 'productos':
            
            modelo = await Producto.findById(id);
            if( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${ id }`
                });
            }
            break;
    
        default:
            
            return res.status(500).json({
                msg: 'Se me olvidó validar esto'
            });

    }

    // Obtenemos la imagen solicitada
    if( modelo.img ) {

        // Vamos a crear la ruta de la imagen
        const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img );
        if( fs.existsSync(pathImagen) ) {
            return res.sendFile( pathImagen );
        }
        
    }

    // En el caso de que no exista la imagen, enviamos una por defecto
    const pathImagen = path.join( __dirname, '../assets/no-image.jpg' );
    res.sendFile( pathImagen );

}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen
}