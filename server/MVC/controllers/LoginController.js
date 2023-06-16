const DatabaseCreator = require('../models/DatabaseCreator');
const Usuario = require ('../models/Usuario');


async function loginController(req, res) {

  
  const conexion = await DatabaseCreator.abrirConexion();
  
  const nombre = req.body["nombre"];
  const pass = req.body["pass"];

  const [usuarios, fields] = await conexion.execute("SELECT * FROM usuario WHERE nombre=? AND pass=?",[nombre, pass]);

  if (usuarios.length === 1) {

    const nuevoUser = new Usuario (usuarios[0]["nombre"], usuarios[0]["apellidos"], usuarios[0]["email"], usuarios[0]["pass"], usuarios[0]["consentimiento"]);
    res.cookie("isLogged", nuevoUser.nombre, {
      maxAge: Date.now()+3600,  
    });


    
    console.log("Hola "+nuevoUser.nombre);

    //ALEJANDRO
    //No consigo que el mensaje o los datos llegue desde aquí a la consola del cliente
    //He intentado de todo durante 2 días y no lo consigo.
    //No se cual es el motivo porque desde cuando uso el post del crudroute si envía mensaje al 
    //cliente. Incluso intente usar esto como una ruta dentro del crudroute, pero
    //tampoco funcionó
    //También me gustaría hacer que aparezca un Hola nombreUsuario en la vista, 
    //pero tampoco lo he conseguido. Solo renderiza desde un get, no desde el post creo
    //El usuario existe en la base de datos. 
    res.status(200).send({
      mensaje: "Mensaje desde el back"
    });

  }else{

    res.status(401).send({
      mensaje: "No autorizado"
    });

  }
  
  
  await conexion.end;

}

module.exports = {loginController};