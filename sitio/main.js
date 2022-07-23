let obj = {};

const agregar = (nro) => {
  if (typeof obj[nro] === "undefined") {
    obj[nro] = 1;
  } else {
    obj[nro] = obj[nro] + 1;
  }
};

for (let index = 0; index < 999; index++) {
  let element = Math.ceil(Math.random() * 20);
  agregar(element);
}

console.log(obj);

const productos = [
  { id: 1, nombre: "Escuadra", precio: 323.45 },
  { id: 2, nombre: "Calculadora", precio: 234.56 },
  { id: 3, nombre: "Globo Terráqueo", precio: 45.67 },
  { id: 4, nombre: "Paleta Pintura", precio: 456.78 },
   { id: 5, nombre: "Reloj", precio: 67.89 },
  { id: 6, nombre: "Agenda", precio: 78.9 },
];
