//INSTALACIONES
//npm install init
//npm install express
//npm install cors
//npm install express-validator
//npm install bcrypt    para hashear contraseñas antes de guardarlas en DB

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require ('path');
const crudroutes = require('./router/crudroutes-router');
const cookieParser = require('cookie-parser');


const app = express();
const port = 8080;


app.use(cors());
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use('/', crudroutes);


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'MVC/views'));


app.use((req, res, next) => {
    res.status(404).send("No encontré eso");
  }); 
  
  //listen con el puerto
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });