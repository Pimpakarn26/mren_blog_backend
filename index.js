const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const userRouter = require("./routes/user.router")

const app = express();
const BASE_URL = process.env.BASE_URL;
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

//เชื่อมต่อMongo DB
try {
  mongoose.connect(DB_URL);
  console.log("Connet to Mongo DB Successfuly");
} catch (err) {
  console.log("DB Connection Failed");
}

app.use(cors({ origin: BASE_URL, credentials: true}));
app.use(express.json());
app.get("/",(req, res)=>{
    res.send("<h1>Welcome to SE NPRU Blog Restful API</h1>")
})

//use Router
app.use("/api/v1/auth", userRouter);


app.listen(PORT,()=>{
    console.log("Server is running on http://localhost:" + PORT);
});