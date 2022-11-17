const ContenedorFirebase = require('../contenedores/ContenedorFirebase');

class DAOmensajeriaFirebase extends ContenedorFirebase {
    constructor(){
        super('mensajeria')
    }
}

module.exports = DAOmensajeriaFirebase;