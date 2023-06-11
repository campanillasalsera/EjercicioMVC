
const mysql = require('mysql2/promise');
const express = require('express');
const DatabaseCreator = require('../MVC/models/DatabaseCreator');


//no estoy segura que solo se incluyen aquí estas 4 rutas, o si hay otras rutas que
//también debería ir aquí

const router = express.Router();


router.get('/crud/:id', async (req, res) => {
    
    const conexion = await DatabaseCreator.abrirConexion();
    
    const id = req.params["id"];

    const [usuarios, fields] = await conexion.execute("SELECT * FROM usuario WHERE id=?", [id]);
    
    res.status(200).send({usuario: usuarios[0]});

    await conexion.end;
});

router.post('/crud', async (req, res) => {


    const conexion = await DatabaseCreator.abrirConexion();

    const nombre = req.body["nombre"];
    const apellidos = req.body["apellidos"];
    const email = req.body["email"];
    const pass = req.body["pass"];
    const consentimiento = req.body["consentimiento"];


    //requisitos: no admite números ni caracteres especiales aparte de ' y -
    let nombreRegex = /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/
    let emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    //requisitos: contener al menos un dígito, al menos una letra minúscula, al menos una letra mayúscula, al menos un carácter especial y tener una longitud entre 8 y 64 caracteres.
    let passRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/;

    const nombreValid = nombreRegex.test(nombre) && nombre && nombre.length>=3 && nombre.length<20;
    const apellidosValid = apellidos && nombreRegex.test(apellidos) && apellidos.length>=3 && apellidos.length<30;
    const emailValid = emailRegex.test(email) && email;
    const passValid = passRegex.test(pass) && pass && pass.length>=8;
    const consentimientoValid = Boolean(consentimiento) === true;

    if (!nombreValid || !apellidosValid || !emailValid || !passValid || !consentimientoValid) {
        res.status(400).send({
            mensaje: "datos incorrectos"
        });
    } else {
        await conexion.execute("INSERT INTO usuario (nombre, apellidos, email, pass, consentimiento) VALUES (?,?,?,?,?)", [nombre, apellidos, email, pass, consentimiento]);
        
        res.status(201).send({
            mensaje: "Created"
        });

        await conexion.end;
    }

});

router.put('/crud/:id', async (req, res) => {

    const conexion = await DatabaseCreator.abrirConexion();

    const id = req.params["id"];
    const nombre = req.body["nombre"];
    const apellidos = req.body["apellidos"];
    const email = req.body["email"];
    const pass = req.body["pass"];
    const consentimiento = req.body["consentimiento"];

    //requisitos: no admite números ni caracteres especiales aparte de ' y -
    let nombreRegex = /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/
    let emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    //requisitos: contener al menos un dígito, al menos una letra minúscula, al menos una letra mayúscula, al menos un carácter especial y tener una longitud entre 8 y 64 caracteres.
    let passRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/;

    const idValid = id && !Number.isNaN(Number(id));
    const nombreValid = nombreRegex.test(nombre) && nombre && nombre.length>=3 && nombre.length<20;
    const apellidosValid = apellidos && nombreRegex.test(apellidos) && apellidos.length>=3 && apellidos.length<30;
    const emailValid = emailRegex.test(email) && email;
    const passValid = passRegex.test(pass) && pass && pass.length>=8;
    const consentimientoValid = Boolean(consentimiento) === true;

    if (!idValid || !nombreValid || !apellidosValid || !emailValid || !passValid || !consentimientoValid) {
        res.status(400).send({
            mensaje: "datos incorrectos"
        });
    } else {
        const numberId = Number(id);

        const [usuarios, fields] = await conexion.execute("SELECT * FROM usuario WHERE id=?", [numberId]);

        if (usuarios.length === 0) {
            res.status (404).send ({
                message: "usuario no encontrado"
              });
        } 

        if (usuarios.length === 1) {
            await conexion.execute("UPDATE usuario SET nombre=?, apellidos=?, email=?, pass=?, consentimiento=? WHERE id=?",[nombre.toString(), apellidos.toString(), email.toString(), pass.toString(), consentimiento, numberId]);

            res.sendStatus(200);
        }

        await conexion.end;
    }




});

router.delete('/crud/:id', async (req, res) => {

    const conexion = await DatabaseCreator.abrirConexion();

    const id = req.params["id"];

    const validId = id && !Number.isNaN(Number(id));

    if (!validId) { 

        res.sendStatus(400);

    } else {
        
        const numberId = Number(id);

        const [usuarios, fields] = await conexion.execute("SELECT * FROM usuario WHERE id=?", [numberId]); 

        if (usuarios.length !== 1) {
            res.status (404).send ({
              message: "usuario no encontrado"
            });
          }else{
        
            await conexion.execute("DELETE from usuario WHERE id = ?",[numberId]);
            res.sendStatus(204);
          }

    }
    await conexion.end;
    
});


module.exports = router;
