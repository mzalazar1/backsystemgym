const ValorCuota = require("../models/valoresCuotas");

const getStatus = (req, res) => {
    ValorCuota.find()
        .then((response) => res.status(200).json({ msg: "Connection OK" }))
        .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
}

// Devuelve todos los valoresCuotas
const getAll = async (req, res) => {

    let valoresCuotas = [];

    try {
        valoresCuotas = await ValorCuota.find({})
    } catch (error) {
        console.log(error);
        res.status(500);
        res.json({ msg: `Error: ${error}` });
    }

    // solo devolv./models si no se entro al catch
    res.json(valoresCuotas);
};

//GET by ID
const getValorCuotaById = (req, res) => {
    const { ValorCuotaId } = req.params;
    ValorCuota.find({ id: ValorCuotaId })
        .then((data) => res.json({ data }))
        .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
}

//POST

const create = async (req, res) => {

    const { id, mes, importe } = req.body;

    const valorCuota = new ValorCuota({
        id,
        mes,
        importe
    });
    let ValorCuotaSocio;
    try {
        ValorCuotaSocio = await valorCuota.save();
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Post: ${err}` });
    }

    res.json(ValorCuotaSocio);

};

// UPDATE de ValorCuota
const actualizarValorCuota = async (req, res) => {
    const id = req.params.id;
    const { mes, importe } = req.body;
    console.log(id);

    let valorCuotaAct;
    try {
        valorCuotaAct = await ValorCuota.updateOne(
            { "id": id },
            {
                $set: {
                    mes: mes,
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

    res.json(valorCuotaAct);
};

// DELETE de ValorCuota
const eliminarValorCuota = async (req, res) => {
    const id = req.params.id;
    let response;
    try {
        response = await ValorCuota.deleteOne({ id });
        console.log(response);
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Delete: ${err}` });
    }
    if (response.deletedCount === 0) {
        return res.json({ msg: `No se encontro Valorcuota con id: ${id}` });
    }

    return res.json({ msg: `El valor cuota fue borrado ${id}` });
}


module.exports = {
    getStatus,
    getAll,
    getValorCuotaById,
    create,
    actualizarValorCuota,
    eliminarValorCuota,
};