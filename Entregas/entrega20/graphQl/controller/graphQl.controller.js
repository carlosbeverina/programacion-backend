const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { ProductosApi } = require('../api/productos.api.js');


const schema = buildSchema(`
type Producto {
    _id : ID!
    title: String,
    price: Int,
    photo: String
}
input ProductoInput {
    title: String,
    price: Int,
    photo: String
}
type Query {
    getProducto(_id: ID!): Producto,
}
type Mutation {
    createProducto(data: ProductoInput):Producto,
    updateProducto(id: ID!, datos: ProductoInput):Producto,
    deleteProducto(id: ID!): Producto,
}

`);

class GraphQlController{
    constructor(){
        this.api = new ProductosApi()
        this.config = {
            schema,
            rootValue: {
                getProducto:this.api.getProducto,
                createProducto:this.api.createProducto,
                updateProducto:this.api.updateProducto,
                deleteProducto:this.api.deleteProducto
            }
        }
        return graphqlHTTP(this.config)
    }
}

module.exports = { GraphQlController }