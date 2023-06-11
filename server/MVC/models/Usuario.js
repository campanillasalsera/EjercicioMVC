

class Usuario {

    nombre;
    apellidos;
    email;
    pass;
    consentimiento;

    constructor (nombre, apellidos, email, pass, consentimiento){
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.pass = pass;
        this.consentimiento = consentimiento;

    }
}


module.exports = Usuario;