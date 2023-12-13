const mongoose = require("mongoose");

const { Schema } = mongoose;

const LogsSchema = new Schema({

    accion: {
        type: String,
    },
    usuario: {
        type: String,
        required: true,
    }

}
    ,
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });

module.exports = mongoose.model("Log", LogsSchema);