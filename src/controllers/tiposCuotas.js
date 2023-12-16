const TipoCuota = require("../models/tiposCuotas");

const getStatus = (req, res) => {
    TipoCuota.find()
        .then((response) => res.status(200).json({ msg: "Connection OK" }))
        .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
}

// Devuelve todos los tiposCuotas
const getAll = async (req, res) => {
    let tiposCuotas = [];

    try {
        tiposCuotas = await TipoCuota.find({});
    } catch (error) {
        console.log(error);
        res.status(500);
        res.json({ msg: `Error: ${error}` });
    }

    // Convertir ObjectId a cadena en cada tipo de cuota
    const tiposCuotasStringIds = tiposCuotas.map((tipoCuota) => ({
        ...tipoCuota.toObject(),
        _id: tipoCuota._id.toString(),
    }));

    // solo devolvemos los tipos de cuotas si no se entró al catch
    res.json(tiposCuotasStringIds);
};

//GET by ID
const getTipoCuotaById = async (req, res) => {
    const { TipoCuotaId } = req.params;
    try {
        const tipoCuota = await TipoCuota.findById(TipoCuotaId);
        if (!tipoCuota) {
            return res.status(404).json({ msg: 'Tipo de cuota no encontrado' });
        }

        // Convertir ObjectId a cadena
        const tipoCuotaStringId = { ...tipoCuota.toObject(), _id: tipoCuota._id.toString() };
        res.json({ data: tipoCuotaStringId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: `Error: ${err}` });
    }
}

//POST
const create = async (req, res) => {
    const { id, tipo, importe } = req.body;

    const tipoCuota = new TipoCuota({
        id,
        tipo,
        importe,
    });
    let savedTipoCuota;
    try {
        savedTipoCuota = await tipoCuota.save();
    } catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Post: ${err}` });
    }

    res.json(savedTipoCuota);
};

// UPDATE de TipoCuota
const actualizarTipoCuota = async (req, res) => {
    const id = req.params.id;
    const { tipo, importe } = req.body;
    console.log(id);

    let tipoCuotaAct;
    try {
        tipoCuotaAct = await TipoCuota.updateOne(
            { "_id": id },
            {
                $set: {
                    tipo: tipo,
                    importe: importe,
                },
            }
        );
    } catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Update: ${err}` });
    }

    res.json(tipoCuotaAct);
};

// DELETE de TipoCuota
const eliminarTipoCuota = async (req, res) => {
    const id = req.params.id;
    let response;
    try {
        response = await TipoCuota.deleteOne({ "_id": id });
        console.log(response);
    } catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Delete: ${err}` });
    }
    if (response.deletedCount === 0) {
        return res.json({ msg: `No se encontró tipo de cuota con id: ${id}` });
    }

    return res.json({ msg: `El tipo de cuota fue borrado ${id}` });
}

module.exports = {
    getStatus,
    getAll,
    getTipoCuotaById,
    create,
    actualizarTipoCuota,
    eliminarTipoCuota,
};
