const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta raíz - sirve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Guardar comentario
app.post('/guardar_comentario', (req, res) => {
  const { nombre, comentario } = req.body;

  if (!nombre || !comentario) {
    return res.status(400).send('Faltan datos');
  }

  const linea = `${nombre}: ${comentario}\n`;

  // ✅ Agregar (no reemplazar)
  fs.appendFile('base.txt', linea, (err) => {
    if (err) return res.status(500).send('Error al guardar comentario.');
    res.send('Comentario guardado.');
  });
});

// Obtener comentarios
app.get('/obtener_comentarios', (req, res) => {
  fs.readFile('base.txt', 'utf8', (err, data) => {
    if (err) return res.json([]); // No cortar la app si no existe aún

    const comentarios = data.trim().split('\n').map(linea => {
      const [nombre, comentario] = linea.split(':');
      return {
        nombre: nombre?.trim() || '',
        comentario: comentario?.trim() || ''
      };
    });

    res.json(comentarios);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
