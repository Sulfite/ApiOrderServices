require('dotenv').config({path: __dirname + '/.env'})
const express = require("express");
const bodyParser = require("body-parser");
const { isNullOrEmpty } = require('./Ultils/Ultils');

const app = express();
const cors = require("cors");
const port = isNullOrEmpty(process.env.PORT_API) ? 3001 : process.env.PORT_API;

// Usos necessarios
app.use(cors("*"));
app.use(bodyParser.json());

// Importação das Rotas
const userRoutes = require("./Routes/userRoutes");
const osRoutes = require("./Routes/osRoutes");
const productRoutes = require("./Routes/productRoutes");
const typeServiceRoutes = require("./Routes/typeServiceRoutes");
const equipamentsRoutes = require("./Routes/equipmentRoutes");
// const phoneRoutes = require("./Routes/phoneRoutes");
const phoneRoutes = require("./Routes/phoneRoutes");
const addressRoutes = require("./Routes/addressRoutes");

// Rotas por modulos
app.use("/", userRoutes);
app.use("/os", osRoutes);
app.use("/equipments", equipamentsRoutes);
app.use("/typeservice", typeServiceRoutes);
app.use("/product", productRoutes);
app.use("/address", addressRoutes);
app.use("/phone", phoneRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})

module.exports = app;