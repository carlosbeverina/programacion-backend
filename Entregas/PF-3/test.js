fetch = require('node-fetch')

let id = 0
const add = async () => {
    id = await fetch('http://localhost:8080/carrito', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const myJson = await id.json(); //extract JSON from the http response
  console.log(myJson.id)
}

add()

