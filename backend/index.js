const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todo");
const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/todo", todoRoutes);

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
});

mongoose.connect('mongodb+srv://bhatnagarsimran1306:4BAqwGkoeI5yf6Mq@cluster1.floblzl.mongodb.net/', { dbName: "courses" });