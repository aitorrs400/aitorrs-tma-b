import { Router } from 'express';
import { check } from 'express-validator';
import { login } from '../controllers/auth.js';
import { validarCampos } from '../middlewares/validarCampos.js';
import { servicioPost } from '../controllers/servicio.js';

// Preparamos el enrutador
const router = Router();

// Ruta principal: /api/auth

router.post('/', [
    check('nombre', 'El nombre del servicio es obligatorio').notEmpty(),
    check('imagen', 'La imagen del servicio es obligatoria').notEmpty(),
    validarCampos
], servicioPost );

export default router;
