const express = require('express');
const route = require('routers')
const mongoose = require("mongoose");
const path = require('path');
const router = require("./src/routes")
const cors = require("cors");
require("dotenv").config();
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

const app = express();

app.use(express.json());
app.set("json spaces", 2);
app.use(router)
app.use(express.static("public"));

////////////////////////////////////////////

app.options('*', cors());
app.use(cors());

/////////////////////////////////////////////////////

app.get('/favicon.ico', (req, res) => {
    // Devuelve una respuesta vacía o un ícono de favicon predefinido
});

//todas las rutas con el prefijo /api
app.use("/api", require("./src/routes"));

app.get('/', (req, res) => {
    res.send('Hello World!');
});
// console.log(process.env.URL);
mongoose.connect(process.env.URL)
    .then(() => {
        console.log("🟢 DB Connected");
        app.listen({ port: process.env.PORT }, () => {
            console.log(`🚗 Server running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("🔴 There was an error on the DB connection method.");
        console.log(err);
    });
