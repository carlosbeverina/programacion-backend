const ContenedorMongoDB = require('../repositorios/ContenedorMongoDB.js');
let instance = null

const schema = {
    email:{ type: String, required: true },
    datetime: { type: Date, required: true },
    type:{ type: String, required: true },
    message: { type: String, required:true }
  }
  

class DAOmensajeriaMongo extends ContenedorMongoDB{
    constructor(){
        super('mensajes',schema)
    }
    
    static getInstance(){
        if(!instance){
            instance = new DAOmensajeriaMongo;
        }
        return instance;
    }

}

module.exports = DAOmensajeriaMongo;