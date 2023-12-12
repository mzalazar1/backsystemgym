const Socio = require("../models/socios");
const Cuota = require("../models/cuotas");
const { json } = require("express");

const getStatus = (req, res) => {
  Socio.find()
    .then((response) => res.status(200).json({ msg: "Connection OK" }))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

// Devuelve todos los socios
const getAll = async (req, res) => {
  let socios = [];

  try {
    socios = await Socio.find({}, { isDeleted: 0, __v: 0, _id: 0 });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({ msg: `Error: ${error}` });
  }

  // solo devolvemos los socios si no se entro al catch
  res.json(socios);
};

//GET by ID
const getSocioById = (req, res) => {
  const { SocioId } = req.params;
  Socio.find({ id: SocioId })
    .then((data) => res.json({ data }))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

//POST

const create = async (req, res) => {
  const { id, dni, name, lastname, tel, mail, fechaNac } = req.body;

  const socio = new Socio({
    id,
    dni,
    name,
    lastname,
    tel,
    mail,
    fechaNac,
  });
  let savedSocio;
  try {
    savedSocio = await socio.save();
  } catch (err) {
    console.log(err);
    res.status(500);
    res.json({ msg: `Error Post: ${err}` });
  }

  res.json(savedSocio);
};

// UPDATE de socios
const actualizarSoc = async (req, res) => {
  const id = req.params.id;
  const { dni, name, lastname, tel, mail, fechaNac } = req.body;
  console.log(id);

  let socioAct;
  try {
    socioAct = await Socio.updateOne(
      { id: id },
      {
        $set: {
          dni: dni,
          name: name,
          lastname: lastname,
          tel: tel,
          mail: mail,
          fechaNac: fechaNac,
        },
      }
    );
  } catch (err) {
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
  } catch (err) {
    console.log(err);
    res.status(500);
    res.json({ msg: `Error Delete: ${err}` });
  }
  if (response.deletedCount === 0) {
    return res.json({ msg: `No se encontro socio con id: ${id}` });
  }

  return res.json({ msg: `El socio borrado ${id}` });
};

//Controla acceso
const accesoSocio = async (req, res) => {
  const { socio } = req.body;

  let foundCuota;
  let resultAccess = false;

  try {
    // hacer un GET de mongoDB con filtro por DNI a la collection cuota
    foundCuota = await Cuota.findOne({ socio }); // socio, es un DNI

    if (foundCuota) {
      const tipoCuotaValidadoMinuscula = foundCuota.tipo.toLowerCase();

      // vamos a crear fecha de hoy antes porque la vamso a usar
      const dateNow = new Date();

      const calculateDate = (createdAt, days) => {
        const dueDate = new Date(createdAt.setDate(createdAt.getDate() + days));

        // devolvemos false para que no peuda acceder si ya se vencio.
        const acceso = dueDate < dateNow ? false : true;
        return acceso;
      };

      switch (tipoCuotaValidadoMinuscula) {
        case "mensual":
          // aplicamos y devolvemo o true o false si tiene acceso
          resultAccess = calculateDate(foundCuota.created_at, 31);

        case "trimestral":
          // aplicamos y devolvemo o true o false si tiene acceso
          resultAccess = calculateDate(foundCuota.created_at, 90);

        case "semestral":
          // aplicamos y devolvemo o true o false si tiene acceso
          resultAccess = calculateDate(foundCuota.created_at, 120);

        default:
          // aplicamos y devolvemo o true o false si tiene acceso
          resultAccess = calculateDate(foundCuota.created_at, 31);
      }
    } else {
      return res.json("not found");
    }
  } catch (err) {
    console.log("🚀 ~ file: socios.js:171 ~ accesoSocio ~ err:", err);
    console.log(err);
    res.status(500);
    res.json({ msg: `Error Post: ${err}` });
  }

  return res.json(resultAccess);
};

module.exports = {
  getStatus,
  getAll,
  getSocioById,
  create,
  actualizarSoc,
  eliminarSoc,
  accesoSocio,
};
