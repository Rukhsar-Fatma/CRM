const publicRoutes = {
  'POST /org_reg': 'OrgMongoController.OrgReg',
  'POST /login': 'UserMongoController.login',
  'POST /get_leads': 'LeadMongoController.GetLead',
  'POST /add_leads': 'LeadMongoController.AddLead',
  'POST /get_source_by_org': 'SourceMongoController.GetSourceByOrg',
  'POST /add_source': 'SourceMongoController.AddSource',
  'POST /get_commodity_by_org': 'CommodityMongoController.GetCommodityByOrg',
  'POST /add_commodity': 'CommodityMongoController.AddCommodity',
  'POST /add_agent': 'AgentMongoController.AddAgent',
  'POST /get_agent': 'AgentMongoController.GetAgentByOrg',
  'POST /del_agent': 'AgentMongoController.DeleteAgent',
  'POST /update_agent': 'AgentMongoController.UpdateAgent'
};

module.exports = publicRoutes;
