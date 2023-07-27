const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.set("json spaces", 2);
app.use(cors());
app.use(express.static("public"));

//todas las rutas con el prefijo /api
app.use("/api", require("./src/routes"));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

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
