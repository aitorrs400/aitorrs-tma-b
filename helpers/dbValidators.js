import Servicio from "../models/Servicio.js";


export const existeServicioPorId = async ( id ) => {

    // Verificamos si el servicio existe
    const existeServicio = await Servicio.findById(id);

    if( !existeServicio ) {
        throw new Error(`El ID de servicio no existe: ${ id }`);
    }

}