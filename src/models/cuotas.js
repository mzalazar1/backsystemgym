const EstadoCuota = require('./estadosCuotas');
const calculateDateAccess = require("../utils/calculateDateAccess");

const mongoose = require("mongoose");

const { Schema } = mongoose;

const CuotasSchema = new Schema(
    {
        socio: {
            type: String,
            required: true,
        },
        actividad: {
            type: String,
            required: true,
        },
        tipo: {
            type: String,
            required: true,
        },
        valor: {
            type: Number,
            default: false,
        },
        descuento: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
        toObject: { getters: true }, //  esto setea los getters
    }
);

// Create a virtual field for days since creation
CuotasSchema.virtual("estadoCuota").get(function () {
    const createdAt = new Date(this.created_at);// Accessing the created_at field from the document

    // que tipo de cuota es? lo pasamos a minuscula
    const tipoDeCuota = this.tipo.toLocaleLowerCase();

    let resultAccess;

    // tipo de cuota (mensual, trimestral)
    switch (tipoDeCuota) {
        case "mensual":
            // aplicamos y devolvemos true o false si tiene acceso
            resultAccess = calculateDateAccess(createdAt, 31);
            break;

        case "trimestral":
            // aplicamos y devolvemos true o false si tiene acceso
            resultAccess = calculateDateAccess(createdAt, 90);
            break;

        case "semestral":
            // aplicamos y devolvemos true o false si tiene acceso
            resultAccess = calculateDateAccess(createdAt, 120);
            break;

        default:
            // aplicamos y devolvemo o true o false si tiene acceso
            resultAccess = calculateDateAccess(createdAt, 31);
            break;
    }

    // el acceso lo determinamos si es TRUE O FALSE y devolvemos un valor personalizado
    const resultadoFinal = resultAccess.acceso === true ? "VIGENTE" : "VENCIDA";

    return resultadoFinal
});

// Create a virtual field for days since creation
CuotasSchema.virtual("fechaVencimiento").get(function () {
    const createdAt = new Date(this.created_at);// Accessing the created_at field from the document

    // que tipo de cuota es? lo pasamos a minuscula
    const tipoDeCuota = this.tipo.toLocaleLowerCase();

    let resultAccess;

    // tipo de cuota (mensual, trimestral)
    switch (tipoDeCuota) {
        case "mensual":
            // aplicamos y devolvemos true o false si tiene acceso
            resultAccess = calculateDateAccess(createdAt, 31);
            break;

        case "trimestral":
            // aplicamos y devolvemos true o false si tiene acceso
            resultAccess = calculateDateAccess(createdAt, 90);
            break;

        case "semestral":
            // aplicamos y devolvemos true o false si tiene acceso
            resultAccess = calculateDateAccess(createdAt, 120);
            break;

        default:
            // aplicamos y devolvemo o true o false si tiene acceso
            resultAccess = calculateDateAccess(createdAt, 31);
            break;
    }

    // el acceso lo determinamos si es TRUE O FALSE y devolvemos un valor personalizado

    return resultAccess.dueDate.toISOString().split('T')[0];

});

module.exports = mongoose.model("Cuota", CuotasSchema);
