const dotenv = require('dotenv').config();
const express = require('express')
const { Router } = express;
const Contenedor = require('./utils/contenedor');
const Carrito = require('./utils/carrito.js')
const bodyParser = require('body-parser');

const app = express();
const routerProductos = Router();
const routerCarrito = Router();
const contenedor = new Contenedor('./productos.txt');
const carrito = new Carrito('./carrito.txt');
const administrador = true;

app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "./views");
app.use('/static', express.static(__dirname + 'public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/********************************* Router Productos*********************************/

routerProductos.get('/', async (req, res) => {
    try {
    const productos = await contenedor.getAll();
    res.render('productos', {productos, administrador});
    }
    catch(error) {
        console.log('error', error);
    }
});

routerProductos.post('/', async (req, res) => {
    try {
        if (administrador) {
            const body = req.body;
            const newProd = await contenedor.save(body);
            res.send(newProd);
        } else {
            res.send({error : -1, descripcion: "ruta '/' método 'POST' no autorizada"});
        }
   
    } catch (error) {
        res.json({ error : 'Fallo' });
    }

})

routerProductos.get('/carga/', async (req, res) => {
    try {
        if (administrador) {
            res.render('carga');
        } else {
            res.send({error : -1, descripcion: "ruta '/carga' método 'GET' no autorizada"}); 
        }
        }
        catch(error) {
        console.log(error);
        }
})

routerProductos.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
    const productos = [await contenedor.getById(Number(id))];
    res.render('productos', {productos,administrador});
    }
    catch(error) {
    res.json({ error : 'producto no encontrado' });
    }
});

routerProductos.put('/:id', async (req, res) => {
    const {id} = req.params;
    const body = req.body;
    try {
        if (administrador) {
            listado = await contenedor.getAll();
            listado.map((prod) => {
                if (prod.id == id) {
                    prod.title = body.title;
                    prod.desc = body.desc;
                    prod.thumbnail = body.thumbnail;
                    prod.price = body.price;
                    prod.stock = body.stock;
                    prod.code = body.code;
                    prod.timestamp = Date.now();
                }
            contenedor.overWrite(listado);
            });
            res.send("Producto Actualizado");
        } else {
            res.send({error : -1, descripcion: "ruta '/' método 'PUT' no autorizada"}); 
        }
    }
    catch(error) {
    res.json({ error : 'producto no encontrado' });
    }
});

routerProductos.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
    if (administrador) {
        const prod = await contenedor.deleteById(Number(id));
        res.json("Producto Eliminado");
    } else {
        res.send({error : -1, descripcion: "ruta '/' método 'DELETE' no autorizada"}); 
    }
    }
    catch(error) {
    res.json({ error : 'producto no encontrado' });
    }
});


/**************************************************************************/

/********************************* Router Carrito*********************************/
routerCarrito.post('/', async (req, res) => {
        try {
        let id = await carrito.newCart();
        res.send({id});
        } catch (error) {
            console.log('error', error);
        }
});

routerCarrito.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        await carrito.deleteById(id);
        res.send({"msg":`El carrito con id: ${id} fue eliminado.`})
        } catch (error) {
            console.log('error', error);
        }
});

routerCarrito.get('/:id/productos', async (req, res) => {
    const {id} = req.params;
    try {
        let cart = await carrito.getById(id)
        res.send(cart.productos)
    } catch (error) {
        console.log('error', error);
    }
});

routerCarrito.post('/:id/productos', async (req, res) => {
    const {id} = req.params;
    const body = req.body;
    try {
        let newProd = await contenedor.getById(body.id_prod);
        let carts = await carrito.getAll();
        carts.map((cart) => {
            if (cart.idCart === Number(id)){
                cart.productos.push(newProd);
            }
        });
        await carrito.overWrite(carts);
        res.send({"msg": "Producto agregado."})
    } catch (error) {
        console.log('error', error);
    }
});

routerCarrito.delete('/:id/productos/:id_prod', async (req, res) => {
    const {id,id_prod} = req.params;
    try {
        let carts = await carrito.getAll();
        carts.map((cart) => {
            if (cart.idCart === Number(id)){
                let filter = cart.productos.filter((c) => c.id !== Number(id_prod))
                cart.productos = filter;
            }
        });
        await carrito.overWrite(carts);
        res.send({"msg": "Producto eliminado."})
    } catch (error) {
        console.log('error', error);
    }
});
/**************************************************************************/
app.use('/api/productos', routerProductos);

app.use('/api/carrito', routerCarrito);

app.get('*', (req,res) => {
    res.send({ "error" : -2, "descripcion": `ruta ${req.path} método ${req.method} no implementada`})
})

app.use(function(err, req, res, next) {
    console.error("hola");
    return res.status(500).send('Something broke!');
  })


PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Escuchando el puerto ${PORT}`);
});



