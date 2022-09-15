const ContenedorFirebase = require('../../contenedores/ContenedorFirebase.js');
const config = require('../../../config');


class ProductosDaoFirebase extends ContenedorFirebase {

    constructor(){
        super('carritos')
    }

    async newCart() {
        try {
          let toSave = {productos:[]}
          let response = await this.collection.add(toSave);
           return response[0]._id;
        } catch (error) {
          console.log("error", error);
        }
      }
    
      async getByIdAndUpdate(id,obj){
        try {
            let val = this.collection.doc(`${id}`)
            let item = await val.update({productos: obj})
            console.log("val")
           } catch (error) {
            console.log(error)
          }
        }
    
}

module.exports = ProductosDaoFirebase;