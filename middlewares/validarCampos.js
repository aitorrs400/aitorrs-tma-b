import { validationResult } from 'express-validator';

export const validarCampos = ( req, res, next ) => {

    // Verificamos si hay errores de las comprobaciones de los middlewares
    const errors = validationResult(req);

    if ( !errors.isEmpty() ) {
        return res.status(400).json(errors);
    }

    next();

}
