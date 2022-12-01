let usuariosDao;
let mensajesDao;
let productosDao;

switch (process.env.PERS_USERS) {
    case 'mongo':
        const DAOusuariosMongo = require('./DAO.usuarios.mongo.js');
        usuariosDao = DAOusuariosMongo.getInstance()
        break;
    // aca se puede agregar otros cases para otros servidores de persistencia
    default:
        break;
}

switch (process.env.PERS_MESSAGES) {
    case 'firebase':
        const DAOmensajeriaFirebase = require('./DAO.mensajeria.Firebase.js');
        mensajesDao = DAOmensajeriaFirebase.getInstance()
        break;
    // aca se puede agregar otros cases para otros servidores de persistencia
    default:
        break;
}

switch (process.env.PERS_PRODS) {
    case 'mongo':
        const DAOproductosMongo = require('./DAO.productos.mongo.js');
        productosDao = DAOproductosMongo.getInstance()
        break;
    // aca se puede agregar otros cases para otros servidores de persistencia
    default:
        break;
}

module.exports = { usuariosDao, mensajesDao, productosDao };