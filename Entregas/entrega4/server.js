const express = require('express')
const { Router } = express;
const Contenedor = require('./contenedor');
const bodyParser = require('body-parser');

const app = express();
const routerProductos = Router();
const contenedor = new Contenedor('./productos.txt');


app.use(express.json());
app.use('/static', express.static(__dirname + 'public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/********************************* Router *********************************/

routerProductos.get('/', async (req, res) => {
    try {
    const prod = await contenedor.getAll();
    res.json(prod);
    }
    catch(error) {
        console.log('error', error);
    }
});

routerProductos.post('/', async (req, res) => {
    try {
        const body = req.body;
        const newProd = await contenedor.save(body);
        res.send(newProd);
        
    } catch (error) {
        res.json({ error : 'Fallo' });
    }

})

routerProductos.get('/carga/', async (req, res) => {
    try {
        res.sendFile(__dirname + '/public/index.html')
        }
        catch(error) {
        console.log(error);
        }
})

routerProductos.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
    const prod = await contenedor.getById(Number(id));
    res.json(prod);
    }
    catch(error) {
    res.json({ error : 'producto no encontrado' });
    }
});

routerProductos.put('/:id', async (req, res) => {
    const {id} = req.params;
    const body = req.body;
    console.log(body);
    console.log(id);
    try {
        listado = await contenedor.getAll();
        listado.map((prod) => {
            if (prod.id == id) {
                prod.title = body.title;
                prod.price = body.price;
                prod.thumbnail = body.thumbnail;
            }
        contenedor.overWrite(listado);
        });
    res.send("Producto Actualizado");
    }
    catch(error) {
    res.json({ error : 'producto no encontrado' });
    }
});

routerProductos.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
    const prod = await contenedor.deleteById(Number(id));
    res.json("Producto Eliminado");
    }
    catch(error) {
    res.json({ error : 'producto no encontrado' });
    }
});


/**************************************************************************/

app.use('/api/productos', routerProductos)

app.use( (err, req, res, next) => {
    console.error(err.stack);
    res.send({err});
  })


PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Escuchando el puerto ${PORT}`);
});



