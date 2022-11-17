function calcular(limite){

let arr = [];
const count = {};

for (let i = 0; i < limite; i++) {
    arr.push(Math.floor(Math.random()*1000))
}

for (const element of arr) {
  if (count[element]) {
    count[element] += 1;
  } else {
    count[element] = 1;
  }
}

return count
}

process.on('message', msg => {
    console.log("entro")
    cuenta = calcular(msg.limite)
    process.send({...cuenta})
})
