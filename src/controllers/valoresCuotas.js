const ValorCuota = require("../models/valoresCuotas");

const getStatus = (req, res) => {
    ValorCuota.find()
        .then((response) => res.status(200).json({ msg: "Connection OK" }))
        .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
}

// Devuelve todos los valoresCuotas
const getAll = async (req, res) => {
    let valoresCuotas = [];

    try {
        valoresCuotas = await ValorCuota.find({});
    } catch (error) {
        console.log(error);
        res.status(500);
        res.json({ msg: `Error: ${error}` });
    }

    // Convertir ObjectId a cadena en cada valor de cuota
    const valoresCuotasStringIds = valoresCuotas.map((valorCuota) => ({
        ...valorCuota.toObject(),
        _id: valorCuota._id.toString(),
    }));

    // solo devolvemos los valores de cuotas si no se entró al catch
    res.json(valoresCuotasStringIds);
};

//GET by ID
const getValorCuotaById = async (req, res) => {
    const { ValorCuotaId } = req.params;
    try {
        const valorCuota = await ValorCuota.findById(ValorCuotaId);
        if (!valorCuota) {
            return res.status(404).json({ msg: 'Valor de cuota no encontrado' });
        }

        // Convertir ObjectId a cadena
        const valorCuotaStringId = { ...valorCuota.toObject(), _id: valorCuota._id.toString() };
        res.json({ data: valorCuotaStringId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: `Error: ${err}` });
    }
}

//POST
const create = async (req, res) => {
    const payload = req.body;

    const valorCuota = new ValorCuota({ ...payload });
    let savedValorCuota;
    try {
        savedValorCuota = await valorCuota.save();
    } catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Post: ${err}` });
    }

    res.json(savedValorCuota);
};

// UPDATE de ValorCuota
const actualizarValorCuota = async (req, res) => {
    const id = req.params.id;
    const payload = req.body;
    console.log(id);

    let valorCuotaAct;
    try {
        valorCuotaAct = await ValorCuota.updateOne(
            { "_id": id },
            {
                $set: { ...payload }
            }
        );
    } catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Update: ${err}` });
    }

    res.json(valorCuotaAct);
};

// DELETE de ValorCuota
const eliminarValorCuota = async (req, res) => {
    const id = req.params.id;
    let response;
    try {
        response = await ValorCuota.deleteOne({ "_id": id });
        console.log(response);
    } catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Delete: ${err}` });
    }
    if (response.deletedCount === 0) {
        return res.json({ msg: `No se encontró valor de cuota con id: ${id}` });
    }

    return res.json({ msg: `El valor de cuota fue borrado ${id}` });
}

module.exports = {
    getStatus,
    getAll,
    getValorCuotaById,
    create,
    actualizarValorCuota,
    eliminarValorCuota,
};
