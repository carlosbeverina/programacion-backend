const ContenedorArchivo = require('../../contenedores/ContenedorArchivo.js');
const config = require('../../../config');


class ProductosDaoArchivo extends ContenedorArchivo {

    constructor(){
        super(config.fs.rutaProductos)
    }

    
}

module.exports = ProductosDaoArchivo;