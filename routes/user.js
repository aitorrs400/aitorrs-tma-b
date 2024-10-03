const { Router } = require('express');
const { check } = require('express-validator');
const { userGet, userPut, userPost, userDelete } = require('../controllers/user');
const { esRolValido, existeEmail, existeUsuarioPorId } = require('../helpers/dbValidators');
const { validarCampos, validarJWT, esAdminRole, tieneRole } = require('../middlewares');

// Preparamos el enrutador
const router = Router();

// Ruta principal: /api/usuarios

router.get( '/', userGet );

// Ruta para crear un nuevo usuario, con sus respectivos middlewares
router.post( '/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').not().isEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom( existeEmail ),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('password', 'La contraseña debe tener un mínimo de 6 caracteres').isLength({ min: 6 }),
    check('role').custom( esRolValido ),
    validarCampos
], userPost );

// Ruta para actualizar un usuario, con sus respectivos middlewares
router.put( '/:id', [
    check('id', 'El ID recibido no es correcto').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('role').custom( esRolValido ),
    validarCampos
], userPut );

router.delete('/:id', [
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE','USER_ROLE'),
    check('id', 'El ID recibido no es correcto').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], userDelete );

module.exports = router;