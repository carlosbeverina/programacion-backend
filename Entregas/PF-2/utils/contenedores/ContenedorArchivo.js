const fs = require("fs");

class ContenedorArchivo {
  constructor(ruta) {
    this.ruta = ruta;
  }

  async save(obj) {
    try {
      let data = await fs.promises.readFile(this.ruta, "utf-8");
      let dataParse = JSON.parse(data);
      let id = 1;
      if (dataParse.length) {
        let ids = dataParse.map((prod) => {
          return prod.id;
        });
        id = Math.max(...ids) + 1;
      }
      let toSave =  {...obj, id: id, timestamp: Date.now(), code: `${Math.floor(Date.now()/10000)}-${id}` }
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
      return toSave;
    } catch (error) {
      console.log("error", error);
    }
  }

  async getById(id) {
    try {
      let data = await fs.promises.readFile(this.ruta, "utf-8");
      let dataParse = JSON.parse(data);
      let producto = dataParse.find((producto) => producto.id === id);
      if (producto) {
        return producto;
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
      let producto = dataParse.find((producto) => producto.id === Number(id));
      if (producto) {
        let filtrado = dataParse.filter((producto) => producto.id !== Number(id));
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

module.exports = ContenedorArchivo;
