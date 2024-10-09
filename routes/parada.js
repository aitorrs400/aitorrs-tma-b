import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validarCampos.js';
import { validarJWT } from '../middlewares/validarJWT.js';
import { existeLineaPorId, existeParadaPorId } from '../helpers/dbValidators.js';
import { paradaDelete, paradaGet, paradaIDGet, paradaPost, paradaPut } from '../controllers/parada.js';


// Preparamos el enrutador
const router = Router();

// Ruta principal: /api/parada

router.get('/', [validarJWT], paradaGet);

router.get('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeParadaPorId ),
    validarCampos
], paradaIDGet );

router.post('/', [
    validarJWT,
    check('codigo', 'El código de la parada es obligatorio').notEmpty(),
    check('nombre', 'El nombre de la parada es obligatorio').notEmpty(),
    check('linea', 'El ID de línea no es un ID válido').isMongoId(),
    check('linea').custom( existeLineaPorId ),
    validarCampos
], paradaPost );

router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeParadaPorId ),
    check('codigo', 'El código de la parada es obligatorio').notEmpty(),
    check('nombre', 'El nombre de la parada es obligatorio').notEmpty(),
    check('linea', 'El ID de línea no es un ID válido').isMongoId(),
    check('linea').custom( existeLineaPorId ),
    validarCampos
], paradaPut );

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeParadaPorId ),
    validarCampos
], paradaDelete );

export default router;
