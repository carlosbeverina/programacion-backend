const ContenedorMongoDB = require('../repositorios/ContenedorMongoDB.js');


class OrdenesDaoMongoDB extends ContenedorMongoDB {

    constructor(){
        super('ordenes', {
            number: {type: Number,require:true},
            user: {type: String,require:true},
            productos: { type: Array, required: false },
            domicilio: {type: String,require:true},
            datetime:{type: String,require:true},
            status: {type: String,require:true}
        })
    }
    async newOrder(usuario, cart) {
        try {
          let orders = await this.collection.find({})
          let number = orders.length + 1
          let toSave = 
            {
                number, 
                user:usuario.email, 
                productos: cart.productos, 
                domicilio: usuario.address,
                datetime: new Date(),
                status: "generada"
            }
          let response = await this.collection.insertMany(toSave);
          return response[0];
        } catch (error) {
          console.log("error", error);
        }
      }

}

module.exports = OrdenesDaoMongoDB;