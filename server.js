// server.js
const express = require('express');
const router = require('./routes');
const app = express();
const PORT = 9000;

app.use(express.json()); // Middleware untuk meng-handle body JSON
app.use(router); // Menyertakan semua route dari file routes.js

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
