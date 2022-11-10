let productosDao;
let carritoDao;

switch (process.env.PERS) {
    case 'mongo':
        const ProductosDaoMongoDB = require('./ProductosDaoMongoDB.js');
        const CarritoDaoMongoDB  = require('./CarritoDaoMongoDB.js');
    
        productosDao = new ProductosDaoMongoDB();
        carritoDao = new CarritoDaoMongoDB();
        break;
    default:
        break;
}

module.exports = { productosDao, carritoDao };