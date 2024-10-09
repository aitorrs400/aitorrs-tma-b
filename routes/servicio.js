import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validarCampos.js';
import { servicioDelete, servicioGet, servicioIDGet, servicioPost, servicioPut } from '../controllers/servicio.js';
import { validarJWT } from '../middlewares/validarJWT.js';
import { existeServicioPorId } from '../helpers/dbValidators.js';


// Preparamos el enrutador
const router = Router();

// Ruta principal: /api/servicio

router.get('/', [validarJWT], servicioGet);

router.get('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeServicioPorId ),
    validarCampos
], servicioIDGet);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre del servicio es obligatorio').notEmpty(),
    check('imagen', 'La imagen del servicio es obligatoria').notEmpty(),
    validarCampos
], servicioPost );

router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeServicioPorId ),
    check('nombre', 'El nombre del servicio es obligatorio').notEmpty(),
    check('imagen', 'La imagen del servicio es obligatoria').notEmpty(),
    validarCampos
], servicioPut );

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeServicioPorId ),
    validarCampos
], servicioDelete );

export default router;
