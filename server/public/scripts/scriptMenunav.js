
window.onload = ()=>{

    //************** MENÚ HAMBURGUESA**************/
    let menu = document.querySelector(".menu");
    let navbarToggle = document.querySelector(".navbar-toggle");
    navbarToggle.addEventListener("click", () => {
        if (menu.style.display === "none") {
            menu.style.display = "flex";
        } else {
            menu.style.display = "block";
        }
    })
}    