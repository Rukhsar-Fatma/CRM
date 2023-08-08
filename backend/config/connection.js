require('dotenv').config()

const mongo_connection = {
  url: process.env.DB_MONGO_URL
}

module.exports = {
  mongo_connection
};
