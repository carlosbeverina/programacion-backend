const ContenedorMongoDB = require('../contenedores/ContenedorMongoDB.js');

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
}

module.exports = DAOusuariosMongo;