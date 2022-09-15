const ContenedorFirebase = require('../../contenedores/ContenedorFirebase.js');
const config = require('../../../config');


class ProductosDaoFirebase extends ContenedorFirebase {

    constructor(){
        super("productos")
    }

    
}

module.exports = ProductosDaoFirebase;