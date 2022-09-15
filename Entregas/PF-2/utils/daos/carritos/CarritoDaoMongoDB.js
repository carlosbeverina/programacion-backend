const ContenedorMongoDB = require('../../contenedores/ContenedorMongoDB.js');
const config = require('../../../config');


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
          console.log(response);
           return response[0]._id;
        } catch (error) {
          console.log("error", error);
        }
      }
    
      async getByIdAndUpdate(id,obj){
        try {
            console.log(id)
            let val = this.collection.findByIdAndUpdate(id,{productos: obj})
            console.log("val")
           } catch (error) {
            console.log(error)
          }
        }
}

module.exports = CarritoDaoMongoDB;