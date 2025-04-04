document.getElementById("comentarioForm").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const nombre = document.getElementById("nombre").value;
  const comentario = document.getElementById("comentario").value;

  fetch("/guardar_comentario", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ nombre, comentario })
  })
  .then(res => res.text())
  .then(() => {
    document.getElementById("comentarioForm").reset();
    cargarComentarios();
  });
});

function cargarComentarios() {
  fetch("/obtener_comentarios")
    .then(res => res.json())
    .then(data => {
      const lista = document.getElementById("listaComentarios");
      lista.innerHTML = "";
      data.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.nombre}: ${item.comentario}`;
        lista.appendChild(li);
      });
    });
}

// Cargar los comentarios al inicio
cargarComentarios();
