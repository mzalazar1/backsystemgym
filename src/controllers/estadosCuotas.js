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

    // Convertir ObjectId a cadena en cada estadoCuota
    const estadosCuotasStringIds = estadosCuotas.map((estadoCuota) => ({
        ...estadoCuota.toObject(),
        _id: estadoCuota._id.toString(),
    }));

    // solo devolvemos los estadosCuotas si no se entro al catch
    res.json(estadosCuotasStringIds);
};

//GET by ID
const getEstadoCuotaById = async (req, res) => {
    const { EstadoCuotaId } = req.params;
    try {
        const estadoCuota = await EstadoCuota.findById(EstadoCuotaId);
        if (!estadoCuota) {
            return res.status(404).json({ msg: 'EstadoCuota no encontrado' });
        }

        // Convertir ObjectId a cadena
        const estadoCuotaStringId = { ...estadoCuota.toObject(), _id: estadoCuota._id.toString() };
        res.json({ data: estadoCuotaStringId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: `Error: ${err}` });
    }
}

//POST

const create = async (req, res) => {

    const payload = req.body;

    const estadoCuota = new EstadoCuota({ ...payload });
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
    const payload = req.body;
    console.log(id);

    let estadoCuotaAct;
    try {
        estadoCuotaAct = await EstadoCuota.updateOne(
            { "_id": id },
            {
                $set: { ...payload }
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
        response = await EstadoCuota.deleteOne({ "_id": id });
        console.log(response);
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Delete: ${err}` });
    }
    if (response.deletedCount === 0) {
        return res.json({ msg: `No se encontro EstadoCuota con id: ${id}` });
    }

    return res.json({ msg: `El estado cuota fue borrado ${id}` });
}


module.exports = {
    getStatus,
    getAll,
    getEstadoCuotaById,
    create,
    actualizarEstadoCuota,
    eliminarEstadoCuota,
};
