const ContenedorFirebase = require('../repositorios/ContenedorFirebase');
let instance = null

class DAOmensajeriaFirebase extends ContenedorFirebase {
    constructor(){
        super('mensajeria')
    }

static getInstance(){
    if(!instance){
        instance = new DAOmensajeriaFirebase;
    }
    return instance;
}
}

module.exports = DAOmensajeriaFirebase;