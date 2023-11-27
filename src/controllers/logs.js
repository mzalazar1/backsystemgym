const Log = require("../models/logs");

const getStatus = (req, res) => {
    Log.find()
        .then((response) => res.status(200).json({ msg: "Connection OK" }))
        .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
}

// Devuelve todos los logs
const getAll = async (req, res) => {

    let logs = [];

    try {
        logs = await Log.find({})
    } catch (error) {
        console.log(error);
        res.status(500);
        res.json({ msg: `Error: ${error}` });
    }

    // solo devolv./models si no se entro al catch
    res.json(logs);
};

//GET by ID
const getLogById = (req, res) => {
    const { LogId } = req.params;
    Log.find({ id: LogId })
        .then((data) => res.json({ data }))
        .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
}

//POST

const create = async (req, res) => {

    const { id, accion, usuario, fecha, hora } = req.body;

    const log = new Log({
        id,
        accion,
        usuario,
        fecha,
        hora
    });
    let logSocio;
    try {
        logSocio = await log.save();
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Post: ${err}` });
    }

    res.json(logSocio);

};

// UPDATE de Log
const actualizarLog = async (req, res) => {
    const id = req.params.id;
    const { accion, usuario, fecha, hora } = req.body;
    console.log(id);

    let logAct;
    try {
        logAct = await Log.updateOne(
            { "id": id },
            {
                $set: {
                    accion: accion,
                    usuario: usuario,
                    fecha: fecha,
                    hora: hora
                }
            }
        );
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Update: ${err}` });
    }

    res.json(logAct);
};

// DELETE de Log
const eliminarLog = async (req, res) => {
    const id = req.params.id;
    let response;
    try {
        response = await Log.deleteOne({ id });
        console.log(response);
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Delete: ${err}` });
    }
    if (response.deletedCount === 0) {
        return res.json({ msg: `No se encontro log con id: ${id}` });
    }

    return res.json({ msg: `El log fue borrado ${id}` });
}


module.exports = {
    getStatus,
    getAll,
    getLogById,
    create,
    actualizarLog,
    eliminarLog,
};