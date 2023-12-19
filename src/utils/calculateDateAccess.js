const calculateDateAccess = (createdAt, days) => {
    // vamos a crear fecha de hoy antes porque la vamso a usar
    const dateNow = new Date();

    const dueDate = new Date(createdAt.setDate(createdAt.getDate() + days));

    // devolvemos false para que no pueda acceder si ya se venció.
    const acceso = dueDate < dateNow ? false : true;

    return { acceso, dueDate };
};

module.exports = calculateDateAccess;