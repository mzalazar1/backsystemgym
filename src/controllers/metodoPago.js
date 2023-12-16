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

    // Convertir ObjectId a cadena en cada método
    const metodosStringIds = metodos.map((metodo) => ({
        ...metodo.toObject(),
        _id: metodo._id.toString(),
    }));

    // solo devolvemos los metodos si no se entro al catch
    res.json(metodosStringIds);
};

//GET by ID
const getMetById = async (req, res) => {
    const { MetId } = req.params;
    try {
        const metodo = await MetodoPago.findById(MetId);
        if (!metodo) {
            return res.status(404).json({ msg: 'Método no encontrado' });
        }

        // Convertir ObjectId a cadena
        const metodoStringId = { ...metodo.toObject(), _id: metodo._id.toString() };
        res.json({ data: metodoStringId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: `Error: ${err}` });
    }
}

//POST

const create = async (req, res) => {

    const { tipo } = req.body;

    const metodoPago = new MetodoPago({
        tipo
    });
    let metodoPagoSaved;
    try {
        metodoPagoSaved = await metodoPago.save();
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Post: ${err}` });
    }

    res.json(metodoPagoSaved);

};

// UPDATE de MetodoPago
const actualizarMet = async (req, res) => {
    const id = req.params.id;
    const { tipo } = req.body;
    console.log(id);

    let metPag;
    try {
        metPag = await MetodoPago.updateOne(
            { "_id": id },
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
        response = await MetodoPago.deleteOne({ "_id": id });
        console.log(response);
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Delete: ${err}` });
    }
    if (response.deletedCount === 0) {
        return res.json({ msg: `No se encontro método con id: ${id}` });
    }

    return res.json({ msg: `El método fue borrado ${id}` });
}


module.exports = {
    getStatus,
    getAll,
    getMetById,
    create,
    actualizarMet,
    eliminarMet,
};
