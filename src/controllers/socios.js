const Socio = require("../models/socios");


// Devuelve todos los socios
const getAll = async (req, res) => {

    let socios = [];

    try {
        socios = await Socio.find({})
    } catch (error) {
        console.log(error);
        res.status(500);
        res.json({ msg: `Error: ${error}` });
    }

    // solo devolvemos los socios si no se entro al catch
    res.json(socios);
};

//POST

const create = async (req, res) => {

    const { id, dni, name, lastname, tel, mail, fechaNac, isDeleted } = req.body;

    const socio = new Socio({
        id,
        dni,
        name,
        lastname,
        tel,
        mail,
        fechaNac,
        isDeleted,
    });
    let savedSocio;
    try {
        savedSocio = await socio.save();
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Post: ${err}` });
    }

    res.json(savedSocio);

};

// UPDATE de socios
const actualizarSoc = async (req, res) => {
    const id = req.params.id;
    const { dni, name, lastname, tel, mail, fechaNac, isDeleted } = req.body;
    console.log(id);

    let socioAct;
    try {
        socioAct = await Socio.updateOne(
            { "id": id },
            {
                $set: {
                    dni: dni,
                    name: name,
                    lastname: lastname,
                    tel: tel,
                    mail: mail,
                    fechaNac: fechaNac,
                    isDeleted: isDeleted,
                }
            }
        );
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Update: ${err}` });
    }

    res.json(socioAct);
};

// DELETE de socios
const eliminarSoc = async (req, res) => {
    const id = req.params.id;
    let response;
    try {
        response = await Socio.deleteOne({ id });
        console.log(response);
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Delete: ${err}` });
    }
    if (response.deletedCount === 0) {
        return res.json({ msg: `No se encontro socio con id: ${id}` });
    }

    return res.json({ msg: `El socio borrado ${id}` });
}


module.exports = {
    getAll,
    create,
    actualizarSoc,
    eliminarSoc,
};