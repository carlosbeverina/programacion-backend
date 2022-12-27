import { Application, send } from "./deps.ts";
import { Router } from "./deps.ts";

const PORT = 8080
const app = new Application();
const router = new Router()

let colors = ["white"]


router.get('/', (ctx) => {
    ctx.response.headers.set("Content-Type", "text/html")
    let start = `<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <form action="http://localhost:8080/" method="post">
            <input type="text" placeholder="Color" name="color">
            <input type="submit" value="Enviar">
        </form>
    <ul>
        `
    
    let middle = ""
    colors.forEach(color => {
        middle += `<li style="color: ${color}; background-color: black">${color}</li>`
    });
    let end = `</ul>
    </body>
    </html>`

    const text = start + ' ' + middle + ' ' + end
    
    ctx.response.body = text
})


router.post('/', async (ctx) =>{
    const body = await ctx.request.body();
    const user = await body.value
    colors.push(user.get('color'))
    ctx.response.redirect('/')
    
})

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Escuchando en el puerto ${PORT}`)
await app.listen({ port: Number(PORT) })