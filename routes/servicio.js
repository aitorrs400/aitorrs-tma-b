import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validarCampos.js';
import { servicioGet, servicioIDGet, servicioPost } from '../controllers/servicio.js';
import { validarJWT } from '../middlewares/validarJWT.js';


// Preparamos el enrutador
const router = Router();

// Ruta principal: /api/servicio

router.get('/', [validarJWT], servicioGet);

router.get('/:id', [validarJWT], servicioIDGet);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre del servicio es obligatorio').notEmpty(),
    check('imagen', 'La imagen del servicio es obligatoria').notEmpty(),
    validarCampos
], servicioPost );

export default router;
