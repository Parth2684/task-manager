const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = 3000;
app.use(cors());
app.use(express.json());
mongoose



app.listen(port, ()=> {
    console.log(`Your server is listening on port${port}`)
})