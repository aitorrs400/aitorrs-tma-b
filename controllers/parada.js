import { request, response } from "express";
import Parada from "../models/Parada.js";


export const paradaGet = async (req = request, res = response) => {

    // Obtenemos el total de paradas
    const [ total, paradas ] = await Promise.all([
        Parada.countDocuments(),
        Parada.find()
    ]);

    // Devolvemos el resultado
    return res.status(200).json({
        uid: req.uid,
        total,
        paradas
    });

}

export const paradaIDGet = async (req = request, res = response) => {

    try {

        // Obtenemos el ID de la URL
        const id = req.params.id;
    
        // Buscamos la parada en la base de datos por el ID
        const parada = await Parada.findById(id);
    
        // Si no encontramos ninguna parada con ese ID, devolvemos un mensaje de error
        if ( !parada ) {
            return res.status(404).json({ data: [], mensaje: 'Registro no encontrado' });
        }
    
        // Si encontramos la parada, lo devolvemos como respuesta
        res.json({ data: parada, mensaje: 'Registro obtenido correctamente' });

    } catch (error) {

        // Si ocurre algún error, devuelve un mensaje de error y el código de estado 500 (Error del servidor)
        res.status(500).json({ data: [], mensaje: 'Error del servidor', error });

    }

}

export const paradaPost = async ( req = request, res = response ) => {

    // Obtenemos los datos de la parada
    const { codigo, nombre, linea } = req.body;

    // Creamos una nueva instancia de Parada con los datos del cuerpo de la petición
    const parada  = new Parada({
        codigo,
        nombre,
        linea
    });

    // Guardamos la parada en la base de datos
    await parada.save();

    // Devolvemos la parada conforme se ha creado
    return res.status(201).json( parada );

}

export const paradaPut = async (req = request, res = response) => {

    // Obtenemos el ID de la parada
    const { id } = req.params;

    // Obtenemos los datos de la parada
    const { codigo, nombre, linea } = req.body;

    // Actualizamos la parada
    const parada = await Parada.findByIdAndUpdate( id, { codigo, nombre, linea });

    // Devolvemos la parada conforme se ha creado
    res.status(201).json({ mensaje: 'Actualizado correctamente', data: parada });

}

export const paradaDelete = async (req = request, res = response) => {

    // Obtenemos el ID de la parada
    const { id } = req.params;

    try {

        // Eliminamos la parada
        const parada = await Parada.deleteOne({ _id: id });

        // Devolvemos el resultado
        res.status(200).json({ mensaje: 'Eliminado correctamente', data: parada });

    } catch (error) {

        // Si ha habido algún error, devolvemos error 500
        res.status(500).json( error );

    }

}