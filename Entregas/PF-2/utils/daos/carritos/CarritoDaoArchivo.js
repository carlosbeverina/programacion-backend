const ContenedorArchivo = require('../../contenedores/ContenedorArchivo.js');
const config = require('../../../config');
const fs = require("fs");


class CarritoDaoArchivo extends ContenedorArchivo {

    constructor(){
        super(config.fs.rutaCarrito)
    }

    async newCart() { 
        try {
          let data = await fs.promises.readFile(this.ruta, "utf-8");
          let dataParse = JSON.parse(data);
          let id = 1;
          if (dataParse.length) {
            let ids = dataParse.map((cart) => {
              return cart.idCart;
            });
            id = Math.max(...ids) + 1;
          }
          let toSave =  {idCart: id, timestamp: Date.now(), productos:[] }
          if (dataParse.length) {
            await fs.promises.writeFile(
              this.ruta,
              JSON.stringify([...dataParse, toSave], null, 2)
            );
          } else {
            await fs.promises.writeFile(
              this.ruta,
              JSON.stringify([toSave], null, 2)
            );
          }
          return id;
        } catch (error) {
          console.log("error", error);
        }
      }

      async getById(id) {
        try {
          let data = await fs.promises.readFile(this.ruta, "utf-8");
          let dataParse = JSON.parse(data);
          let cart = dataParse.find((cart) => cart.idCart === Number(id));
          
          if (cart) {
            return cart;
          } else {
            return null;
          }
        } catch (error) {
          console.log("error", error);
        }
      }

      async deleteById(id) {
        try {
          let data = await fs.promises.readFile(this.ruta, "utf-8");
          let dataParse = JSON.parse(data);
          let cart = dataParse.find((cart) => cart.idCart === Number(id));
          if (cart) {
            let filtrado = dataParse.filter((cart) => cart.idCart !== Number(id));
            await fs.promises.writeFile(
              this.ruta,
              JSON.stringify(filtrado, null, 2)
            );
            console.log("Eliminado");
          } else {
            console.log("El producto no existe");
          }
        } catch (error) {}
      }


    
}

module.exports = CarritoDaoArchivo;