const axios = require('axios');
const { productosDao } = require('./utils/daos/index');
let resp = ""


const pruebas = async () => { 
// const add = await axios.post('http://localhost:8080/productos-test/add',
//     {
//         "title": "Cam2",
//         "price": 100,
//         "photo": "photo"
//     }).then(res => console.log(res))

let id = await axios.get('http://localhost:8080/productos-test/ids')
console.log(id.data)

await axios.get(`http://localhost:8080/productos-test/${id.data}`)
.then(res => console.log(res.data))

await axios.put(`http://localhost:8080/productos-test/add/${id.data}`, 
{
      "title": "AAAAAA",
      "price": 9999,
      "photo": "BBBBB"
}
).then(res => console.log(res.data))

await axios.delete(`http://localhost:8080/productos-test/${id.data}`)
.then(res => console.log(res.data))



}

pruebas();

