const mongoose = require('mongoose');
const config = require('../../config.js');
const {logger} = require('../../logger.js');


mongoose.connect(config.mongoDB.conn, config.mongoDB.options)
.then(console.log("Conectado a Mongo"))


class ContenedorMongoDB {
  constructor(coleccion, schema) {
    this.collection = mongoose.model(coleccion,schema);
  }

  async save(obj) {
    try {
      let toSave = {...obj, code: `${Math.floor(Date.now()/100)}`}
      let response = await this.collection.insertMany(toSave);
      
       return response;
    } catch (error) {
      logger.error("error", error);
    }
  }

  async getAll() {
    try {
      let data = await this.collection.find({});
      return data;
    } catch (error) {
      logger.error("error", error);
    }
  }
  
  async getById(id) {
    try {
      let producto = this.collection.findById(id);
      if (producto) {
        return producto;
      } else {
        return null;
      }
    } catch (error) {
      logger.error("error", error);
    }
  }

  async getByIdAndUpdate(id,obj){
  try {
      let val = this.collection.findByIdAndUpdate(id,obj)
     } catch (error) {
      logger.error(error)
    }
  }

  async deleteById(id) {
    try {
      let data = await this.collection.findByIdAndDelete(id);
      if (data) {
        logger.info("Eliminado");
      } else {
        logger.error("El producto no existe");
      }
    } catch (error) {
      logger.error("error", error);
    }
  }

  async deleteAll() {
    try {
      await this.collection.deleteMany({});
    } catch (error) {
      logger.error("error",error)
    }
  }

  async getLength() {
    try {
      let out = this.collection.estimatedDocumentCount()
      if (out) {
        
        return out;
      } else {
        return null;
      }
    } catch (error) {
      logger.error("error", error);
    }
  }

}

module.exports = ContenedorMongoDB;
