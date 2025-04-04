document.getElementById('comentarioForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const nombre = document.getElementById('nombre').value.trim();
    const comentario = document.getElementById('comentario').value.trim();
  
    if (nombre && comentario) {
      const lista = document.getElementById('listaComentarios');
  
      const nuevoComentario = document.createElement('li');
      nuevoComentario.innerHTML = `<strong>${nombre}:</strong> ${comentario}`;
      
      lista.appendChild(nuevoComentario);
  
      // Limpiar el formulario
      document.getElementById('comentarioForm').reset();
    }
  });
  