const Descuento = require("../models/descuentos");

const getStatus = (req, res) => {
    Descuento.find()
        .then((response) => res.status(200).json({ msg: "Connection OK" }))
        .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
}

// Devuelve todos los descuentos
const getAll = async (req, res) => {

    let descuentos = [];

    try {
        descuentos = await Descuento.find({})
    } catch (error) {
        console.log(error);
        res.status(500);
        res.json({ msg: `Error: ${error}` });
    }

    // Convertir ObjectId a cadena en cada descuento
    const descuentosStringIds = descuentos.map((descuento) => ({
        ...descuento.toObject(),
        _id: descuento._id.toString()
    }));

    // solo devolvemos los descuentos si no se entró al catch
    res.json(descuentosStringIds);
};

//GET by ID
const getDescuentoById = async (req, res) => {
    const { DescuentoId } = req.params;
    try {
        const descuento = await Descuento.findById(DescuentoId);
        if (!descuento) {
            return res.status(404).json({ msg: 'Descuento no encontrada' });
        }

        // Convertir ObjectId a cadena
        const descuentoStringId = { ...descuento.toObject(), _id: descuento._id.toString() };
        res.json({ data: descuentoStringId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: `Error: ${err}` });
    }
}

//POST
const create = async (req, res) => {
    const { descripcion, porcentaje } = req.body;

    const descuento = new Descuento({
        descripcion,
        porcentaje
    });

    let DescuentoSocio;
    try {
        DescuentoSocio = await descuento.save();
    } catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Post: ${err}` });
    }

    res.json(DescuentoSocio);
};

// UPDATE de Descuento
const actualizarDescuento = async (req, res) => {
    const id = req.params.id;
    const { descripcion, porcentaje } = req.body;
    console.log(id);

    let DescuentoAct;
    try {
        DescuentoAct = await Descuento.updateOne(
            { "_id": id },
            {
                $set: {
                    descripcion: descripcion,
                    porcentaje: porcentaje
                }
            }
        );
    } catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Update: ${err}` });
    }

    res.json(DescuentoAct);
};

// DELETE de Descuento
const eliminarDescuento = async (req, res) => {
    const id = req.params.id;
    let response;
    try {
        response = await Descuento.deleteOne({ "_id": id });
        console.log(response);
    } catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Delete: ${err}` });
    }
    if (response.deletedCount === 0) {
        return res.json({ msg: `No se encontró descuento con id: ${id}` });
    }

    return res.json({ msg: `La descuento fue borrada ${id}` });
}

module.exports = {
    getStatus,
    getAll,
    getDescuentoById,
    create,
    actualizarDescuento,
    eliminarDescuento,
};
