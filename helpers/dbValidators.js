import Linea from "../models/Linea.js";
import Servicio from "../models/Servicio.js";


export const existeServicioPorId = async ( id ) => {

    // Verificamos si el servicio existe
    const existeServicio = await Servicio.findById(id);

    if( !existeServicio ) {
        throw new Error(`El ID de servicio no existe: ${ id }`);
    }

}

export const existeLineaPorId = async ( id ) => {

    // Verificamos si la línea existe
    const existeLinea = await Linea.findById(id);

    if( !existeLinea ) {
        throw new Error(`El ID de línea no existe: ${ id }`);
    }

}