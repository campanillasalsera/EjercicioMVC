//INSTALACIONES
//npm install init
//npm install express
//npm install cors

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require ('path');
const crudroutes = require('./router/crudroutes-router');
const { loadUserDataIntoFormController } = require('./MVC/controllers/LoadUserDataIntoFormController');
const cookieParser = require('cookie-parser');
const { loginController } = require('./MVC/controllers/LoginController');
const {validarUserMiddleware} = require ('./MVC/middleware/validarUserMiddleware');



const app = express();
const port = 8080;


app.use(cors());
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use('/', crudroutes);


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'MVC/views'));


//Creo que estas rutas debería ir en un archivo de rutas del usuario, pero
//en ese caso, no tengo claro como llamarlas, pues tengo app.use('/', crudroutes);
//para que use crudroutes.
app.get('/login/:id', loadUserDataIntoFormController);
app.post('/userlogin', loginController);
app.get('/areaPrivada', validarUserMiddleware, (req, res) => {
  res.send({
    mensaje: "Estamos dentro"
  });
})


app.use((req, res, next) => {
    res.status(404).send("No encontré eso");
  }); 
  
  //listen con el puerto
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });