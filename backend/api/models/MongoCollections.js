require('dotenv').config()

const db = process.env.DB_MONGO;

const collection = {
  test_1: 'test_1',
  users: 'user',
  org: 'org',
  orgadmin: 'org_admin',
  role: 'role',
  leads: 'leads',
  source: 'source',
  commodity: 'commodity',
  agent: 'org_agent'
};

module.exports = {
  db,
  collection
};