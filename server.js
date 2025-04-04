const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('public')); // sirve index.html y script.js
app.use(express.json()); // para leer JSON del body

app.post('/guardar', (req, res) => {
  const { nombre, comentario } = req.body;

  if (nombre && comentario) {
    const entrada = `${nombre}: ${comentario}\n`;

    fs.appendFile('base.txt', entrada, err => {
      if (err) {
        console.error('Error al guardar comentario:', err);
        res.status(500).send('Error');
      } else {
        res.status(200).send('Guardado');
      }
    });
  } else {
    res.status(400).send('Datos incompletos');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
