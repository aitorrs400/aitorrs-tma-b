const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validarCampos');

// Preparamos el enrutador
const router = Router();

// Ruta principal: /api/auth

router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login );

router.post('/google', [
    check('id_token', 'El token de Google es obligatorio').not().isEmpty(),
    validarCampos
], googleSignIn );

module.exports = router;