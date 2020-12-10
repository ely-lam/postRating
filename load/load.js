// This file loads json from file and pass it to database

const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const Double = require("mongodb").Double;
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
    let newData = [];
    // Add more informations, such as comments
    for (let apt of apts) {
        let newApts = {
            images: apt.images,
            url: apt.url,
            title: apt['result-title'],
            price: apt['result-price'] && parseInt(apt['result-price'].replace(/\D/g,'')),
            housing: apt['housing'] && apt['housing'].split('-')[0] && parseInt((apt['housing'].split('-')[0]).replace(/\D/g,'')),
            area: apt['housing'] && apt['housing'].split('-')[1] && (apt['housing'].split('-')[1].replace(/\D/g,'').length === 0 ? null
                : parseInt(apt['housing'].split('-')[1].replace(/\D/g,''))),
            hood: apt['result-hood'],
            tags: apt['result-tags'],
            date: apt['result-date'], // convert to time?
            body: apt.postingbody,
            titleTextOnly: apt.titletextonly,
            address: apt.mapaddress,
            comments: [],
            rating: Double(0)
        };
        newData.push(newApts);
    }
    void client.connect(err => {
        if (err) throw err;
        client.db(process.env.database).collection("apts").insertMany(newData).then(result => {
            console.log("Data Added to Database");
        }, err => console.log(err));
    });

});


