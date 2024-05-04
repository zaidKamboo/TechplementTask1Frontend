// PafALaCys2nmDg3t
// mongodb+srv://zaidkamboo100:PafALaCys2nmDg3t@cluster0.ykwydkw.mongodb.net/
const express = require("express");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connecting to DB
mongoose
    .connect(
        "mongodb+srv://zaidkamboo100:PafALaCys2nmDg3t@cluster0.ykwydkw.mongodb.net/"
    )
    .then(() => console.log("Connected to Db successfully."))
    .catch((err) => console.log("ERROR ", err?.message));

// ALL Routes
app.use("/quotes", require("./routes/quotesRoutes"));

app.listen(3000, () => {
    console.log("Server listening on port 3K.");
});
