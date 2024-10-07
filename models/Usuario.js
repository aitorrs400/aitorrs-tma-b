import { Schema, model } from 'mongoose';


const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    contrasena: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    img: {
        type: String,
    },
    estado: {
        type: Boolean,
        default: true
    }
});

UsuarioSchema.methods.toJSON = function() {

    const { __v, _id, contrasena, ...usuario } = this.toObject();
    return { id: _id, ...usuario };

}

export default model('Usuario', UsuarioSchema);
