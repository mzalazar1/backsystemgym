const mongoose = require("mongoose");

const { Schema } = mongoose;

const RolesSchema = new Schema({

    rol: {
        type: String,
        required: true,
    }
}
    ,
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });

module.exports = mongoose.model("Rol", RolesSchema);