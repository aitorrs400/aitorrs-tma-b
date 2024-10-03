const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT, esAdminRole, tieneRole } = require('../middlewares');
const {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
} = require('../controllers/productos');
const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/dbValidators');

// Preparamos el enrutador
const router = Router();

// Ruta principal: /api/productos

// Obtener todos los productos - publico
router.get('/', obtenerProductos);

//Obtener un producto por id - publico
router.get('/:id', [
    check('id', 'El ID recibido no es correcto').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], obtenerProducto);

// Crear un producto - privado - cualquiera
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'La categoría es obligatoria').not().isEmpty(),
    check('categoria', 'El ID de categoria no es correcto').isMongoId(),
    check('categoria').custom( existeCategoriaPorId ),
    validarCampos
], crearProducto);

// Editar un producto por id - privado - cualquiera
router.put('/:id', [
    validarJWT,
    check('id', 'El ID recibido no es correcto').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], actualizarProducto);

// Eliminar un producto por id - privado - admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'El ID recibido no es correcto').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], borrarProducto);

module.exports = router;