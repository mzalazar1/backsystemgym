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