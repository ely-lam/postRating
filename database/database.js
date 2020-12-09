const MongoClient = require("mongodb").MongoClient;
const encrypt = require("bcrypt");
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

const myDB = () => {
  const database = {};

  void client.connect((err) => {
    if (err) throw err;

    database.createUser = async (data) => {
      if (!data) {
        return false;
      }

      const user = await client
        .db(process.env.database)
        .collection("users")
        .findOne({
          username: data.username,
        });

      if (user) {
          console.log("User already exists!");
        return false;
      }

      const hashedPassword = await encrypt.hash(data.password, 10);
      client.db(process.env.database).collection("users").insertOne({
        username: data.username,
        password: hashedPassword,
      });

      console.log("Success!");
      return true;
    };
  });

  return database;
};

module.exports = myDB();
