import express from "express";
const app = express();
import mongoose from "mongoose";
const port = 3000;
import authRoutes from "./routes/auth";
import todoRoutes from "./routes/todo";
import cors from "cors";

app.use(cors());

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/todo", todoRoutes);

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
});

const mongooseOptions: mongoose.ConnectOptions = {
    dbName: "courses",
    family: undefined,
    hints: undefined,
    localAddress: undefined,
    localPort: undefined,
    lookup: undefined
}

mongoose.connect('mongodb+srv://bhatnagarsimran1306:4BAqwGkoeI5yf6Mq@cluster1.floblzl.mongodb.net/', mongooseOptions);