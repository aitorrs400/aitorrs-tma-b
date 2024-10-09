import mongoose, { model, Schema } from 'mongoose';

const ParadaSchema = new Schema({
    codigo: {
        type: String,
        required: [true, 'El código de la parada es obligatorio']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre de la parada es obligatorio']
    },
    lineas: [{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'El identificador de la linea es obligatorio']
    }],
    linea: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'El identificador de la línea es obligatorio']
    }
});

ParadaSchema.methods.toJSON = function() {

    const { __v, _id, ...linea } = this.toObject();
    return { id: _id, ...linea };

}

export default model('Parada', ParadaSchema);