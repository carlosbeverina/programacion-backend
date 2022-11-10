const ContenedorMongoDB = require('../contenedores/ContenedorMongoDB.js');
const session = require("express-session");

class CarritoDaoMongoDB extends ContenedorMongoDB {

    constructor(){
        super('carritos', {
            productos: { type: Array, required: false }
        })
    }
    async newCart(obj) {
        try {
          let toSave = {productos:[]}
          let response = await this.collection.insertMany(toSave);
          return response[0]._id.toHexString();
        } catch (error) {
          console.log("error", error);
        }
      }
    
      async getByIdAndUpdate(id,obj){
        try {
            let val = this.collection.findByIdAndUpdate(id,{productos: obj}, function (err, docs) {
              if (err){
                  console.log(err)
              }
          })
           } catch (error) {
            console.log(error)
          }
        }
}

module.exports = CarritoDaoMongoDB;

