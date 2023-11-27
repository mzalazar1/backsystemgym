const Usuario = require("../models/usuarios");

const getStatus = (req, res) => {
    Usuario.find()
        .then((response) => res.status(200).json({ msg: "Connection OK" }))
        .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
}

// Devuelve todos los Usuarios
const getAll = async (req, res) => {

    let usuarios = [];

    try {
        usuarios = await Usuario.find({})
    } catch (error) {
        console.log(error);
        res.status(500);
        res.json({ msg: `Error: ${error}` });
    }

    // solo devolvemos los usuarios si no se entro al catch
    res.json(usuarios);
};

//GET by ID
const getUsuarioById = (req, res) => {
    const { UsuarioId } = req.params;
    Usuario.find({ id: UsuarioId })
        .then((data) => res.json({ data }))
        .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
}

//POST

const create = async (req, res) => {

    const { id, dni, name, lastname, mail } = req.body;

    const usuario = new Usuario({
        id,
        dni,
        name,
        lastname,
        mail
    });
    let savedUsuario;
    try {
        savedUsuario = await usuario.save();
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Post: ${err}` });
    }

    res.json(savedUsuario);

};

// UPDATE de usuarios
const actualizarUsu = async (req, res) => {
    const id = req.params.id;
    const { dni, name, lastname, mail } = req.body;
    console.log(id);

    let usuarioAct;
    try {
        usuarioAct = await Usuario.updateOne(
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

    res.json(usuarioAct);
};

// DELETE de usuario
const eliminarUsu = async (req, res) => {
    const id = req.params.id;
    let response;
    try {
        response = await Usuario.deleteOne({ id });
        console.log(response);
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Delete: ${err}` });
    }
    if (response.deletedCount === 0) {
        return res.json({ msg: `No se encontro usuario con id: ${id}` });
    }

    return res.json({ msg: `El usuario borrado ${id}` });
}


module.exports = {
    getStatus,
    getAll,
    getUsuarioById,
    create,
    actualizarUsu,
    eliminarUsu,
};