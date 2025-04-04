document.getElementById("comentarioForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let nombre = document.getElementById("nombre").value.trim();
  let comentario = document.getElementById("comentario").value.trim();

  if (nombre === "" || comentario === "") {
      alert("Por favor, completa todos los campos.");
      return;
  }

  let data = { nombre, comentario };

  fetch("http://127.0.0.1:5000/guardar_comentario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(() => {
      cargarComentarios();
      document.getElementById("comentarioForm").reset();
  })
  .catch(error => console.error("Error:", error));
});

function cargarComentarios() {
  fetch("http://127.0.0.1:5000/obtener_comentarios")
  .then(response => response.json())
  .then(data => {
      let listaComentarios = document.getElementById("listaComentarios");
      listaComentarios.innerHTML = "";
      data.comentarios.forEach(linea => {
          let li = document.createElement("li");
          li.textContent = linea;
          listaComentarios.appendChild(li);
      });
  })
  .catch(error => console.error("Error al cargar comentarios:", error));
}

// Cargar comentarios al inicio
cargarComentarios();
