const ContenedorMongoDB = require('../contenedores/ContenedorMongoDB.js');
const config = require('../../config');


class UsuariosDaoMongoDB extends ContenedorMongoDB {

    constructor(){
        super('users', {
            email:{ type: String, required: true },
            password: { type: String, required: true },
            name: { type: String, required: true },
            address: { type: String },
            age: {type: Number, required: true},
            phone: { type: String, required: true },
            photo: { type: String }
        })
    }
    async getByUser(email) {
        try {
          let usuario = await this.collection.findOne({"email": email});
          if (usuario) {
            return usuario;
          } else {
            return null;
          }
        } catch (error) {
          console.log("error", error);
        }
      }
    
}

module.exports = UsuariosDaoMongoDB;