const dotenv = require('dotenv').config();
const express = require('express')
const { Router } = express;

const {productosDao, carritoDao} = require('./utils/daos/index.js');


const app = express();
const routerProductos = Router();
const routerCarrito = Router();

const administrador = true;

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.set("view engine", "ejs");
app.set("views", "./views");
app.use('/static', express.static(__dirname + 'public'));



/********************************* Router Productos*********************************/

routerProductos.get('/', async (req, res) => {
    try {
    const productos = await productosDao.getAll();
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
            const newProd = await productosDao.save(body);
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
    const productos = [await productosDao.getById(id)];
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
            let update = await productosDao.getByIdAndUpdate(id,body);
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
        const prod = await productosDao.deleteById(id);
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
        let id = await carritoDao.newCart();
        res.send({id});
        } catch (error) {
            console.log('error', error);
        }
});

routerCarrito.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        await carritoDao.deleteById(id);
        res.send({"msg":`El carrito con id: ${id} fue eliminado.`})
        } catch (error) {
            console.log('error', error);
        }
});

routerCarrito.get('/:id/productos', async (req, res) => {
    const {id} = req.params;
    try {
        let cart = await carritoDao.getById(id)
        res.send(cart.productos)
    } catch (error) {
        console.log('error', error);
    }
});

routerCarrito.post('/:id/productos', async (req, res) => {
    const {id} = req.params;
    const body = req.body;
    try {
        let newProd = await productosDao.getById(body.id_prod);
        let carts = await carritoDao.getById(id);
        carts.productos.push(newProd);
        let update = await carritoDao.getByIdAndUpdate(id,carts.productos)
        res.send({"msg": "Producto agregado."})
    } catch (error) {
        console.log('error', error);
    }
});

routerCarrito.delete('/:id/productos/:id_prod', async (req, res) => {
    const {id,id_prod} = req.params;
    try {
        let cart = await carritoDao.getById(id);
        let filter = cart.productos.filter((c) => c.id !== Number(id_prod))
        await carritoDao.getByIdAndUpdate(id, filter);
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
    
    return res.status(500).send('Something broke!');
  })


PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Escuchando el puerto ${PORT}`);
});



