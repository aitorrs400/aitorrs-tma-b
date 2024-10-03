const validarArchivo = require('./validarArchivo');
const validarCampos = require('./validarCampos');
const validarJWT = require('./validarJWT');
const validarRoles = require('./validarRoles');

module.exports = {
    ...validarArchivo,
    ...validarCampos,
    ...validarJWT,
    ...validarRoles
}