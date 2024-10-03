const { Usuario, Role, Categoria, Producto } = require('../models');

// Helper que evalua que el rol indicado existe en la BD
const esRolValido = async (role = '' ) => {

    const existeRol = await Role.findOne({ role });
    if( !existeRol ) {
        throw new Error(`El rol ${ role } no existe`);
    }

}

// Helper que evalua si el correo facilitado está registrado en la BD
const existeEmail = async (email = '' ) => {

    const existeUsuario = await Usuario.findOne({ email });
    if ( existeUsuario ) {
        throw new Error(`El correo ${ email } ya existe`);
    }

}

// Helper que evalua que existe un usuario por el ID facilitado
const existeUsuarioPorId = async ( id = '' ) => {

    const existeUsuario = await Usuario.findById( id );
    if ( !existeUsuario ) {
        throw new Error(`El usuario con id ${ id } no existe`);
    }

}

/**
 * Categorías
 */

// Helper que evalua que existe una categoria por el ID facilitado
const existeCategoriaPorId = async ( id = '' ) => {

    const existeCategoria = await Categoria.findById( id );
    if ( !existeCategoria ) {
        throw new Error(`La categoria con id ${ id } no existe`);
    }

}

/**
 * Productos
 */

// Helper que evalua que existe una categoria por el ID facilitado
const existeProductoPorId = async ( id = '' ) => {

    const existeProducto = await Producto.findById( id );
    if ( !existeProducto ) {
        throw new Error(`El producto con id ${ id } no existe`);
    }

}

// Helper para validar las colecciones permitidas
const coleccionesPermitidas = ( coleccion = '', colecciones = [] ) => {

    const incluida = colecciones.includes( coleccion );
    if( !incluida ) {
        throw new Error(`La colección ${ coleccion } no está permitida. Colecciones permitidas: ${ colecciones }`);
    }

    return true;
    
}

module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
};