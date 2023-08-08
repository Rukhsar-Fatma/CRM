const client = require('../../config/mongodatabase')
const moncoll = require('../models/MongoCollections')
const rules = require('../policies/input.policy')
const { v4: uuidv4 } = require('uuid');

const ValidateInput = require('../policies/inputrules.policy');
const { response } = require('express');

const db = client.db(moncoll.db);
const collection = moncoll.collection;

const CommodityMongoController = () => {
  const GetCommodityByOrg = async (req, res) => {
    let { body } = req;
    if (await ValidateInput(body, rules.commodity_get)) {
      try {
        const get_commodity_by_org = await db.collection(collection.commodity).find({
          commodity_org_id: body.org_id
        }).toArray();
        let response = []
        if (get_commodity_by_org.length === 0) {
          response = {
            statusCode: 406,
            success: true,
            msg: 'No Commodity Data For This Org',
            response: get_commodity_by_org
          }
        } else {
          response = {
            statusCode: 200,
            success: true,
            msg: 'Commodity Fetched Succesfully',
            response: get_commodity_by_org
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
  const AddCommodity = async (req, res) => {
    const { body } = req;
    if (await ValidateInput(body, rules.commodity_add)) {
      try {
        const add_commodity = await db.collection(collection.commodity).insertOne({
          _id: uuidv4(),
          commodity_org_id: body.org_id,
          commodity_name: body.commodity_name,
          commodity_desc: body.commodity_desc || '',
          commodity_created_on: new Date
        })
        let response = {
          statusCode: 200,
          success: true,
          msg: 'Commodity Added',
          response: add_commodity
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
  }
  return {
    GetCommodityByOrg,
    AddCommodity
  };
}

module.exports = CommodityMongoController;