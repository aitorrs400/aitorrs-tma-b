const { Schema, model } = require('mongoose');

const ProductoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    precio: {
        type: Number,
        default: 0
    },
    descripcion: {
        type: String
    },
    disponible: {
        type: Boolean,
        default: true
    },
    img: {
        type: String
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

ProductoSchema.methods.toJSON = function() {

    const { __v, _id, estado, ...producto } = this.toObject();
    producto.id = _id;
    return producto;

}

module.exports = model('Producto', ProductoSchema);