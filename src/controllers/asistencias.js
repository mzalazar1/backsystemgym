const Asistencia = require("../models/asistencias");

const getStatus = (req, res) => {
    Asistencia.find()
        .then((response) => res.status(200).json({ msg: "Connection OK" }))
        .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
}

// Devuelve todos los asistencias
const getAll = async (req, res) => {

    let asistencias = [];

    try {
        asistencias = await Asistencia.find({})
    } catch (error) {
        console.log(error);
        res.status(500);
        res.json({ msg: `Error: ${error}` });
    }

    // Convertir ObjectId a cadena en cada asistencia
    const asistenciasStringIds = asistencias.map((asistencia) => ({
        ...asistencia.toObject(),
        _id: asistencia._id.toString()
    }));

    // solo devolvemos los asistencias si no se entró al catch
    res.json(asistenciasStringIds);
};

//GET by ID
const getAsistenciaById = async (req, res) => {
    const { AsistenciaId } = req.params;
    try {
        const asistencia = await Asistencia.findById(AsistenciaId);
        if (!asistencia) {
            return res.status(404).json({ msg: 'Asistencia no encontrada' });
        }

        // Convertir ObjectId a cadena
        const asistenciaStringId = { ...asistencia.toObject(), _id: asistencia._id.toString() };
        res.json({ data: asistenciaStringId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: `Error: ${err}` });
    }
}

//POST
const create = async (req, res) => {
    const { dni, nombre, apellido, estadoCuota, fecha } = req.body;

    const asistencia = new Asistencia({
        dni,
        nombre,
        apellido,
        estadoCuota,
        fecha
    });

    let AsistenciaSocio;
    try {
        AsistenciaSocio = await asistencia.save();
    } catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Post: ${err}` });
    }

    res.json(AsistenciaSocio);
};

// UPDATE de Asistencia
const actualizarAsistencia = async (req, res) => {
    const id = req.params.id;
    const { dni, nombre, apellido, estadoCuota, fecha } = req.body;
    console.log(id);

    let AsistenciaAct;
    try {
        AsistenciaAct = await Asistencia.updateOne(
            { "_id": id },
            {
                $set: {
                    dni: dni,
                    nombre: nombre,
                    apellido: apellido,
                    estadoCuota: estadoCuota,
                    fecha: fecha
                }
            }
        );
    } catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Update: ${err}` });
    }

    res.json(AsistenciaAct);
};

// DELETE de Asistencia
const eliminarAsistencia = async (req, res) => {
    const id = req.params.id;
    let response;
    try {
        response = await Asistencia.deleteOne({ "_id": id });
        console.log(response);
    } catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Delete: ${err}` });
    }
    if (response.deletedCount === 0) {
        return res.json({ msg: `No se encontró asistencia con id: ${id}` });
    }

    return res.json({ msg: `La asistencia fue borrada ${id}` });
}

module.exports = {
    getStatus,
    getAll,
    getAsistenciaById,
    create,
    actualizarAsistencia,
    eliminarAsistencia,
};
