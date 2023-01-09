const ContenedorMongoDB = require('../repositorios/ContenedorMongoDB.js');
let instance = null

const schema = {
    email: { type: String, required: true},
    password: { type: String, required: true },
    name: { type: String },
    phone: { type: Number },
    address: { type: String, required: true }
  }
  

class DAOusuariosMongo extends ContenedorMongoDB{
    constructor(){
        super('usuarios',schema)
    }
    
    static getInstance(){
        if(!instance){
            instance = new DAOusuariosMongo;
        }
    }
}

module.exports = DAOusuariosMongo;