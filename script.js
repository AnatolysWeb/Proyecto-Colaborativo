document.getElementById('comentarioForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const comentario = document.getElementById('comentario').value.trim();

  if (nombre && comentario) {
    const data = { nombre, comentario };

    // Enviar al servidor
    await fetch('/guardar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    // Mostrar en pantalla (opcional)
    const lista = document.getElementById('listaComentarios');
    const nuevoComentario = document.createElement('li');
    nuevoComentario.innerHTML = `<strong>${nombre}:</strong> ${comentario}`;
    lista.appendChild(nuevoComentario);

    document.getElementById('comentarioForm').reset();
  }
});
