// server.js

const express = require("express");
const path = require("path");

const app = express();

// Serve Static Files
app.use(express.static(path.join(__dirname, "public")));

// Route
app.get("/", (req, res) => {

    res.sendFile(path.join(__dirname, "public", "index.html"));

});

// Port
const PORT = 3000;

app.listen(PORT, () => {

    console.log(`Server Running on Port ${PORT}`);

});