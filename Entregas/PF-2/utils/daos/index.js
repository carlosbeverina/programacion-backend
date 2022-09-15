let productosDao;
let carritoDao;

switch (process.env.PERS) {
    case 'txt':
        const ProductosDaoArchivo = require('./productos/ProductosDaoArchivo.js');
        const CarritoDaoArchivo  = require('./carritos/CarritoDaoArchivo.js');

        productosDao = new ProductosDaoArchivo();
        carritoDao = new CarritoDaoArchivo();
        break;
    case 'mongo':
        const ProductosDaoMongoDB = require('./productos/ProductosDaoMongoDB.js');
        const CarritoDaoMongoDB  = require('./carritos/CarritoDaoMongoDB.js');
    
        productosDao = new ProductosDaoMongoDB();
        carritoDao = new CarritoDaoMongoDB();
        break;
    case 'firebase':
        const ProductosDaoFirebase = require('./productos/ProductosDaoFirebase.js');
        const CarritoDaoFirebase  = require('./carritos/CarritoDaoFirebase.js');
        
        productosDao = new ProductosDaoFirebase();
        carritoDao = new CarritoDaoFirebase();
        break;    
    
    default:
        break;
}

module.exports = { productosDao, carritoDao };