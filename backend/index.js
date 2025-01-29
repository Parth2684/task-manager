require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { adminRouter } = require("./routes/adminRoutes");
const { errorHandlerMiddleware } = require("./middlewares/error");
const port = 3000;

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Connected To Database")
    })
    .catch((err) => {
        console.log("Error connecting to database", err)
    })

app.use(cors());
app.use(express.json());
app.use(errorHandlerMiddleware)


app.use("/api/v1/admin", adminRouter)


app.listen(port, ()=> {
    console.log(`Your server is listening on port${port}`)
})