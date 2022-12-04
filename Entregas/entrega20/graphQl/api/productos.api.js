const { productosDao } = require('../../utils/daos/index');
const { producto } = require('../models/producto.model.js');


class ProductosApi{
    constructor(){
        this.productosDao = productosDao;
    }

     async getProducto({id}){
        let producto = await productosDao.getById(id)
        return {...producto._doc}
    }

    async createProducto({data}){
        let save = await productosDao.save(data)
        return {...save[0]};
    }

    async updateProducto({id, datos}){
        await productosDao.getByIdAndUpdate(id,datos)
        return {"msg":"Producto Modificado"}
    }

    async deleteProducto({id}){
        await productosDao.deleteById(id)
        return {"msg":"Producto eliminado"}
    }
}

module.exports = { ProductosApi }