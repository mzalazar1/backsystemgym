const Pago = require("../models/pagos");

const getStatus = (req, res) => {
    Pago.find()
        .then((response) => res.status(200).json({ msg: "Connection OK" }))
        .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
}

// Devuelve todos los pagos
const getAll = async (req, res) => {

    let pagos = [];

    try {
        pagos = await Pago.find({})
    } catch (error) {
        console.log(error);
        res.status(500);
        res.json({ msg: `Error: ${error}` });
    }

    // solo devolv./models si no se entro al catch
    res.json(pagos);
};

//GET by ID
const getPagoById = (req, res) => {
    const { PagoId } = req.params;
    Pago.find({ id: PagoId })
        .then((data) => res.json({ data }))
        .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
}

//POST

const create = async (req, res) => {

    const { id, fecha, importe, metodo } = req.body;

    const pago = new Pago({
        id,
        fecha,
        importe,
        metodo
    });
    let pagoSocio;
    try {
        pagoSocio = await pago.save();
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Post: ${err}` });
    }

    res.json(pagoSocio);

};

// UPDATE de Pago
const actualizarPago = async (req, res) => {
    const id = req.params.id;
    const { fecha, importe, metodo } = req.body;
    console.log(id);

    let pagoAct;
    try {
        pagoAct = await Pago.updateOne(
            { "id": id },
            {
                $set: {
                    fecha: fecha,
                    importe: importe,
                    metodo: metodo
                }
            }
        );
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Update: ${err}` });
    }

    res.json(pagoAct);
};

// DELETE de Pago
const eliminarPago = async (req, res) => {
    const id = req.params.id;
    let response;
    try {
        response = await Pago.deleteOne({ id });
        console.log(response);
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Delete: ${err}` });
    }
    if (response.deletedCount === 0) {
        return res.json({ msg: `No se encontro pago con id: ${id}` });
    }

    return res.json({ msg: `El pago fue borrado ${id}` });
}


module.exports = {
    getStatus,
    getAll,
    getPagoById,
    create,
    actualizarPago,
    eliminarPago,
};