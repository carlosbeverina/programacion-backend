const ContenedorMongoDB = require('../repositorios/ContenedorMongoDB.js');


class CarritoDaoMongoDB extends ContenedorMongoDB {

    constructor(){
        super('carritos', {
            user: {type: String,require:true},
            productos: { type: Array, required: false }
        })
    }
    async newCart(user) {
        try {
          let toSave = {user, productos:[]}
          let response = await this.collection.insertMany(toSave);
          return user;
        } catch (error) {
          console.log("error", error);
        }
      }

      async getCartByEmail(correo) {
        try {
          let cart = await this.collection.findOne({email: correo});
          return cart;
        } catch (error) {
          console.log("error", error);
        }
      }
    
      async getByEmailAndUpdate(correo,obj){
        try {
            let val = this.collection.findOneAndUpdate({email:correo},{productos: obj}, function (err, docs) {
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

