const fs = require('fs');
class Contenedor {
    constructor(ruta){
        this.ruta = ruta;
    }

    async save(obj){

        try {
            let data = await fs.promises.readFile(this.ruta, 'utf-8');
            let dataParse = JSON.parse(data);
            let id = 1;
            if(dataParse.length){
                let ids = dataParse.map(prod => { return prod.id})
                id = Math.max(...ids) + 1;
            }
            if (dataParse.length) {
                await fs.promises.writeFile(this.ruta,JSON.stringify([...dataParse, {...obj, id: id}], null, 2));
            } else {
                await fs.promises.writeFile(this.ruta,JSON.stringify([{...obj, id: id}], null, 2));
            }
            return id;
        } catch (error) {
            console.log('error', error)    
        }
    }

    async getById(id){
        try {
            let data = await fs.promises.readFile(this.ruta, 'utf-8');
            let dataParse = JSON.parse(data);
            let producto = dataParse.find(producto => producto.id === id);
            if (producto) {
                return producto;
            } else {
                return null;
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    async getAll(){
        try {
            let data = await fs.promises.readFile(this.ruta, 'utf-8');
            let dataParse = JSON.parse(data);
            return dataParse;
        } catch (error) {
            console.log('error', error)
        }
    }

    async deleteById(id){
        try {
            let data = await fs.promises.readFile(this.ruta, 'utf-8');
            let dataParse = JSON.parse(data);
            let producto = dataParse.find(producto => producto.id === id);
            if (producto) {
                let filtrado = dataParse.filter(producto => producto.id !== id);
                await fs.promises.writeFile(this.ruta, JSON.stringify(filtrado, null, 2));
                console.log("Eliminado");
            } else {
                console.log("El producto no existe")
            }
            
        } catch (error) {
            
        }

    }

    async deleteAll(){
        try {
            await fs.promises.writeFile(this.ruta, JSON.stringify([]))
        } catch (error) {
            
        }
    }
    
}

module.exports = Contenedor