import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Spinner from '../app/shared/Spinner';
import { connect } from 'react-redux';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));
const Buttons = lazy(() => import('./basic-ui/Buttons'));
const Dropdowns = lazy(() => import('./basic-ui/Dropdowns'));
const Typography = lazy(() => import('./basic-ui/Typography'));
const BasicElements = lazy(() => import('./form-elements/BasicElements'));
const BasicTable = lazy(() => import('./tables/BasicTable'));
const Mdi = lazy(() => import('./icons/Mdi'));
const ChartJs = lazy(() => import('./charts/ChartJs'));
const Error404 = lazy(() => import('./error-pages/Error404'));
const Error500 = lazy(() => import('./error-pages/Error500'));
const Login = lazy(() => import('./components/Login'));
const Register1 = lazy(() => import('./components/Org_Register'));
const Lockscreen = lazy(() => import('./user-pages/Lockscreen'));
const BlankPage = lazy(() => import('./general-pages/BlankPage'));
const LeadList = lazy(() => import('./components/Leadlist'));
const Commodity = lazy(() => import('./components/Commodity'));
const Source = lazy(() => import('./components/Source'));
const Agent = lazy(() => import('./components/Agent'));

class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route path="/basic-ui/buttons" component={Buttons} />
          <Route path="/basic-ui/dropdowns" component={Dropdowns} />
          <Route path="/basic-ui/typography" component={Typography} />
          <Route path="/form-Elements/basic-elements" component={BasicElements} />
          <Route path="/tables/basic-table" component={BasicTable} />
          <Route path="/icons/mdi" component={Mdi} />
          <Route path="/charts/chart-js" component={ChartJs} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register1} />
          <Route path="/user-pages/lockscreen" component={Lockscreen} />
          <Route path="/error-pages/error-404" component={Error404} />
          <Route path="/error-pages/error-500" component={Error500} />
          <Route path="/general-pages/blank-page" component={BlankPage} />
          {/* Leads */}
          <Route path={`/${this.props.user_details.user_org_domain}/leads/leadlist`} component={LeadList} />
          {/* Commodity */}
          <Route path={`/${this.props.user_details.user_org_domain}/commodity/commoditylits`} component={Commodity} />
          {/* Source */}
          <Route path={`/${this.props.user_details.user_org_domain}/source/sourcelist`} component={Source} />
         {/* Agent */}
          <Route path={`/${this.props.user_details.user_org_domain}/agent/agentlist`} component={Agent} />
          {/* User */}
          <Redirect to="/login" />
        </Switch>
      </Suspense>
    );
  }
}

// Redux State Handling
const mapStateToProps = (state) => {
  return {
    user_details: state.login_reducer.response,
  };
};

export default connect(mapStateToProps, null)(AppRoutes);