
//CLASSES

class Usuario {
    //definimos los atributos directamente en el constructor

    constructor (nombre, apellidos, email, pass, consentimiento){
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.pass = pass;
        this.consentimiento = consentimiento;
    }

}


class ResultadoValidacion{

    constructor (campo, problema){
        this.campo = campo;
        this.problema = problema;
    }
}

class ValidacionFormularioRegistro {

    //Metodo validar 
    validarFormularioRegistro(newUser, formularioRegistro){

        let errores = [];

        let espciosBlancosRegex = /^\s*$/;
        let nombreRegex = /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/
        let emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        //requisitos: contener al menos un dígito, al menos una letra minúscula, al menos una letra mayúscula, al menos un carácter especial y tener una longitud entre 8 y 64 caracteres.
        let passRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/; 


        if (!newUser.nombre) {
            errores.push(new ResultadoValidacion ("Nombre", "Debe introducir un Nombre válido"));  
        }
        if (espciosBlancosRegex.test(newUser.nombre)) {
            errores.push(new ResultadoValidacion ("Nombre", "El Nombre no permite más de 1 espcio en blanco"));
        }
        if (!nombreRegex.test(newUser.nombre)) {
            errores.push(new ResultadoValidacion ("Nombre", "El Nombre solo permite letras y los caracteres ' y -"));  
        }
        if (!newUser.apellidos) {
            errores.push(new ResultadoValidacion ("Apellidos", "Debe introducir Apellidos válidos"));
        }
        if (espciosBlancosRegex.test(newUser.apellidos)) {
            errores.push(new ResultadoValidacion ("Apellidos", "Los Apellidos no permiten más de 1 espcio en blanco seguido"));
        }
        if (!nombreRegex.test(newUser.apellidos)) {
            errores.push(new ResultadoValidacion ("Apellidos", "Los Apellidos solo permiten letras y los caracteres ' y -"));
        }
        if (!emailRegex.test(newUser.email)) {
            errores.push(new ResultadoValidacion ("Email", "Por favor, escriba un Email válido"));  
        }
        if (!passRegex.test(newUser.pass)) {
            errores.push(new ResultadoValidacion ("Pass", "La Contraseña debe contener al menos un dígito, al menos una letra minúscula, al menos una letra mayúscula, al menos un carácter especial y tener una longitud entre 8 y 64 caracteres"));
        }


       
        return errores;
        
    }
}


window.addEventListener("load", ()=>{

    let formularioRegistro = document.querySelector("#formRegistro");

    formularioRegistro.addEventListener("submit", (eventoSubmit)=>{
        eventoSubmit.preventDefault();

        //apunto a los inputs
        let nombreInput = document.querySelector("#nombreRegistro");
        let apellidosInput = document.querySelector("#apellidosRegistro");
        let emailInput = document.getElementsByName("email")[0];
        let passInput = document.getElementsByName("pass")[0];
        let consentimientoInput = document.querySelector("#consentimientoDatos");

        //Recojo valores inputs
        let nombre = nombreInput.value.trim();
        let apellidos =apellidosInput.value.trim();
        let email = emailInput.value.trim();
        let pass =passInput.value.trim();
        let consentimiento = consentimientoInput.checked;
        
        const newUser = new Usuario(nombre, apellidos, email, pass, consentimiento)
        console.log(newUser);
        
        const validacion = new ValidacionFormularioRegistro();

        let resultadoValidacion = validacion.validarFormularioRegistro(newUser);




        let alertBox = document.querySelector("#alertBox");

        let mensajeAlertBox = document.querySelector("#alertBox p");

        let contadorErrores = resultadoValidacion.length;

        if (contadorErrores === 0) {

            let dataNewUser = {
                nombre: newUser.nombre,
                apellidos: newUser.apellidos,
                email: newUser.email,
                pass: newUser.pass,
                consentimiento: newUser.consentimiento
            }

            fetch ("http://localhost:8080/crud", {
                method:"POST", 
                body:JSON.stringify(dataNewUser), 
                headers:{'Content-Type': 'application/json'}, 
                credentials: 'same-origin'}
                ).then(function (response){
                    response.json().then((data) => {
                        console.log(data);
                        alertBox.classList.add("alertaEnviado");
                        mensajeAlertBox.innerHTML = "Enviado";
                        alertBox.style.top= "0px";
                        setTimeout(() => {
                            alertBox.style.top="-170px"; 
                            alertBox.classList.remove("alertaEnviado");    
                        }, 3000);});
                    }).catch(function(error){
                        console.warn(error);
                        alertBox.classList.add("alertaerror");
                        mensajeAlertBox.innerHTML = "Problemas al conectar con el servidor";
                        alertBox.style.top= "0px";
                        setTimeout(() => {
                            alertBox.style.top="-170px"; 
                            alertBox.classList.remove("alertaError");    
                        }, 3000);
                    });
                    



        } else {

            for (const resultado of resultadoValidacion) {

                let mensajeError = resultado.problema;
                let campo = resultado.campo;

                if (campo === "Nombre") {
                    nombreInput.classList.add("errorInput");
                    nombreInput.addEventListener("click", ()=>{
                        nombreInput.classList.remove("errorInput"); 
                    })
                }
                if (campo === "Apellidos") {
                    apellidosInput.classList.add("errorInput");
                    apellidosInput.addEventListener("click", ()=>{
                        apellidosInput.classList.remove("errorInput"); 
                    })
                }
                if (campo === "Email") {
                    emailInput.classList.add("errorInput");
                    emailInput.addEventListener("click", ()=>{
                        emailInput.classList.remove("errorInput"); 
                    })
                }
                if (campo === "Pass") {
                    passInput.classList.add("errorInput");
                    passInput.addEventListener("click", ()=>{
                        passInput.classList.remove("errorInput"); 
                    })
                }

                alertBox.classList.add ("errorCampo", "input::placeholder")
                mensajeAlertBox.innerHTML = mensajeError;
                alertBox.style.top= "0px";

                setTimeout(() => {
                    alertBox.style.top="-170px"; 
                    alertBox.classList.remove("errorCampo","input::placeholder")    
                }, 3000);
                
                
            }




        }




    //Fin submit formulario Registro    
    })

    

})