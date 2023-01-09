const socket = io().connect();

let boton = document.getElementById("enviar")

function test(){
  alert('prueba')
}

function addMessage() {

  console.log("entro")
  const email = document.getElementById("email").value;
  const message = document.getElementById("msg").value;
  let type = "Usuario"
  if (email == "Sistema"){
      type = "Sistema"
  }
  if (email.length <= 3) {
    alert("Debe completar el usuario");
    return false;
  }
  let datetime = new Date().toLocaleString();
  const newMsg = { email, 
              datetime,
              message,
              type
                 };
  document.getElementById("msg").value = "";
  socket.emit("add-message", newMsg);
  console.log("salio");
  return false;
}

function view(messages) {
  let html = [];
  const mens = document.getElementById("mensajes");
  if (messages.length > 0) {
    html = messages
      .map((msg) => {
        return `<strong style="color: blue">${msg.email}:</span> <em style="color: green">${msg.message}</em>`;
      })
      .join("<br>");
  } else {
    html = `<h2>No hay mensajes</h2>`;
  }
  mens.innerHTML = html;
}

boton.addEventListener('click',addMessage)

socket.on("message-server", (messages) => {
  view(messages);
});
