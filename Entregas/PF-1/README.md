# Explicación de las rutas

Para poder mostrar la forma de acceso a cada uno de los puntos voy a referenciar a cada uno de los puntos de la consigna del entregable.

[Link a PPT de entrega](https://docs.google.com/presentation/d/1x5MLSePkhqnYUm9Z6LTR1AbSYeW0Fven2B1HaHeA6Zw/preview?slide=id.gfd86d9d198_0_53PP)

**La constante administrador se encuentra en la linea 13 del server.js**

### Router base /api/productos

1.a. Se debe ingresar al navegador con la ruta http://localhost:8080/api/productos y esto trae todos los productos si en cambio se accede a la ruta http://localhost:8080/api/productos/1 muestra un solo producto por su ID.

1.b. Para cargar productos se debe acceder a la ruta http://localhost:8080/api/productos/carga esto llama al formulario que hace el post en la ruta http://localhost:8080/api/productos y sube el nuevo producto. Si se quiere usar con postman podes pasar todos los datos del producto como un objeto en el body.

1.c. Para modificar un producto se puede pasar con postman un PUT a la ruta http://localhost:8080/api/productos/:id donde el id es el del producto que queres modificar y en el body se pasa un objeto con todos los campos completos con la nueva info. No hay interfaz grafica para esto.

1.d. Para borrar un producto se pasa un DELETE a la ruta a la ruta http://localhost:8080/api/productos/:id donde el id es el del producto que queres eliminar.

### Router base /api/carrito

Esta sección no hay ninguna interfaz grafica.

2.a. Para crear un carrito se pasa un POST con postman a la ruta http://localhost:8080/api/carrito y devuelve el id del carrito.

2.b. Para borrar un carrito se pasa un DELETE con postman a la ruta http://localhost:8080/api/carrito/:id donde id es el carrito que queres borrar.

2.c. Para ver los productos guardados en un carrito se envia un GET con postman a la ruta http://localhost:8080/api/carrito/:id/productos donde id es el id del carrito que se quiere visualizar

2.d. Para agregar un producto al carrito se envia un POST con postman a la ruta http://localhost:8080/api/carrito/:id y en el body se pasa la variable id_prod que es el id del producto que se quiere agregar.

2.e. Para borrar un producto de un carrito se pasa un DELETE a la ruta http://localhost:8080/api/carrito/:id/productos/id_prod donde id es el id del carrito y id_prod es el id del producto que se quiere borrar.

