const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/user");

//Settings
const app = express();
const port = process.env.PORT || 3000;

//Middlewares
app.use(express.json());
app.use('/api/', userRoutes);

//Routes
app.get("/", (req, res) => {
    res.send("Welcome")
});

//mongodb connection
const mongoURI = process.env.MONGO_URI;

//Mongod connection 
// Cambia tu bloque de conexión por este:
mongoose
  .connect(mongoURI, {
    family: 4,               // Fuerza el uso de IPv4 (evita errores de red)
    serverSelectionTimeoutMS: 5000, // No se queda esperando eternamente
    autoIndex: true          // Ayuda a la estructura de tus modelos
  })
  .then(() => console.log("✅ ¡POR FIN! Conexión exitosa a MongoDB Atlas"))
  .catch((error) => {
    console.log("❌ Error de conexión detallado:");
    console.error(error.message);
  });

//Server Listening
app.listen(port, () => console.log("Server listening to", port))