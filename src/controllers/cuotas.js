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
    console.log("🚀 ~ file: cuotas.js:15 ~ getAll ~ cuotas:", cuotas)
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({ msg: `Error: ${error}` });
  }

  // Convertir ObjectId a cadena en cada cuota
  const cuotasStringIds = cuotas.map((cuota) => ({
    ...cuota.toObject(),
    _id: cuota._id.toString(),
  }));

  // solo devolvemos los cuotas si no se entró al catch
  res.json(cuotasStringIds);
};

//GET by ID
const getCuotaById = async (req, res) => {
  const { CuotaId } = req.params;
  try {
    const cuota = await Cuota.findById(CuotaId);
    if (!cuota) {
      return res.status(404).json({ msg: 'Cuota no encontrada' });
    }

    // Convertir ObjectId a cadena
    const cuotaStringId = { ...cuota.toObject(), _id: cuota._id.toString() };
    res.json({ data: cuotaStringId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: `Error: ${err}` });
  }
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
      { "_id": id },
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
    response = await Cuota.deleteOne({ "_id": id });
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
