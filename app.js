const express = require('express');

const app = express();

app.get("/", (req, res) => {
    console.log("sending react homepage");
    res.sendFile(__dirname + "/react/build/index.html");
});

//listen to a specific port.
app.listen(process.env.PORT || 5000, () => {
    console.log(`Start listening for the port ${process.env.PORT}`);
});