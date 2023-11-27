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
        tiposCuotas = await TipoCuota.find({})
    } catch (error) {
        console.log(error);
        res.status(500);
        res.json({ msg: `Error: ${error}` });
    }

    // solo devolv./models si no se entro al catch
    res.json(tiposCuotas);
};

//GET by ID
const getTipoCuotaById = (req, res) => {
    const { TipoCuotaId } = req.params;
    TipoCuota.find({ id: TipoCuotaId })
        .then((data) => res.json({ data }))
        .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
}

//POST

const create = async (req, res) => {

    const { id, descripcion, importe } = req.body;

    const TiposCuota = new TipoCuota({
        id,
        descripcion,
        importe
    });
    let TipoCuotaSocio;
    try {
        TipoCuotaSocio = await TiposCuota.save();
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Post: ${err}` });
    }

    res.json(TipoCuotaSocio);

};

// UPDATE de TipoCuota
const actualizarTipoCuota = async (req, res) => {
    const id = req.params.id;
    const { descripcion, importe } = req.body;
    console.log(id);

    let TipoCuotaAct;
    try {
        TipoCuotaAct = await TipoCuota.updateOne(
            { "id": id },
            {
                $set: {
                    descripcion: descripcion,
                    importe: importe
                }
            }
        );
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Update: ${err}` });
    }

    res.json(TipoCuotaAct);
};

// DELETE de TipoCuota
const eliminarTipoCuota = async (req, res) => {
    const id = req.params.id;
    let response;
    try {
        response = await TipoCuota.deleteOne({ id });
        console.log(response);
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Delete: ${err}` });
    }
    if (response.deletedCount === 0) {
        return res.json({ msg: `No se encontro tipocuota con id: ${id}` });
    }

    return res.json({ msg: `El tipocuota fue borrado ${id}` });
}


module.exports = {
    getStatus,
    getAll,
    getTipoCuotaById,
    create,
    actualizarTipoCuota,
    eliminarTipoCuota,
};