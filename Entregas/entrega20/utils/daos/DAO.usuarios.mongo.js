const ContenedorMongoDB = require('../repositorios/ContenedorMongoDB.js');
let instance = null

const schema = {
    user:{ type: String, required: true },
    password: { type: String, required: true },
    name: { type: String },
    email: { type: String},
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