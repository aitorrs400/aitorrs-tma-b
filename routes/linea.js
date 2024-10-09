import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validarCampos.js';
import { servicioDelete, servicioGet, servicioIDGet, servicioPost, servicioPut } from '../controllers/servicio.js';
import { validarJWT } from '../middlewares/validarJWT.js';
import { existeLineaPorId, existeServicioPorId } from '../helpers/dbValidators.js';
import { lineaDelete, lineaGet, lineaIDGet, lineaPost, lineaPut } from '../controllers/linea.js';


// Preparamos el enrutador
const router = Router();

// Ruta principal: /api/servicio

router.get('/', [validarJWT], lineaGet);

router.get('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeLineaPorId ),
    validarCampos
], lineaIDGet);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre de la línea es obligatorio').notEmpty(),
    check('label', 'El label de la línea es obligatorio').notEmpty(),
    check('colorFondo', 'El código de color de fondo de la línea es obligatorio').notEmpty(),
    check('colorTexto', 'El código de color de texto de la línea es obligatorio').notEmpty(),
    check('servicio', 'El ID de servicio no es un ID válido').isMongoId(),
    check('servicio').custom( existeServicioPorId ),
    validarCampos
], lineaPost );

router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeLineaPorId ),
    check('nombre', 'El nombre de la línea es obligatorio').notEmpty(),
    check('label', 'El label de la línea es obligatorio').notEmpty(),
    check('colorFondo', 'El código de color de fondo de la línea es obligatorio').notEmpty(),
    check('colorTexto', 'El código de color de texto de la línea es obligatorio').notEmpty(),
    check('servicio', 'El ID de servicio no es un ID válido').isMongoId(),
    check('servicio').custom( existeServicioPorId ),
    validarCampos
], lineaPut );

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeLineaPorId ),
    validarCampos
], lineaDelete );

export default router;
