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

    // Convertir ObjectId a cadena en cada log
    const logsStringIds = logs.map((log) => ({
        ...log.toObject(),
        _id: log._id.toString(),
    }));

    // solo devolvemos los logs si no se entro al catch
    res.json(logsStringIds);
};

//GET by ID
const getLogById = async (req, res) => {
    const { LogId } = req.params;
    try {
        const log = await Log.findById(LogId);
        if (!log) {
            return res.status(404).json({ msg: 'Log no encontrado' });
        }

        // Convertir ObjectId a cadena
        const logStringId = { ...log.toObject(), _id: log._id.toString() };
        res.json({ data: logStringId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: `Error: ${err}` });
    }
}

//POST

const create = async (req, res) => {

    const { accion, usuario, fecha, hora } = req.body;

    const log = new Log({
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
            { "_id": id },
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
        response = await Log.deleteOne({ "_id": id });
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

// Controlador para manejar la creación de un nuevo log
const crearLog = async (req, res) => {

    const payload = req.body;
    console.log("🚀 ~ file: logs.js:114 ~ crearLog ~ payload:", payload)

    try {
        const nuevoLog = new Log(payload);
        const resultado = await nuevoLog.save();
        const { accion, usuario } = resultado;
        res.json({ accion, usuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al guardar el log' });
    }
};


module.exports = {
    crearLog,
    getStatus,
    getAll,
    getLogById,
    create,
    actualizarLog,
    eliminarLog,
};
