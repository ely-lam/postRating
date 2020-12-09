const express = require('express');

const app = express();
const bodyParser = require("body-parser");
const mainRouter = require("./router/mainRouter");
const database = require("./database/database");

app.use(express.static(__dirname + "/react/build"));
app.use(bodyParser.json());

// app.get("/", (req, res) => {
//     console.log("sending react homepage");
//     res.sendFile(__dirname + "/react/build/index.html");
// });

app.get("/", (req, res) => {
   res.send("Hello")
});

mainRouter(app, null, null, database);

//listen to a specific port.
app.listen(process.env.PORT || 5000, () => {
    console.log(`Start listening for the port ${process.env.PORT}`);
});