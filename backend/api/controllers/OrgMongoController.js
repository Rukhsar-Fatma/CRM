const client = require('../../config/mongodatabase')
const moncoll = require('../models/MongoCollections')
const rules = require('../policies/input.policy')
const { v4: uuidv4 } = require('uuid');

const ValidateInput = require('../policies/inputrules.policy');
const { response } = require('express');

const db = client.db(moncoll.db);
const collection = moncoll.collection;

const OrgMongoController = () => {
  const OrgReg = async (req, res) => {
    const { body } = req;
    if (await ValidateInput(body, rules.org_reg)) {
      try {
        const org_res = await db.collection(collection.org).insertOne({
          _id: uuidv4(),
          org_name: body.org_name,
          org_email: body.org_email,
          org_phno: body.org_phno,
          org_country: body.org_country,
          org_pincode: body.org_pincode,
          org_type: body.org_type,
          org_domain: body.org_domain,
          org_created_on: new Date
        })
        const org_admin_res = await db.collection(collection.orgadmin).insertOne({
          _id: uuidv4(),
          org_admin_username: body.org_admin_username,
          org_admin_email: body.org_email,
          org_admin_password: body.org_admin_password,
          org_admin_phone: body.org_phno,
          org_admin_org_id: org_res.insertedId,
          org_admin_created_on: new Date
        })
        const user_res = await db.collection(collection.users).insertOne({
          _id: uuidv4(),
          user_email: body.org_email,
          user_password: body.org_admin_password,
          role: 1,
          role_id: org_admin_res.insertedId,
          user_org_id: org_res.insertedId,
          username: body.org_name,
          user_created_on: new Date
        })
        let response = {
          statusCode: 200,
          success: true,
          msg: 'Org created successfully',
          response: {
            org_id: org_res.insertedId,
            org_admin_id: org_admin_res.insertedId,
            user_id: user_res.insertedId
          }
        }
        return res.status(200).json(response);
      }
      catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }
    } else {
      return res.status(406).json({ msg: 'Input Not Acceptable' });
    }
  };
  return {
    OrgReg
  };
}

module.exports = OrgMongoController;