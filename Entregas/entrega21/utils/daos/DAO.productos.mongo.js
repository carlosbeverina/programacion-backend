const ContenedorMongoDB = require('../repositorios/ContenedorMongoDB.js');
let instance = null

const schema = {
    title:{ type: String, required: true },
    price: { type: Number, required: true },
    photo: { type: String },
  }
  

class DAOproductosMongo extends ContenedorMongoDB{
    constructor(){
        super('prods',schema)
    }
    
    static getInstance(){
        if(!instance){
            instance = new DAOproductosMongo;
        }
        return instance;
    }
}

module.exports = DAOproductosMongo;