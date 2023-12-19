export const calculateDateAccess = (createdAt, days) => {
    const dueDate = new Date(createdAt.setDate(createdAt.getDate() + days));

    // devolvemos false para que no pueda acceder si ya se venció.
    const acceso = dueDate < dateNow ? false : true;

    //Verificamos que el socio que se registra tiene cuota vigente  
    if (acceso) {
        // REGISTRAR UN EVENTO DE ACCESO USANDO ESTE "SERVICIO"
        agregarAsistencia(dni)
    }

    return acceso;
};