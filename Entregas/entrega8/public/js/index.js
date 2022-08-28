const socket = io().connect();

function render(productos) {
  const contenedorProductos = document.getElementById("productos");
  let html = "";
  if (productos.length > 0) {
    let top = `
        <table class="table table-dark">
        <thead>
          <tr class="m-5">
            <th scope="col">Id</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Icon</th>
          </tr>
        </thead>
        <tbody>`;

    let middle = productos.map((prod) => {
      return `<tr>
            <th scope="row"> ${prod.id} </th>
            <td>${prod.title}</td>
            <td>${prod.price}</td>
            <td><img class="thumbnail" src='${prod.thumbnail}' /></td>
        </tr>`;
    });
    let bottom = `
            </tbody>
        </table>
        `;
    html = top + middle.join("") + bottom;
  } else {
    html = "<h2>No hay productos</h2>";
  }

  contenedorProductos.innerHTML = html;
}

function addProduct(e) {
  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;
  const thumbnail = document.getElementById("thumbnail").value;
  const newProd = { title, price, thumbnail };
  socket.emit("add-product", newProd);
  document.getElementById("title").value = "";
  document.getElementById("price").value = "";
  document.getElementById("thumbnail").value = "";
  return false;
}

function addMessage() {
  const user = document.getElementById("user").value;
  const msg = document.getElementById("msg").value;
  if (user.length <= 3) {
    alert("Debe completar el usuario");
    return false;
  }
  let date = new Date().toLocaleString();
  const newMsg = {
    user,
    date,
    msg,
  };
  document.getElementById("msg").value = "";
  socket.emit("add-message", newMsg);
  return false;
}

function view(messages) {
  let html = [];
  const mens = document.getElementById("mensajes");
  if (messages.length > 0) {
    html = messages
      .map((msg) => {
        return `<strong style="color: blue">${msg.user}</strong><span style="color: brown">[${msg.date}]:</span> <em style="color: green">${msg.msg}</em>`;
      })
      .join("<br>");
  } else {
    html = `<h2>No hay mensajes</h2>`;
  }
  mens.innerHTML = html;
}

socket.on("message-server", (data) => {
  render(data.productos);
  view(data.messages);
});
