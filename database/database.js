const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
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
        comments: [],
        favorites: [],
      });

      console.log("Success!");
      return true;
    };

    database.authenticateUser = async (username) => {
      console.log(`Authenticating user ${username}`);
      return await client
        .db(process.env.database)
        .collection("users")
        .findOne({ username: username });
    };

    database.getAllPosts = async () => {
      console.log("Getting all posts");
      return client
        .db(process.env.database)
        .collection("apts")
        .find({})
        .toArray();
    };

    database.getPost = async (apartmentId) => {
      console.log(`Getting post for ${apartmentId}`);
      return client
        .db(process.env.database)
        .collection("apts")
        .findOne({ _id: ObjectId(apartmentId) });
    };

    database.addComment = async (comment) => {
      console.log("Adding comments");
      await client
        .db(process.env.database)
        .collection("apts")
        .updateOne(
          {
            _id: ObjectId(comment.apartmentId),
          },
          {
            $push: { comments: comment },
            $inc: { rating: parseInt(comment.rating) },
          }
        );
      await client
        .db(process.env.database)
        .collection("users")
        .updateOne(
          {
            username: comment.username,
          },
          {
            $push: { comments: comment },
          }
        );
    };

    database.deleteComment = async (comment) => {
      console.log("Deleting comment");
      await client
          .db(process.env.database)
          .collection("apts")
          .updateOne(
              {
                _id: ObjectId(comment.apartmentId),
              },
              {
                $pull: { comments: comment },
                $inc: { rating: -parseInt(comment.rating) },
              }
          );
      await client
          .db(process.env.database)
          .collection("users")
          .updateOne(
              {
                username: comment.username,
              },
              {
                $pull: { comments: comment },
              }
          );
    }

    database.addFavorite = async (apartment, username) => {
        console.log("Adding favorite");
        await client.db(process.env.database).collection("users").updateOne({
            username: username
        }, {
            $push: {favorites: apartment}
        })
    };

      database.deleteFavorite = async (apartment, username) => {
          console.log("Adding favorite");
          await client.db(process.env.database).collection("users").updateOne({
              username: username
          }, {
              $pull: {favorites: apartment}
          })
      }

  });

  return database;
};

module.exports = myDB();
