import { Schema, model } from 'mongoose';


const ServicioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del servicio es obligatorio']
    },
    imagen: {
        type: String,
        required: [true, 'La imagen del servicio es obligatoria (iagen en base64)']
    }
});

ServicioSchema.methods.toJSON = function() {

    const { __v, _id, ...servicio } = this.toObject();
    return { id: _id, ...servicio };

}

export default model('Servicio', ServicioSchema);
