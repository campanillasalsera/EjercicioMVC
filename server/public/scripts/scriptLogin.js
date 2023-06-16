//ALEJANDRO cual sería el sitio ideal para declarar esta función
function getCookieValue(cookieName) {
    // Obtener todas las cookies
    const cookies = document.cookie.split(";");
  
    // Buscar la cookie específica por nombre
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
  
      // Verificar si la cookie comienza con el nombre buscado
      if (cookie.indexOf(cookieName) === 0) {
        // Obtener el valor de la cookie
        return cookie.substring(cookieName.length + 1, cookie.length);
      }
    }
  
    // Si no se encuentra la cookie, retornar null o un valor predeterminado
    return null;
  }



window.addEventListener("load", () => {

    const formLogin = document.querySelector("#formLogin");
    const userLoggedName = document.querySelector("#userLoggedName");

    formLogin.addEventListener("submit", () => {

        const nombre = document.querySelector("#nombreLogin").value;
        const pass = document.querySelector("#passLogin").value;

        let dataNewUser = {
            nombre: nombre,
            pass: pass
        }

        fetch("http://localhost:8080/userlogin", {
            method:"POST", 
            body:JSON.stringify(dataNewUser), 
            headers:{'Content-Type': 'application/json'}, 
            credentials: 'same-origin'
        }).then(function (response) {
            response.json().then((data) => {
               console.log(data);
            });
        }).catch(function (error) {
            console.warn(error);
        });

    });

     //************Saludo usuario logueado
     const cookieName = "isLogged";
     const miValorDeCookie = getCookieValue(cookieName);

     const saludoUserLogged = "Hola "+miValorDeCookie;
    if (miValorDeCookie !== null) {
         document.querySelector("#userlogged p").innerHTML=saludoUserLogged;
    }


    //*********Sitio super Secreto */
    const superSecretBtn = document.querySelector ("#superSecretBtn");
    superSecretBtn.addEventListener('click', () => {


        fetch("http://localhost:8080/areaPrivada", {
            method:"GET", 
            credentials: 'same-origin'
        }).then(function (response) {
            response.json().then((data) => {
                alert(data.mensaje);
            });
        }).catch(function (error) {
            console.warn(error);
        });



    });

});