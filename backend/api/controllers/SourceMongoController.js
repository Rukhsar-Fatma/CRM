const client = require('../../config/mongodatabase')
const moncoll = require('../models/MongoCollections')
const rules = require('../policies/input.policy')
const { v4: uuidv4 } = require('uuid');

const ValidateInput = require('../policies/inputrules.policy');
const { response } = require('express');

const db = client.db(moncoll.db);
const collection = moncoll.collection;

const SourceMongoController = () => {
  const GetSourceByOrg = async (req, res) => {
    const { body } = req;
    if (await ValidateInput(body, rules.source_get)) {
      try {
        const get_source_by_org = await db.collection(collection.source).find({
          source_org_id: body.org_id
        }).toArray();
        let response = []
        if (get_source_by_org.length === 0) {
          response = {
            statusCode: 406,
            success: true,
            msg: 'No Source Data For This Org',
            response: get_source_by_org
          }
        } else {
          response = {
            statusCode: 200,
            success: true,
            msg: 'Source Fetched Succesfully',
            response: get_source_by_org
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
  const AddSource = async (req, res) => {
    const { body } = req;
    if (await ValidateInput(body, rules.source_add)) {
      try {
        const add_source = await db.collection(collection.source).insertOne({
          _id: uuidv4(),
          source_name: body.source_name,
          source_org_id: body.org_id,
          source_created_on: new Date
        })
        let response = {
          statusCode: 200,
          success: true,
          msg: 'Source Added',
          response: add_source
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
    GetSourceByOrg,
    AddSource
  };
}

module.exports = SourceMongoController;