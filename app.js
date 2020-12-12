const express = require('express');
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const mainRouter = require("./router/mainRouter");
const commentRouter = require("./router/commentRouter");
const userRouter = require("./router/userRouter");
const database = require("./database/database");
const utils = require("./router/utils");
const initializePassport = require("./passport-config");

const app = express();
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(express.static(__dirname + "/react/build"));
app.use(bodyParser.json());
app.use(
    session({
        secret: process.env.secret,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());
// app.get("/", (req, res) => {
//     console.log("sending react homepage");
//     res.sendFile(__dirname + "/react/build/index.html");
// });

app.get("/", (req, res) => {
   res.send("Hello")
});

initializePassport(passport, database);
mainRouter(app, passport, utils, database);
commentRouter(app, utils, database);
userRouter(app, utils, database);

//listen to a specific port.
app.listen(process.env.PORT || 5000, () => {
    console.log(`Start listening for the port ${process.env.PORT}`);
});