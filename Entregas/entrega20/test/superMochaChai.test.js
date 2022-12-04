const request = require('supertest')(`http://localhost:8080/productos-test`);
const expect = require('chai').expect;
const axios = require('axios');

let id=""
let modProd = { title: "AAAAAAA", price: 100, photo: "BBBB" }

describe('Test API Productos', () => {
    
    
    describe('POST', () => {
        it('Debe crear un producto con los datos especificados', async () => {
            let newProd = { title: "Cam2",price: 100, photo: "photo"}
            const response = await request.post('/').send(newProd)
            expect(response.status).to.eql(200)
            const created = response.body._doc
            id = created._id
            expect(created).to.include.keys('title', 'price', 'photo')
            expect(created.title).to.eql(newProd.title)
            expect(created.price).to.eql(newProd.price)
            expect(created.photo).to.eql(newProd.photo)
            
        })
    })

    describe('GET', () => {
            it('Debe retornar el producto recien creado', async () => {
            const response = await request.get(`/${id}`)
            expect(response.status).to.eql(200)
            expect(response.body).to.include.keys('title', 'price', 'photo')
        })
    })

    describe('PUT', () => {
        it('Debe modificar el producto recien creado', async () => {
            const response = await request.put(`/${id}`).send(modProd)
            expect(response.status).to.eql(200)
            const modified = response.body
            expect(modified).to.eql({ msg: 'Producto Modificado' })
        })
    })

    describe('DELETE', () => {
        it('Debe eliminar el producto recien creado', async () => {
        const response = await request.delete(`/${id}`)
        expect(response.status).to.eql(200)
        expect(response.body).to.eql({ msg: 'Producto eliminado' })
        })
    })
})



