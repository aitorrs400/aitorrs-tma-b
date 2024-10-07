import { request, response } from "express";


export const servicioPost = async ( req = request, res = response ) => {

    // Obtenemos los datos del servicio
    const { nombre, imagen } = req.body;

    return res.status(200).json({ msg: 'OK' });

}