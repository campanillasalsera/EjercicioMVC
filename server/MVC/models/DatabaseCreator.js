
const mysql = require('mysql2/promise');

class DatabaseCreator {

    static async abrirConexion() {

        const conexion = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'jsnode', 
            port:3306
          });
      
          return conexion;

    }
}

module.exports = DatabaseCreator; 