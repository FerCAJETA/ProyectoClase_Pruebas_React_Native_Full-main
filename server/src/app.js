const express = require('express');
const cors = require('cors');
const config = require('./config');
const clientes = require('./molulos/clientes/rutas');
const usuario = require('./molulos/users/rutas');

const app = express();
app.use(express.json());
app.use(cors());

app.set('port', config.app.port);

// Rutas
app.use('/api/clientes', clientes);
app.use('/api/usuario', usuario);

// Ruta de prueba para verificar que el servidor funciona
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Pokémon Server funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

module.exports = app;
