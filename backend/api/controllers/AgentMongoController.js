const client = require('../../config/mongodatabase')
const moncoll = require('../models/MongoCollections')
const rules = require('../policies/input.policy')
const { v4: uuidv4 } = require('uuid');

const ValidateInput = require('../policies/inputrules.policy');
const { response } = require('express');

const db = client.db(moncoll.db);
const collection = moncoll.collection;

const AgentMongoController = () => {
  const AddAgent = async (req, res) => {
    const { body } = req;
    if (await ValidateInput(body, rules.agent_add)) {
      try {
        const add_agent = await db.collection(collection.agent).insertOne({
          _id: uuidv4(),
          agent_username: body.agent_username,
          agent_phone: body.agent_phone,
          agent_email: body.agent_email,
          agent_fullname: body.agent_fullname,
          agent_org_id: body.org_id,
          agent_org_admin_id: body.agent_org_admin_id,
          agent_created_on: new Date,
        })
        const add_agent_user = await db.collection(collection.users).insertOne({
          _id: uuidv4(),
          user_email: body.agent_email,
          user_password: body.agent_password,
          username: body.agent_username,
          user_org_id: body.org_id,
          role: 2,
          role_id: add_agent.insertedId,
          user_created_on: new Date
        })
        let response = {
          statusCode: 200,
          success: true,
          msg: 'Agent created successfully',
          response: {
            agent_id: add_agent.insertedId,
            user_id: add_agent_user.insertedId
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
  const GetAgentByOrg = async (req, res) => {
    const { body } = req;
    if (await ValidateInput(body, rules.agent_get)) {
      try {
        const get_agent = await db.collection(collection.agent).find({
          agent_org_id: body.org_id
        }).toArray();
        let response = {
          statusCode: 200,
          success: true,
          msg: 'Agent Fetched Successfully',
          response: get_agent
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
  const DeleteAgent = async (req, res) => {
    const { body } = req;
    if (await ValidateInput(body, rules.agent_del)){
      try{
        const del_agent = await db.collection(collection.agent).deleteOne({
          _id: body.agent_id,
          agent_org_id: body.org_id
        })
        const del_agent_user = await db.collection(collection.users).deleteOne({
          role_id: body.agent_id,
          user_org_id: body.org_id
        })
        if(del_agent.acknowledged == true && del_agent_user.acknowledged == true && del_agent.deletedCount > 0 && del_agent_user.deletedCount > 0){
          let response = {
            statusCode: 200,
            success: true,
            msg: 'Agent Deleted Successfully',
            response: []
          }
          return res.status(200).json(response);
        } else {
          let response = {
            statusCode: 500,
            success: false,
            msg: 'Agent Deleted Unsucceful(Something Went Wrong)',
            response: []
          }
          return res.status(500).json(response);
        }
      }
      catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }
    } else {
      return res.status(406).json({ msg: 'Input Not Acceptable' });
    }
  }
  const UpdateAgent = async (req, res) => {
    const { body } = req;
    if (await ValidateInput(body, rules.agent_update)){
      try{
        const update_agent = await db.collection(collection.agent).updateOne({
          _id: body.agent_id,
          agent_org_id: body.org_id
        }, {
          $set : {
            agent_username: body.agent_update_username,
            agent_fullname: body.agent_update_agent_fullname,
            agent_phone: body.agent_update_phone,
          }
        })
        let updatePasswordAvaliable = {}
        if(body && body.agent_update_password && body.agent_update_password != ''){
          updatePasswordAvaliable = {
            username: body.agent_update_username,
            user_password: body.agent_update_password
          }
        }else {
          updatePasswordAvaliable = {
            username: body.agent_update_username
          }
        }
        const update_agent_user = await db.collection(collection.users).updateOne({
          role_id: body.agent_id,
          user_org_id: body.org_id
        }, {
          $set : updatePasswordAvaliable
        })
        if(update_agent.acknowledged == true && update_agent_user.acknowledged == true){
          let response = {
            statusCode: 200,
            success: true,
            msg: 'Agent Updated Successfully',
            response: []
          }
          return res.status(200).json(response);
        } else {
          let response = {
            statusCode: 500,
            success: false,
            msg: 'Agent Update Unsucceful(Something Went Wrong)',
            response: []
          }
          return res.status(500).json(response);
        }
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
    AddAgent,
    GetAgentByOrg,
    DeleteAgent,
    UpdateAgent
  };
}

module.exports = AgentMongoController;