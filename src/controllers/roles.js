const Rol = require("../models/roles");

const getStatus = (req, res) => {
    Rol.find()
        .then((response) => res.status(200).json({ msg: "Connection OK" }))
        .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
}

// Devuelve todos los Roles
const getAll = async (req, res) => {
    try {
        const roles = await Rol.find({});
        res.json(roles);
    } catch (error) {
        console.log(error);
        res.status(500);
        res.json({ msg: `Error: ${error}` });
    }
};

//GET by ID
const getRolById = async (req, res) => {
    const { RolId } = req.params;
    try {
        const rol = await Rol.findById(RolId);
        if (!rol) {
            return res.status(404).json({ msg: 'Rol no encontrado' });
        }
        res.json({ data: rol });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: `Error: ${err.message}` });
    }
}

//POST
const create = async (req, res) => {
    const { rol } = req.body;

    const roles = new Rol({
        rol
    });

    try {
        const rolUsuario = await roles.save();
        res.json(rolUsuario);
    } catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Post: ${err}` });
    }
};

// UPDATE de Rol
const actualizarRol = async (req, res) => {
    const { id } = req.params;
    const { rol } = req.body;

    try {
        const rolAct = await Rol.findByIdAndUpdate(id, {
            rol
        }, { new: true });

        res.json(rolAct);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: `Error Update: ${err.message}` });
    }
};

// DELETE de Rol
const eliminarRol = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await Rol.findByIdAndDelete(id);

        if (!response) {
            return res.json({ msg: `No se encontró rol con id: ${id}` });
        }

        res.json({ msg: `El rol fue borrado ${id}` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: `Error Delete: ${err.message}` });
    }
}

module.exports = {
    getStatus,
    getAll,
    getRolById,
    create,
    actualizarRol,
    eliminarRol,
};
