const firebase = require('firebase-admin');
const config = require('../../config');
const normalizr = require('normalizr');
const { normalize, denormalize, schema } = normalizr
const logger = require('../../logger');
const authorSchema = new schema.Entity('author',{idAttribute: 'email'});

const msgSchema = new schema.Entity('msg',{
    author: authorSchema
})

const mensajesSchema = new schema.Entity('mensajes',{
    mensajes: [ msgSchema ]
})

firebase.initializeApp({
  credential:firebase.credential.cert(config.firebase.cert)
})
console.log("Conectado Firebase")


class ContenedorFirebase {
  constructor(coleccion) { 
    let db = firebase.firestore()
    this.collection = db.collection(String(coleccion));
  }
  
  async getAll() {
    try {
      let data = await this.collection.get();
      let parsedData = data.docs.map((doc) =>({
        id: doc.id,
        ...doc.data()
      }));
      let normData = JSON.parse(parsedData[0].mensajes)
      let response = denormalize(normData.result,mensajesSchema,normData.entities)
      return response.mensajes;
    } catch (error) {
      logger.error(error);
    }
  }

  async save(obj) {
    try {
      let data = await this.collection.get();
      let parsedData = data.docs.map((doc) =>({
        id: doc.id,
        ...doc.data()
      }));
      let normData = JSON.parse(parsedData[0].mensajes)
      let deNormData = denormalize(normData.result,mensajesSchema,normData.entities)
      let mensajes = deNormData.mensajes
      let id = 1;
      if (mensajes.length) {
        let ids = mensajes.map((msg) => {
          return msg.id;
        });
        id = Math.max(...ids) + 1;
      }
      let toPush = {id,...obj}
      mensajes.push(toPush)
      deNormData.mensajes = mensajes
      normData = normalize(deNormData,mensajesSchema)
      const doc = this.collection.doc("mensajes")
      let response = await doc.update({mensajes: JSON.stringify(normData)})
      
       return response;
    } catch (error) {
      logger.error(error);
    }
  }

  
  async getCompRate(){
   try {
      let data = await this.collection.get();
      let parsedData = data.docs.map((doc) =>({
        id: doc.id,
        ...doc.data()
      }));
      let normData = JSON.parse(parsedData[0].mensajes)
      let response = denormalize(normData.result,mensajesSchema,normData.entities)
      return (Math.floor(JSON.stringify(parsedData).length/JSON.stringify(response).length*100));
    } catch (error) {
      logger.error(error);
  }
  }
}

module.exports = ContenedorFirebase;
