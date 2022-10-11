const mongoose = require('mongoose');
const config = require('../config');
const ObjectId = require('mongoose').ObjectId;

const schema = {
  user:{ type: String, required: true },
  password: { type: String, required: true },
  name: { type: String },
  email: { type: String},
}

mongoose.connect(config.mongoDB.conn, config.mongoDB.options)
.then(console.log("Conectado a Mongo"))


class ContenedorMongoDB {
  constructor(coleccion, schema) {
    this.collection = mongoose.model(coleccion,{
      user:{ type: String, required: true },
      password: { type: String, required: true },
      name: { type: String },
      email: { type: String},
    });
  }

  async save(obj) {
    try {
      let response = await this.collection.insertMany(obj);
       return response;
    } catch (error) {
      console.log("error", error);
    }
  }

  async getAll() {
    try {
      let data = await this.collection.find({});
      return data;
    } catch (error) {
      console.log("error", error);
    }
  }
  
  async getByUser(user) {
    try {
      let usuario = await this.collection.findOne({"user": user});
      if (usuario) {
        return usuario;
      } else {
        return null;
      }
    } catch (error) {
      console.log("error", error);
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
      console.log("error", error);
    }
  }

  async getByIdAndUpdate(id,obj){
  try {
      console.log(id)
      let val = this.collection.findByIdAndUpdate(id,obj)
      console.log("val")
     } catch (error) {
      console.log(error)
    }
  }

  async deleteById(id) {
    try {
      let data = await this.collection.findByIdAndDelete(id);
      if (data) {
        console.log("Eliminado");
      } else {
        console.log("El producto no existe");
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  async deleteAll() {
    try {
      await this.collection.deleteMany({});
    } catch (error) {}
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
      console.log("error", error);
    }
  }

}

module.exports = ContenedorMongoDB;
