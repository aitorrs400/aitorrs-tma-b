const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT, esAdminRole, tieneRole } = require('../middlewares');
const {
    obtenerCategorías,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
} = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/dbValidators');

// Preparamos el enrutador
const router = Router();

// Ruta principal: /api/categorias

// Obtener todas las categorías - publico
router.get('/', obtenerCategorías);

// Obtener una categoría por id - publico
router.get('/:id', [
    check('id', 'El ID recibido no es correcto').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], obtenerCategoria);

// Crear una categoría - privado - cualquiera
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

// Editar una categoría por id - privado - cualquiera
router.put('/:id', [
    validarJWT,
    check('id', 'El ID recibido no es correcto').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], actualizarCategoria);

// Eliminar una categoría por id - privado - admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'El ID recibido no es correcto').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], borrarCategoria);

module.exports = router;