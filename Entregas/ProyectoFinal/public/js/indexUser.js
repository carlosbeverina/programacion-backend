const socket = io().connect();

let user = document.getElementById("user").innerText
console.log(user)


function view(messages) {
  let html = [];
  const mens = document.getElementById("mensajes");
  if (messages.length > 0) {
    let msgs = messages.filter(msg => msg.email == user)
    html = msgs
      .map((msg) => {
        return `<strong style="color: blue">${msg.email}:</span> <em style="color: green">${msg.message}</em>`;
      })
      .join("<br>");
  } else {
    html = `<h2>No hay mensajes</h2>`;
  }
  mens.innerHTML = html;
}

socket.on("message-server", (messages) => {
  view(messages);
});
