const Rol = require("../models/roles");

const getStatus = (req, res) => {
    Rol.find()
        .then((response) => res.status(200).json({ msg: "Connection OK" }))
        .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
}

// Devuelve todos los Roles
const getAll = async (req, res) => {

    let roles = [];

    try {
        roles = await Rol.find({})
    } catch (error) {
        console.log(error);
        res.status(500);
        res.json({ msg: `Error: ${error}` });
    }

    // solo devolv./models si no se entro al catch
    res.json(roles);
};

//GET by ID
const getRolById = (req, res) => {
    const { RolId } = req.params;
    Rol.find({ id: RolId })
        .then((data) => res.json({ data }))
        .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
}

//POST

const create = async (req, res) => {

    const { id, usuario, rol } = req.body;

    const roles = new Rol({
        id,
        usuario,
        rol
    });
    let rolUsuario;
    try {
        rolUsuario = await roles.save();
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Post: ${err}` });
    }

    res.json(rolUsuario);

};

// UPDATE de Rol
const actualizarRol = async (req, res) => {
    const id = req.params.id;
    const { usuario, rol } = req.body;
    console.log(id);

    let rolAct;
    try {
        rolAct = await Rol.updateOne(
            { "id": id },
            {
                $set: {
                    usuario: usuario,
                    rol: rol
                }
            }
        );
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Update: ${err}` });
    }

    res.json(rolAct);
};

// DELETE de Rol
const eliminarRol = async (req, res) => {
    const id = req.params.id;
    let response;
    try {
        response = await Rol.deleteOne({ id });
        console.log(response);
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Delete: ${err}` });
    }
    if (response.deletedCount === 0) {
        return res.json({ msg: `No se encontro rol con id: ${id}` });
    }

    return res.json({ msg: `El rol fue borrado ${id}` });
}


module.exports = {
    getStatus,
    getAll,
    getRolById,
    create,
    actualizarRol,
    eliminarRol,
};