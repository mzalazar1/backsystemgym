const Actividad = require("../models/actividades");

const getStatus = (req, res) => {
    Actividad.find()
        .then((response) => res.status(200).json({ msg: "Connection OK" }))
        .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
}

// Devuelve todos los actividades
const getAll = async (req, res) => {

    let actividades = [];

    try {
        actividades = await Actividad.find({})
    } catch (error) {
        console.log(error);
        res.status(500);
        res.json({ msg: `Error: ${error}` });
    }

    // Convertir ObjectId a cadena en cada actividad
    const actividadesStringIds = actividades.map((actividad) => ({
        ...actividad.toObject(),
        _id: actividad._id.toString()
    }));

    // solo devolvemos los actividades si no se entró al catch
    res.json(actividadesStringIds);
};

//GET by ID
const getActividadById = async (req, res) => {
    const { ActividadId } = req.params;
    try {
        const actividad = await Actividad.findById(ActividadId);
        if (!actividad) {
            return res.status(404).json({ msg: 'Actividad no encontrada' });
        }

        // Convertir ObjectId a cadena
        const actividadStringId = { ...actividad.toObject(), _id: actividad._id.toString() };
        res.json({ data: actividadStringId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: `Error: ${err}` });
    }
}

//POST
const create = async (req, res) => {
    const { nombre, horarios, profesor } = req.body;

    const actividad = new Actividad({
        nombre,
        horarios,
        profesor
    });

    let ActividadSocio;
    try {
        ActividadSocio = await actividad.save();
    } catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Post: ${err}` });
    }

    res.json(ActividadSocio);
};

// UPDATE de Actividad
const actualizarActividad = async (req, res) => {
    const id = req.params.id;
    const { nombre, horarios, profesor } = req.body;
    console.log(id);

    let ActividadAct;
    try {
        ActividadAct = await Actividad.updateOne(
            { "_id": id },
            {
                $set: {
                    nombre: nombre,
                    horarios: horarios,
                    profesor: profesor
                }
            }
        );
    } catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Update: ${err}` });
    }

    res.json(ActividadAct);
};

// DELETE de Actividad
const eliminarActividad = async (req, res) => {
    const id = req.params.id;
    let response;
    try {
        response = await Actividad.deleteOne({ "_id": id });
        console.log(response);
    } catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Delete: ${err}` });
    }
    if (response.deletedCount === 0) {
        return res.json({ msg: `No se encontró actividad con id: ${id}` });
    }

    return res.json({ msg: `La actividad fue borrada ${id}` });
}

module.exports = {
    getStatus,
    getAll,
    getActividadById,
    create,
    actualizarActividad,
    eliminarActividad,
};
