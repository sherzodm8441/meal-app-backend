const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("./routes/user");
const authRouter = require("./routes/auth");

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(()=> {
    console.log("DB connected");
}).catch((error) => {
    console.log(error)
})

app.use(express.json());

app.use("/api", router);
app.use("/api/auth", authRouter);

app.listen(3001, () => {
    console.log("Listening on PORT 3001");
})