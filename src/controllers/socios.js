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

module.exports = {
    getAll,
    create,
};