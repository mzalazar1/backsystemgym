const MetodoPago = require("../models/metodoPago");

const getStatus = (req, res) => {
    MetodoPago.find()
        .then((response) => res.status(200).json({ msg: "Connection OK" }))
        .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
}

// Devuelve todos los Roles
const getAll = async (req, res) => {

    let metodos = [];

    try {
        metodos = await MetodoPago.find({})
    } catch (error) {
        console.log(error);
        res.status(500);
        res.json({ msg: `Error: ${error}` });
    }

    // solo devolv./models si no se entro al catch
    res.json(metodos);
};

//GET by ID
const getMetById = (req, res) => {
    const { MetId } = req.params;
    MetodoPago.find({ id: MetId })
        .then((data) => res.json({ data }))
        .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
}

//POST

const create = async (req, res) => {

    const { id, tipo } = req.body;

    const metodos = new MetodoPago({
        id,
        tipo
    });
    let metodoPago;
    try {
        metodoPago = await metodos.save();
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Post: ${err}` });
    }

    res.json(metodoPago);

};

// UPDATE de MetodoPago
const actualizarMet = async (req, res) => {
    const id = req.params.id;
    const { tipo } = req.body;
    console.log(id);

    let metPag;
    try {
        metPag = await MetodoPago.updateOne(
            { "id": id },
            {
                $set: {
                    tipo: tipo,
                }
            }
        );
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Update: ${err}` });
    }

    res.json(metPag);
};

// DELETE de MetodoPago
const eliminarMet = async (req, res) => {
    const id = req.params.id;
    let response;
    try {
        response = await MetodoPago.deleteOne({ id });
        console.log(response);
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Delete: ${err}` });
    }
    if (response.deletedCount === 0) {
        return res.json({ msg: `No se encontro metodo con id: ${id}` });
    }

    return res.json({ msg: `El metodo fue borrado ${id}` });
}


module.exports = {
    getStatus,
    getAll,
    getMetById,
    create,
    actualizarMet,
    eliminarMet,
};