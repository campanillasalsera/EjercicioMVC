
//he creado aquí el middleware, pero no estoy segura que sea el stio adecuado

function validarUserMiddleware(req, res, next) {

    if(req.cookies["isLogged"] === "true"){

      next();
      
    }else{
      res.status(403).send({
        mensaje: "No estás autorizado"
      });
    }
  }

  module.exports = {validarUserMiddleware};