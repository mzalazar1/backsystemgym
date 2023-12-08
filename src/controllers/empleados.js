const Empleado = require("../models/empleados");

const getStatus = (req, res) => {
    Empleados.find()
        .then((response) => res.status(200).json({ msg: "Connection OK" }))
        .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
}

// Devuelve todos los Empleadoss
const getAll = async (req, res) => {

    let empleados = [];

    try {
        empleados = await Empleado.find({})
    } catch (error) {
        console.log(error);
        res.status(500);
        res.json({ msg: `Error: ${error}` });
    }

    // solo devolvemos los empleado si no se entro al catch
    res.json(empleados);
};

//GET by ID
const getEmpleadoById = (req, res) => {
    const { EmpleadoId } = req.params;
    Empleado.find({ id: EmpleadoId })
        .then((data) => res.json({ data }))
        .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
}

//POST

const create = async (req, res) => {

    const { id, dni, name, lastname, mail } = req.body;

    const empleado = new Empleado({
        id,
        dni,
        name,
        lastname,
        mail
    });
    let savedEmpleado;
    try {
        savedEmpleado = await empleado.save();
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Post: ${err}` });
    }

    res.json(savedEmpleado);

};

// UPDATE de Empleados
const actualizarEmp = async (req, res) => {
    const id = req.params.id;
    const { dni, name, lastname, mail } = req.body;
    console.log(id);

    let empleadoAct;
    try {
        empleadoAct = await Empleado.updateOne(
            { "id": id },
            {
                $set: {
                    dni: dni,
                    name: name,
                    lastname: lastname,
                    mail: mail
                }
            }
        );
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Update: ${err}` });
    }

    res.json(empleadoAct);
};

// DELETE de empleado
const eliminarEmp = async (req, res) => {
    const id = req.params.id;
    let response;
    try {
        response = await Empleado.deleteOne({ id });
        console.log(response);
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Delete: ${err}` });
    }
    if (response.deletedCount === 0) {
        return res.json({ msg: `No se encontro empleado con id: ${id}` });
    }

    return res.json({ msg: `El empleado borrado ${id}` });
}


module.exports = {
    getStatus,
    getAll,
    getEmpleadoById,
    create,
    actualizarEmp,
    eliminarEmp,
};