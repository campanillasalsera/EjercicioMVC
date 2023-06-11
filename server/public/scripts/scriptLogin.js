

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