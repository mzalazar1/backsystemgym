const mongoose = require("mongoose");

const { Schema } = mongoose;

const MetodosPagoSchema = new Schema({

    tipo: {
        type: String,
        required: true,
    }

}
    ,
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });

module.exports = mongoose.model("MetodoPago", MetodosPagoSchema);