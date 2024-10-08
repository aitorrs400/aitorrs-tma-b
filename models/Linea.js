import mongoose, { model, Schema } from 'mongoose';



const LineaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la línea es obligatorio']
    },
    label: {
        type: String,
        required: [true, 'El label de la línea es obligatorio']
    },
    color: {
        type: String,
        required: [true, 'El código de color de la línea es obligatorio']
    },
    servicio: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'El identificador del servicio es obligatorio']
    }
});

LineaSchema.methods.toJSON = function() {

    const { __v, _id, ...linea } = this.toObject();
    return { id: _id, ...linea };

}

export default model('Linea', LineaSchema);
