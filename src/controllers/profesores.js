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

    // solo devolvemos los profesor si no se entro al catch
    res.json(profesores);
};

//GET by ID
const getProfesorById = (req, res) => {
    const { ProdesorId } = req.params;
    Profesor.find({ id: ProdesorId })
        .then((data) => res.json({ data }))
        .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
}

//POST

const create = async (req, res) => {

    const { id, dni, name, lastname, tel, mail, fechaNac } = req.body;

    const profesor = new Profesor({
        id,
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
            { "id": id },
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
        response = await Profesor.deleteOne({ id });
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

    return res.json({ msg: `El profesor borrado ${id}` });
}


module.exports = {
    getStatus,
    getAll,
    getProfesorById,
    create,
    actualizarProf,
    eliminarProf,
};