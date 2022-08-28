const { optionsSqlite3 } = require('../DB/conecctionsStrs/connSqlite3.js');
const { optionsMariaDB } = require('../DB/conecctionsStrs/connMariaDB.js');

class Contenedor {
  constructor(options,table) {
    this.options = options
    this.table = table;
  }

  async save(obj) {
    try {
      let response = {};
      let knex =require('knex')(this.options);
      await knex(this.table).insert([obj])
       .then(resp => {response = {"id":resp[0],...obj};} )
       .catch(err => console.log(err))
       .finally(()=> knex.destroy());

       return response;
    } catch (error) {
      console.log("error", error);
    }
  }

  async getById(id) {
    try {
      let producto ={};
      let knex =require('knex')(this.options);
      let response = await knex(this.table).select('*').where('id','=',Number(id))
      producto = {...response[0]}
      knex.destroy();

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
      let knex =require('knex')(this.options);
      let response = await knex(this.table).select('*');
      let array = []
      response.map((resp) => array.push({...resp}));
      knex.destroy();
      return array;
      
    } catch (error) {
      console.log("error", error);
    }
  }

  async deleteById(id) {
    try {

      let knex =require('knex')(this.options);
      let response = await knex(this.table).select('*').where('id','=',Number(id));
      if (response.length > 0){
        await knex.from(this.table).where('id','=',Number(id)).del().catch(err => console.log(err))
        knex.destroy();
        return "Elemento eliminado";
      } else {
        knex.destroy();
        return "Elemento no encontrado";

      }

    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      let knex =require('knex')(this.options);
      await knex(this.table).del()
    } catch (error) {}
  }

  async getLength() {
    try {
      let knex =require('knex')(this.options);
      let data = await knex(this.table).select('*');

      if (data) {
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
