class Usuario {
  constructor(nombre, apellido) {
    (this.nombre = nombre),
      (this.apellido = apellido),
      (this.libros = []),
      (this.mascotas = []);
  }

  getFullname() {
    return `${this.nombre} ${this.apellido}`;
  }

  addMascota(mascota) {
    this.mascotas.push(mascota);
  }

  countMascotas() {
    return this.mascotas.length;
  }

  addBook(titulo, autor) {
    this.libros.push({ nombre: titulo, autor: autor });
  }

  getBookNames() {
    let titulos = [];
    this.libros.map((libro) => {
      titulos.push(libro.nombre);
    });
    return titulos;
  }
}

let usuario = new Usuario("Carlos", "Beverina");

console.log(usuario.getFullname());

usuario.addMascota('Lila');
usuario.addMascota('Cake');

console.log(usuario.mascotas);

console.log('La cantidad de mascotas del usuario es:', usuario.countMascotas());

usuario.addBook("El Padrino", "Mario Puzo");
usuario.addBook("El Tunel", "Ernesto Sabato");

console.log(usuario.getBookNames());
