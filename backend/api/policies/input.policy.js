const user_login = {
  'email': 'required|string',
  'password': 'required|string'
};

const org_reg = {
  'org_name': 'required|string',
  'org_email': 'required|email',
  'org_phno': 'required|phoneNumber',
  'org_country': 'required|string',
  'org_pincode': 'required|maxLength:6|minLength:6',
  'org_type': 'required|string',
  'org_admin_username': 'required|string',
  'org_admin_password': 'required|string',
  'org_domain': ['required', 'regex:[a-z]']
}

const agent_add = {
  'agent_username': 'required|string',
  'agent_phone': 'required|phoneNumber',
  'agent_email': 'required|email',
  'agent_password': 'required|string',
  'agent_org_admin_id': 'required|string',
  'agent_fullname': 'required|string',
  'org_id': 'required|string'
}

const agent_get = {
  'org_id': 'required|string'
}

const agent_del = {
  'org_id': 'required|string',
  'agent_id': 'required|string'
}

const agent_update = {
  'org_id': 'required|string',
  'agent_id': 'required|string',
  'agent_update_username': 'required|string',
  'agent_update_agent_fullname': 'required|string',
  'agent_update_phone': 'required|phoneNumber',
  'agent_update_password': 'string'
}

const leads_get = {
  'org_id': 'required|string',
  'role': 'required|string',
  'role_id': 'required|string'
}

const leads_add = {
  'org_id': 'required|string',
  'role_id': 'required|string',
  'lead_agent_id': 'required|string',
  'lead_name': 'required|string',
  'lead_company': 'required|string',
  'lead_email': 'required|string',
  'lead_contact': 'required|string',
  'lead_source_id': 'required|string',
  'lead_commodity_id': 'required|string',
  'lead_created_by': 'required|string'
}

const source_get = {
  'org_id': 'required|string'
}

const source_add = {
  'org_id': 'required|string',
  'source_name': 'required|string',
}

const commodity_get = {
  'org_id': 'required|string'
}

const commodity_add = {
  'org_id': 'required|string',
  'commodity_name': 'required|string',
  'commodity_desc': 'string'
}

module.exports = {
  user_login,
  org_reg,
  agent_add,
  agent_get,
  agent_del,
  agent_update,
  leads_get,
  leads_add,
  source_get,
  source_add,
  commodity_get,
  commodity_add
};