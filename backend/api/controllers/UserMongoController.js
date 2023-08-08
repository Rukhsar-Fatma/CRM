const client = require('../../config/mongodatabase')
const moncoll = require('../models/MongoCollections')
const rules = require('../policies/input.policy')
const authService = require('../services/auth.service');

const ValidateInput = require('../policies/inputrules.policy')

const db = client.db(moncoll.db);
const collection = moncoll.collection;

const UserMongoController = () => {
  const login = async (req, res) => {
    const { body } = req;
    if (await ValidateInput(body, rules.user_login)) {
      try {
        const user_res = await db.collection(collection.users).aggregate([{
          $match: {
            user_email: body.email,
            user_password: body.password
          }
        }, {
          $lookup: {
            from: "org",
            localField: "user_org_id",
            foreignField: "_id",
            as: "org_details"
          }
        }, {
          $project: {
            _id: 1,
            role: 1,
            role_id: 1,
            user_email: 1,
            user_org_id: 1,
            username: 1,
            user_org_domain: { $arrayElemAt: ["$org_details.org_domain", 0] }
          }
        }]).toArray()
        const token = authService().issue(user_res[0]);
        user_res[0].authtoken = token;
        let response = {};
        if (user_res.length != 0) {
          response = {
            statusCode: 200,
            success: true,
            msg: 'Login successful',
            response: user_res
          }
        } else {
          response = {
            statusCode: 401,
            success: false,
            msg: 'Login unsuccessful',
            response: []
          }
        }
        return res.status(response.statusCode).json(response);
      }
      catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }
    } else {
      return res.status(401).json({ msg: 'Input Not Acceptable' });
    }
  };
  return {
    login
  };
}

module.exports = UserMongoController;