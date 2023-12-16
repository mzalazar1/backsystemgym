const Profesor = require("../models/profesores");

const getStatus = (req, res) => {
    Profesor.find()
        .then((response) => res.status(200).json({ msg: "Connection OK" }))
        .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
}

// Devuelve todos los Profesores
const getAll = async (req, res) => {

    let profesores = [];

    try {
        profesores = await Profesor.find({})
    } catch (error) {
        console.log(error);
        res.status(500);
        res.json({ msg: `Error: ${error}` });
    }

    // Convertir ObjectId a cadena en cada profesor
    const profesoresStringIds = profesores.map((profesor) => ({
        ...profesor.toObject(),
        _id: profesor._id.toString(),
    }));

    // solo devolvemos los profesores si no se entro al catch
    res.json(profesoresStringIds);
};

//GET by ID
const getProfesorById = async (req, res) => {
    const { ProfesorId } = req.params;
    try {
        const profesor = await Profesor.findById(ProfesorId);
        if (!profesor) {
            return res.status(404).json({ msg: 'Profesor no encontrado' });
        }

        // Convertir ObjectId a cadena
        const profesorStringId = { ...profesor.toObject(), _id: profesor._id.toString() };
        res.json({ data: profesorStringId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: `Error: ${err}` });
    }
}

//POST

const create = async (req, res) => {

    const { dni, name, lastname, tel, mail, fechaNac } = req.body;

    const profesor = new Profesor({
        dni,
        name,
        lastname,
        tel,
        mail,
        fechaNac
    });
    let savedProfesor;
    try {
        savedProfesor = await profesor.save();
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Post: ${err}` });
    }

    res.json(savedProfesor);

};

// UPDATE de Profesores
const actualizarProf = async (req, res) => {
    const id = req.params.id;
    const { dni, name, lastname, tel, mail, fechaNac } = req.body;
    console.log(id);

    let profesorAct;
    try {
        profesorAct = await Profesor.updateOne(
            { "_id": id },
            {
                $set: {
                    dni: dni,
                    name: name,
                    lastname: lastname,
                    tel: tel,
                    mail: mail,
                    fechaNac: fechaNac
                }
            }
        );
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Update: ${err}` });
    }

    res.json(profesorAct);
};

// DELETE de profesor
const eliminarProf = async (req, res) => {
    const id = req.params.id;
    let response;
    try {
        response = await Profesor.deleteOne({ "_id": id });
        console.log(response);
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Delete: ${err}` });
    }
    if (response.deletedCount === 0) {
        return res.json({ msg: `No se encontro profesor con id: ${id}` });
    }

    return res.json({ msg: `El profesor fue borrado ${id}` });
}

module.exports = {
    getStatus,
    getAll,
    getProfesorById,
    create,
    actualizarProf,
    eliminarProf,
};
