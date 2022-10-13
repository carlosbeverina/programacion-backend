const normalizr = require('normalizr');
const { normalize, denormalize, schema } = normalizr

const authorSchema = new schema.Entity('author',{idAttribute: 'email'});

const msgSchema = new schema.Entity('msg',{
    author: authorSchema
})

const mensajesSchema = new schema.Entity('mensajes',{
    mensajes: [ msgSchema ]
})

module.exports = mensajesSchema