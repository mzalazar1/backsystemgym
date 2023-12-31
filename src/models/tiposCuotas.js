const mongoose = require("mongoose");

const { Schema } = mongoose;

const TiposCuotasSchema = new Schema({

    tipo: {
        type: String,
        required: true,
    }
}
    ,
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });

module.exports = mongoose.model("TipoCuota", TiposCuotasSchema);