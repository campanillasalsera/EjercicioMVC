
//Función que recupera el value de una cookie pasandole el nombre de la cookie en 
//en concreto por parámetro
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