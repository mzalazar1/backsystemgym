const mongoose = require("mongoose");

const { Schema } = mongoose;

const ValoresCuotasSchema = new Schema({
    mes: {
        type: String,
        required: true,
    },
    importe: {
        type: Number,
        required: true,
    },
    tipo: {
        type: String,
        required: true,
    }


}
    ,
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });

module.exports = mongoose.model("ValorCuota", ValoresCuotasSchema);
