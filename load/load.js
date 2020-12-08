// This file loads json from file and pass it to database

const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
require("dotenv").config();

// initialize the database connecting criteria.
const url =
    "mongodb+srv://" +
    process.env.username +
    ":" +
    process.env.password +
    "@testdb.qzr4t.mongodb.net/" +
    process.env.database +
    "?retryWrites=true&w=majority";

// The second argument in MongoClient is an object for not getting the deprecation warnings from MongoDB
const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

console.log("Start Loading data");

fs.readFile('./apts.json', (err, data) => {
    if (err) {
        console.log("error");
        throw err;
    }
    console.log("Data Loaded!");
    let apts = JSON.parse(data);
    void client.connect(err => {
        if (err) throw err;
        client.db(process.env.database).collection("apts").insertMany(apts).then(result => {
            console.log("Data Added to Database")
        }, err => console.log(err));
    });


});


