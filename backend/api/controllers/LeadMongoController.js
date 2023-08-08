const client = require('../../config/mongodatabase')
const moncoll = require('../models/MongoCollections')
const rules = require('../policies/input.policy')
const { v4: uuidv4 } = require('uuid');

const ValidateInput = require('../policies/inputrules.policy');
const { response } = require('express');

const db = client.db(moncoll.db);
const collection = moncoll.collection;

const LeadMongoController = () => {
  const GetLead = async (req, res) => {
    const { body } = req;
    if (await ValidateInput(body, rules.leads_get)) {
      try {
        if (body.role && body.role == 1) {
          const get_leads = await db.collection(collection.leads).aggregate([
            {
              $lookup: {
                from: "commodity",
                localField: "lead_commodity_id",
                foreignField: "_id",
                as: "commodity"
              }
            },
            {
              $addFields: {
                commodity_name: { $arrayElemAt: ["$commodity.commodity_name", 0] }
              }
            },
            {
              $project: {
                lead_commodity_id: 0,
                commodity: 0
              }
            },
            {
              $match: {
                lead_org_id: body.org_id
              }
            }
          ]).toArray();
          let response = {
            statusCode: 200,
            success: true,
            msg: 'Leads Fetched Succesfully',
            response: get_leads
          }
          return res.status(200).json(response);
        } else if (body.role && body.role == 2) {
          const get_leads = await db.collection(collection.leads).aggregate([
            {
              $lookup: {
                from: "commodity",
                localField: "lead_commodity_id",
                foreignField: "_id",
                as: "commodity"
              }
            },
            {
              $addFields: {
                commodity_name: { $arrayElemAt: ["$commodity.commodity_name", 0] }
              }
            },
            {
              $project: {
                lead_commodity_id: 0,
                commodity: 0
              }
            },
            {
              $match: {
                lead_org_id: body.org_id,
                lead_agent_id: body.role_id
              }
            }
          ]).toArray();
          let response = {
            statusCode: 200,
            success: true,
            msg: 'Leads Fetched Succesfully',
            response: get_leads
          }
          return res.status(200).json(response);
        } else {
          let response = {
            statusCode: 401,
            success: false,
            msg: 'Leads Fetched unsccesful',
            response: []
          }
          return res.status(400).json(response);
        }
      }
      catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }
    } else {
      return res.status(406).json({ msg: 'Input Not Acceptable' });
    }
  };
  const AddLead = async (req, res) => {
    const { body } = req;
    if (await ValidateInput(body, rules.leads_add)) {
      try {
        const add_leads = await db.collection(collection.leads).insertOne({
          _id: uuidv4(),
          lead_name: body.lead_name,
          lead_company: body.lead_company,
          lead_email: body.lead_email,
          lead_contact: body.lead_contact,
          lead_org_id: body.org_id,
          lead_agent_id: body.lead_agent_id,
          lead_created_by: body.role_id,
          lead_source_id: body.lead_source_id,
          lead_commodity_id: body.lead_commodity_id
        });
        let response = {
          statusCode: 200,
          success: true,
          msg: 'Lead Insterted Succesfully',
          response: add_leads
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
    GetLead,
    AddLead
  };
}

module.exports = LeadMongoController;