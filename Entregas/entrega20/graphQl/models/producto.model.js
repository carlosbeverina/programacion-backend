class Producto {
    constructor(id, { title, price, photo }) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.photo = photo;
    }
}

module.exports = { Producto }