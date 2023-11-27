const EstadoCuota = require("../models/estadosCuotas");

const getStatus = (req, res) => {
    EstadoCuota.find()
        .then((response) => res.status(200).json({ msg: "Connection OK" }))
        .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
}

// Devuelve todos los estadosCuotas
const getAll = async (req, res) => {

    let estadosCuotas = [];

    try {
        estadosCuotas = await EstadoCuota.find({})
    } catch (error) {
        console.log(error);
        res.status(500);
        res.json({ msg: `Error: ${error}` });
    }

    // solo devolvemos los estadosCuotas si no se entro al catch
    res.json(estadosCuotas);
};

//GET by ID
const getEstadoCuotaById = (req, res) => {
    const { EstadoCuotaId } = req.params;
    EstadoCuota.find({ id: EstadoCuotaId })
        .then((data) => res.json({ data }))
        .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
}

//POST

const create = async (req, res) => {

    const { id, estadoActual } = req.body;

    const estadoCuota = new EstadoCuota({
        id,
        estadoActual
    });
    let EstadoCuotaSocio;
    try {
        EstadoCuotaSocio = await estadoCuota.save();
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Post: ${err}` });
    }

    res.json(EstadoCuotaSocio);

};

// UPDATE de EstadoCuota
const actualizarEstadoCuota = async (req, res) => {
    const id = req.params.id;
    const { estadoActual } = req.body;
    console.log(id);

    let estadoCuotaAct;
    try {
        estadoCuotaAct = await EstadoCuota.updateOne(
            { "id": id },
            {
                $set: {
                    estadoActual: estadoActual
                }
            }
        );
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Update: ${err}` });
    }

    res.json(estadoCuotaAct);
};

// DELETE de EstadoCuota
const eliminarEstadoCuota = async (req, res) => {
    const id = req.params.id;
    let response;
    try {
        response = await EstadoCuota.deleteOne({ id });
        console.log(response);
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Delete: ${err}` });
    }
    if (response.deletedCount === 0) {
        return res.json({ msg: `No se encontro estadoCuota con id: ${id}` });
    }

    return res.json({ msg: `El estadoCuota borrado ${id}` });
}


module.exports = {
    getStatus,
    getAll,
    getEstadoCuotaById,
    create,
    actualizarEstadoCuota,
    eliminarEstadoCuota,
};