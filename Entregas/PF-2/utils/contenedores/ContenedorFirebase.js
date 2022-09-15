const { response, query } = require('express');
const firebase = require('firebase-admin');
const config = require('../../config.js');



firebase.initializeApp({
  credential:firebase.credential.cert(config.firebase.cert)
})
console.log("Conectado Firebase")


class ContenedorFirebase {
  constructor(coleccion) { 
    let db = firebase.firestore()
    this.collection = db.collection(String(coleccion));
  }

  async save(obj) {
    try {
      let toSave = {...obj, code: `${Math.floor(Date.now()/100)}`}
      let response = await this.collection.add(toSave);
      
       return response._path.segments[1];
    } catch (error) {
      console.log("error", error);
    }
  }

  async getAll() {
    try {
      let data = await this.collection.get();
      let response = data.docs.map((doc) =>({
        id: doc.id,
        ...doc.data()
      }));
      return response;
    } catch (error) {
      console.log("error", error);
    }
  }
  
  async getById(id) {
    try {
      let doc = this.collection.doc(`${id}`);
      let item = await doc.get()
      let producto = {id: item.id, ...item.data()}
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
      
      let val = this.collection.doc(`${id}`)
      let item = await val.update(obj)
     } catch (error) {
      console.log(error)
    }
  }

  async deleteById(id) {
    try {
      let val = this.collection.doc(`${id}`);
      let item = await val.delete()
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
      let val = this.collection.doc();
      let item = await val.delete()
    } catch (error) {}
  }

  async getLength() {
    try {
      let val = this.collection.get();
      let item = val.docs
      out = item.length
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

module.exports = ContenedorFirebase;
