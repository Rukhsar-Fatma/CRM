import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { Trans } from 'react-i18next';
import { connect } from 'react-redux';

class Sidebar extends Component {
  state = {};
  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({ [menuState]: false });
    } else if (Object.keys(this.state).length === 0) {
      this.setState({ [menuState]: true });
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({ [i]: false });
      });
      this.setState({ [menuState]: true });
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }
  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({ [i]: false });
    });
    let dropdownPaths = []
    if (this.props.user_details.role === 1) {
      dropdownPaths = [
        { path: `/${this.props.user_details.user_org_domain}/leads`, state: 'orgLeadsPagesMenuOpen' },
        { path: `/${this.props.user_details.user_org_domain}/commodity`, state: 'orgCommodityPagesMenuOpen' },
        { path: `/${this.props.user_details.user_org_domain}/source`, state: 'orgSourcePagesMenuOpen' },
        { path: `/${this.props.user_details.user_org_domain}/agent`, state: 'orgAgentPagesMenuOpen' }
      ];
    } else {
      dropdownPaths = [
        { path: `/${this.props.user_details.user_org_domain}/leads`, state: 'orgLeadsPagesMenuOpen' }
      ];
    }
    dropdownPaths.forEach((obj => {
      if (this.isPathActive(obj.path)) {
        this.setState({ [obj.state]: true })
      }
    }));
  }
  render() {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item nav-profile">
            <a href="!#" className="nav-link" onClick={evt => evt.preventDefault()}>
              <div className="nav-profile-image">
                <img src={require("../../assets/images/faces/face1.jpg")} alt="profile" />
                <span className="login-status online"></span> {/* change to offline or busy as needed */}
              </div>
              <div className="nav-profile-text">
                <span className="font-weight-bold mb-2"><Trans>{this.props.user_details.user_org_domain ?? 'unavaliable'}</Trans></span>
                <span className="text-secondary text-small"><Trans>{this.props.user_details.role === 1 ? 'Admin Panel' : this.props.user_details.role === 2 ? 'Agent Panel' : 'unknown'}</Trans></span>
              </div>
            </a>
          </li>
          <li className={this.isPathActive(`/${this.props.user_details.user_org_domain}/leads`) ? 'nav-item active' : 'nav-item'}>
            <div className={this.state.orgLeadsPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('orgLeadsPagesMenuOpen')} data-toggle="collapse">
              <span className="menu-title"><Trans>Leads</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-crosshairs-gps menu-icon"></i>
            </div>
            <Collapse in={this.state.orgLeadsPagesMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={this.isPathActive(`/${this.props.user_details.user_org_domain}/leads/leadlist`) ? 'nav-link active' : 'nav-link'} to={`/${this.props.user_details.user_org_domain}/leads/leadlist`}><Trans>Lead List</Trans></Link></li>
              </ul>
            </Collapse>
          </li>
          <li className={this.isPathActive(`/${this.props.user_details.user_org_domain}/commodity`) ? 'nav-item active' : 'nav-item'}>
            <div className={this.state.orgCommodityPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('orgCommodityPagesMenuOpen')} data-toggle="collapse">
              <span className="menu-title"><Trans>Commodity</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-dropbox menu-icon"></i>
            </div>
            <Collapse in={this.state.orgCommodityPagesMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={this.isPathActive(`/${this.props.user_details.user_org_domain}/commodity/commoditylits`) ? 'nav-link active' : 'nav-link'} to={`/${this.props.user_details.user_org_domain}/commodity/commoditylits`}><Trans>Commodity Actions</Trans></Link></li>
              </ul>
            </Collapse>
          </li>
          <li className={this.isPathActive(`/${this.props.user_details.user_org_domain}/source`) ? 'nav-item active' : 'nav-item'}>
            <div className={this.state.orgSourcePagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('orgSourcePagesMenuOpen')} data-toggle="collapse">
              <span className="menu-title"><Trans>Source</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-source-branch menu-icon"></i>
            </div>
            <Collapse in={this.state.orgSourcePagesMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={this.isPathActive(`/${this.props.user_details.user_org_domain}/source/sourcelist`) ? 'nav-link active' : 'nav-link'} to={`/${this.props.user_details.user_org_domain}/source/sourcelist`}><Trans>Source Actions</Trans></Link></li>
              </ul>
            </Collapse>
          </li>
          <li className={this.isPathActive(`/${this.props.user_details.user_org_domain}/agent`) ? 'nav-item active' : 'nav-item'}>
            <div className={this.state.orgAgentPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('orgAgentPagesMenuOpen')} data-toggle="collapse">
              <span className="menu-title"><Trans>Agent</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-account-circle menu-icon"></i>
            </div>
            <Collapse in={this.state.orgAgentPagesMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={this.isPathActive(`/${this.props.user_details.user_org_domain}/agent/agentlist`) ? 'nav-link active' : 'nav-link'} to={`/${this.props.user_details.user_org_domain}/agent/agentlist`}><Trans>Agent Actions</Trans></Link></li>
              </ul>
            </Collapse>
          </li>
        </ul>
      </nav>
    );
  }
  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
  componentDidMount() {
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {
      el.addEventListener('mouseover', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }
}
const mapStateToProps = (state) => {
  return {
    user_details: state.login_reducer.response,
  };
};
const mapDispatchToProps = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar));