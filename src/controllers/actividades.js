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

    // solo devolvemos los actividades si no se entro al catch
    res.json(actividades);
};

//GET by ID
const getActividadById = (req, res) => {
    const { ActividadId } = req.params;
    Actividad.find({ id: ActividadId })
        .then((data) => res.json({ data }))
        .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
}

//POST

const create = async (req, res) => {

    const { id, nombre, horarios, profesor } = req.body;

    const actividad = new Actividad({
        id,
        nombre,
        horarios,
        profesor
    });
    let ActividadSocio;
    try {
        ActividadSocio = await actividad.save();
    }
    catch (err) {
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
            { "id": id },
            {
                $set: {
                    nombre: nombre,
                    horarios: horarios,
                    profesor: profesor
                }
            }
        );
    }
    catch (err) {
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
        response = await Actividad.deleteOne({ id });
        console.log(response);
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Delete: ${err}` });
    }
    if (response.deletedCount === 0) {
        return res.json({ msg: `No se encontro actividad con id: ${id}` });
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