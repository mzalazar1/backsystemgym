const Cuota = require("../models/cuotas");

const getStatus = (req, res) => {
  Cuota.find()
    .then((response) => res.status(200).json({ msg: "Connection OK" }))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

// Devuelve todos los Cuotas
const getAll = async (req, res) => {
  let cuotas = [];

  try {
    cuotas = await Cuota.find({});
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({ msg: `Error: ${error}` });
  }

  // solo devolvemos los cuotas si no se entro al catch
  res.json(cuotas);
};

//GET by ID
const getCuotaById = (req, res) => {
  const { CuotaId } = req.params;
  Cuota.find({ id: CuotaId })
    .then((data) => res.json({ data }))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

//POST

const create = async (req, res) => {
  const payload = req.body;
  console.log("🚀 ~ file: cuotas.js:39 ~ create ~ payload:", payload);

  const cuota = new Cuota(payload);

  let savedCuota;
  try {
    savedCuota = await cuota.save();
  } catch (err) {
    console.log(err);
    res.status(500);
    res.json({ msg: `Error Post: ${err}` });
  }

  res.json(savedCuota);
};

// UPDATE de cuota
actualizarCuota = async (req, res) => {
  const id = req.params.id;
  const payload = req.body;

  let cuotaAct;
  try {
    cuotaAct = await Cuota.findOneAndUpdate(
      { id: id },
      { $set: payload },
      { returnDocument: "after" }
    );
  } catch (err) {
    console.log(err);
    res.status(500);
    res.json({ msg: `Error Update: ${err}` });
  }

  res.json(cuotaAct);
};

// DELETE de cuota
const eliminarCuota = async (req, res) => {
  const id = req.params.id;
  let response;
  try {
    response = await Cuota.deleteOne({ id });
    console.log(response);
  } catch (err) {
    console.log(err);
    res.status(500);
    res.json({ msg: `Error Delete: ${err}` });
  }
  if (response.deletedCount === 0) {
    return res.json({ msg: `No se encontro cuota con id: ${id}` });
  }

  return res.json({ msg: `La cuota fue borrada ${id}` });
};

module.exports = {
  getStatus,
  getAll,
  getCuotaById,
  create,
  actualizarCuota,
  eliminarCuota,
};
