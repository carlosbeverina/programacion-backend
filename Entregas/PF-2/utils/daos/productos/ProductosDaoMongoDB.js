const ContenedorMongoDB = require('../../contenedores/ContenedorMongoDB.js');
const config = require('../../../config');


class ProductosDaoMongoDB extends ContenedorMongoDB {

    constructor(){
        super('productos', {
            title:{ type: String, required: true },
            price: { type: Number, required: true },
            thumbnail: { type: String, required: true },
            desc: { type: String },
            stock: {type: Number, required: true},
            code: { type: Number, required: true }
        })
    }

    
}

module.exports = ProductosDaoMongoDB;