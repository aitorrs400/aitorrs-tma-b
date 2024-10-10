import { request, response } from "express";
import Servicio from "../models/Servicio.js";


export const servicioGet = async (req = request, res = response) => {

    // Obtenemos el total de servicios
    const [ total, servicios ] = await Promise.all([
        Servicio.countDocuments(),
        Servicio.find()
    ]);

    // Devolvemos el resultado
    return res.status(200).json({
        uid: req.uid,
        total,
        servicios
    });

}

export const servicioIDGet = async (req = request, res = response) => {

    try {

        // Obtenemos el ID de la URL
        const id = req.params.id;
    
        // Buscamos el servicio en la base de datos por el ID
        const servicio = await Servicio.findById(id);
    
        // Si no encontramos ningún servicio con ese ID, devolvemos un mensaje de error
        if ( !servicio ) {
            return res.status(404).json({ data: [], mensaje: 'Registro no encontrado' });
        }
    
        // Si encontramos el servicio, lo devolvemos como respuesta
        res.json({ data: servicio, mensaje: 'Registro obtenido correctamente' });

    } catch (error) {

        // Si ocurre algún error, devuelve un mensaje de error y el código de estado 500 (Error del servidor)
        res.status(500).json({ data: [], mensaje: 'Error del servidor', error });

    }

}

export const servicioPost = async ( req = request, res = response ) => {

    // Obtenemos los datos del servicio
    const { nombre, imagen } = req.body;

    // Creamos una nueva instancia de Servicio con los datos del cuerpo de la petición
    const servicio  = new Servicio({
        nombre,
        imagen
    });

    // Guardamos el servicio en la base de datos
    await servicio.save();

    // Devolvemos el servicio conforme se ha creado
    return res.status(201).json( servicio );

}

export const servicioPut = async (req = request, res = response) => {

    // Obtenemos el ID del servicio
    const { id } = req.params;

    // Obtenemos los datos del servicio
    const { nombre, imagen } = req.body;

    // Actualizamos el servicio
    const servicio = await Servicio.findByIdAndUpdate( id, { nombre, imagen });

    // Devolvemos el servicio conforme se ha creado
    res.status(201).json({ mensaje: 'Actualizado correctamente', data: servicio });

}

export const servicioDelete = async (req = request, res = response) => {

    // Obtenemos el ID del servicio
    const { id } = req.params;

    try {

        // Eliminamos el servicio
        const servicio = await Servicio.deleteOne({ _id: id });

        // Devolvemos el resultado
        res.status(200).json({ mensaje: 'Eliminado correctamente', data: servicio });

    } catch (error) {

        // Si ha habido algún error, devolvemos error 500
        res.status(500).json( error );

    }

}