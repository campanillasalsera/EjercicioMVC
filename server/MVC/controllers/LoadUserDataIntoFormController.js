
const DatabaseCreator = require('../models/DatabaseCreator');
const Usuario = require ('../models/Usuario');


async function loadUserDataIntoFormController(req, res) {

    const id = req.params["id"];

    const conexion = await DatabaseCreator.abrirConexion();

    const [usuarios, fields] = await conexion.execute("SELECT * FROM usuario WHERE id=?",[Number(id)])
    
    const nuevoUser = new Usuario (usuarios[0]["nombre"], usuarios[0]["apellidos"], usuarios[0]["email"], usuarios[0]["pass"], usuarios[0]["consentimiento"]);

    res.render('loginForm', {
        formLogin:{
            loginName: nuevoUser.nombre,
            loginPass: nuevoUser.pass
        }
      });



}

module.exports = {loadUserDataIntoFormController};