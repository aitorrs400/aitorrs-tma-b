const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { cargarArchivo, actualizarImagen, mostrarImagen } = require('../controllers');
const { coleccionesPermitidas } = require('../helpers');
const { validarArchivo } = require('../middlewares');
const { route } = require('./auth');

// Preparamos el enrutador
const router = Router();

// Ruta principal: /api/uploads

router.post('/', [
    validarArchivo
], cargarArchivo );

router.put('/:coleccion/:id', [
    validarArchivo,
    check('id', 'El ID debe ser un identificador válido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'] ) ),
    validarCampos
], actualizarImagen );

router.get('/:coleccion/:id', [
    check('id', 'El ID debe ser un identificador válido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'] ) ),
    validarCampos
], mostrarImagen );


module.exports = router;