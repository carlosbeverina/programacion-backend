const fs = require("fs");
class Contenedor {
  constructor(ruta) {
    this.ruta = ruta;
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

  async getAll() {
    try {
      let data = await fs.promises.readFile(this.ruta, "utf-8");
      let dataParse = JSON.parse(data);
      return dataParse;
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

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.ruta, JSON.stringify([]));
    } catch (error) {}
  }

  async getLength() {
    try {
      let data = await fs.promises.readFile(this.ruta, "utf-8");
      let dataParse = JSON.parse(data);
      let out = dataParse;

      if (out) {
        console.log(out.length);
        return out.length;
      } else {
        return null;
      }
    } catch (error) {
      console.log("error", error);
    }
  }
  async overWrite(listado){
    await fs.promises.writeFile(this.ruta, "");
    await fs.promises.writeFile(this.ruta,
      JSON.stringify(listado, null, 2))
  }
}

module.exports = Contenedor;
