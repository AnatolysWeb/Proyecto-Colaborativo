const express = require('express');
const fs = require('fs');
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('.')); // sirve archivos HTML, CSS, JS

app.post('/comentario', (req, res) => {
  const { nombre, comentario } = req.body;
  const linea = `${nombre}: ${comentario}\n`;

  fs.appendFile('base.txt', linea, (err) => {
    if (err) {
      console.error('Error al guardar comentario:', err);
      return res.status(500).send('Error interno del servidor');
    }
    res.send('Comentario guardado');
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
