const {faker} = require('@faker-js/faker');
const { loggers } = require('winston');
const winston = require('winston');


const logger = winston.createLogger({
  level:'warn',
  transports:[
    new winston.transports.Console({level: 'verbose'}),
    new winston.transports.File({filename: 'warn.log', level:'warn'}),
    new winston.transports.File({filename: 'error.log', level:'error'})
  ]
})
let productos = []
try {
    for (let i = 1; i < 6; i++) {
        let prod = {
            "id": i,
            "title":faker.commerce.productName(),
            "price":faker.commerce.price(100,500,0),
            "thumbnail":faker.image.fashion(100,100,true)
        }
        productos.push(prod)
        
    }
} catch (error) {
   loggers.error(error) 
}


module.exports = productos;