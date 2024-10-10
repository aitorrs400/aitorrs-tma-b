import { request, response } from "express";
import Linea from "../models/Linea.js";


export const lineaGet = async (req = request, res = response) => {

    // Obtenemos el total de lineas
    const [ total, lineas ] = await Promise.all([
        Linea.countDocuments(),
        Linea.find()
    ]);

    // Devolvemos el resultado
    return res.status(200).json({
        uid: req.uid,
        total,
        lineas
    });

}

export const lineaIDGet = async (req = request, res = response) => {

    try {

        // Obtenemos el ID de la URL
        const id = req.params.id;
    
        // Buscamos la línea en la base de datos por el ID
        const linea = await Linea.findById(id);
    
        // Si no encontramos ninguna línea con ese ID, devolvemos un mensaje de error
        if ( !linea ) {
            return res.status(404).json({ data: [], mensaje: 'Registro no encontrado' });
        }
    
        // Si encontramos la línea, lo devolvemos como respuesta
        res.json({ data: linea, mensaje: 'Registro obtenido correctamente' });

    } catch (error) {

        // Si ocurre algún error, devuelve un mensaje de error y el código de estado 500 (Error del servidor)
        res.status(500).json({ data: [], mensaje: 'Error del servidor', error });

    }

}

export const lineaPost = async ( req = request, res = response ) => {

    // Obtenemos los datos de la linea
    const { nombre, label, colorFondo, colorTexto, servicio } = req.body;

    // Creamos una nueva instancia de Linea con los datos del cuerpo de la petición
    const linea  = new Linea({
        nombre,
        label,
        colorFondo,
        colorTexto,
        servicio
    });

    // Guardamos la línea en la base de datos
    await linea.save();

    // Devolvemos la línea conforme se ha creado
    return res.status(201).json( linea );

}

export const lineaPut = async (req = request, res = response) => {

    // Obtenemos el ID de la línea
    const { id } = req.params;

    // Obtenemos los datos de la línea
    const { nombre, label, colorFondo, colorTexto, servicio } = req.body;

    // Actualizamos la línea
    const linea = await Linea.findByIdAndUpdate( id, { nombre, label, colorFondo, colorTexto, servicio });

    // Devolvemos la línea conforme se ha creado
    res.status(201).json({ mensaje: 'Actualizado correctamente', data: linea });

}

export const lineaDelete = async (req = request, res = response) => {

    // Obtenemos el ID de la línea
    const { id } = req.params;

    try {

        // Eliminamos la línea
        const linea = await Linea.deleteOne({ _id: id });

        // Devolvemos el resultado
        res.status(200).json({ mensaje: 'Eliminado correctamente', data: linea });

    } catch (error) {

        // Si ha habido algún error, devolvemos error 500
        res.status(500).json( error );

    }

}