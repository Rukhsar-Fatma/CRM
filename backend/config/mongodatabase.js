const { MongoClient, ServerApiVersion } = require("mongodb");
const connection = require('./connection');
const client = new MongoClient(connection.mongo_connection.url, {
    useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1
});
client.connect(err => {
    if (err) throw err;
    else {
        console.log("Successfully connected to MongoDB")
    }
});

module.exports = client;