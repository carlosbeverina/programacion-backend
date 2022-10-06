const {faker} = require('@faker-js/faker');

let productos = []

for (let i = 1; i < 6; i++) {
    let prod = {
        "id": i,
        "title":faker.commerce.productName(),
        "price":faker.commerce.price(100,500,0),
        "thumbnail":faker.image.fashion(100,100,true)
    }
    productos.push(prod)
    
}

module.exports = productos;