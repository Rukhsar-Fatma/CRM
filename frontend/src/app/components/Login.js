import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import validator from 'validator';
import { connect } from 'react-redux';
import { LOGIN } from '../../actions/loginAction';

import logo from '../../assets/images/logo.svg';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isEmailError: false,
      isPassowrdError: false,
      emailErrorMsg: '',
      passwordErrorMsg: '',
      isLoginSuccess: false
    };
  };
  emailHandler = () => {
    let validEmail = validator.isEmail(this.state.email)
    if (!validEmail) {
      this.setState({ isEmailError: true, emailErrorMsg: 'Please check your email format!' })
    } else {
      this.setState({ isEmailError: false, emailErrorMsg: '' })
    }
  }
  passwordHandler = () => {
    let validPassword = validator.isStrongPassword(this.state.password)
    if (!validPassword) {
      this.setState({ isPassowrdError: true, passwordErrorMsg: 'Your password is too weak!' })
    } else {
      this.setState({ isPassowrdError: false, passwordErrorMsg: '' })
    }
  }
  loginSubmitHandler = () => {
    let validEmail = validator.isEmail(this.state.email)
    let validPassword = validator.isStrongPassword(this.state.password)
    if (this.state.email === '' & this.state.password === '') {
      this.setState({ isPassowrdError: true, passwordErrorMsg: 'This field cannot be empty!', isEmailError: true, emailErrorMsg: 'This field cannot be empty!' })
    } else if (!validPassword & !validEmail) {
      this.setState({ isPassowrdError: true, passwordErrorMsg: 'Password is too weak!', isEmailError: true, emailErrorMsg: 'Invalid email format!' })
    } else {
      this.props.LOGIN({ user_email: this.state.email, user_password: this.state.password });
      this.setState({ isPassowrdError: false, passwordErrorMsg: '', isEmailError: false, emailErrorMsg: '', isLoginSuccess: true })
    }
  }
  render() {
    return (
      <div>
        {this.props.isLogin && <Redirect to={`/${this.props.user_details.user_org_domain}/leads/leadlist`} />}
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img src={logo} alt="logo" />
                </div>
                <h4>Hello! let's get started</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                <Form className="pt-3">
                  {this.state.isEmailError ? <Form.Text id='lableforEmail' className='text-danger mb-1'>{this.state.emailErrorMsg}</Form.Text> : <></>}
                  <Form.Group className="d-flex search-field">
                    <Form.Control
                      value={this.state.email}
                      onChange={async e => {
                        await this.setState({ email: e.target.value })
                        this.emailHandler()
                      }}
                      type="email" placeholder="Email" size="lg" className={"h-auto" + (this.state.isEmailError ? 'border border-danger' : '')} />
                  </Form.Group>
                  {this.state.isPassowrdError ? <Form.Text id='lableforPassword' className='text-danger mb-1'>{this.state.passwordErrorMsg}</Form.Text> : <></>}
                  <Form.Group className="d-flex search-field">
                    <Form.Control
                      value={this.state.password}
                      onChange={async e => {
                        await this.setState({ password: e.target.value })
                        this.passwordHandler()
                      }}
                      type="password" placeholder="Password" size="lg" className={"h-auto" + (this.state.isPassowrdError ? 'border border-danger' : '')} />
                  </Form.Group>
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={async () => {
                        await this.loginSubmitHandler()
                      }}
                      className="btn btn-block btn-primary btn-lg font-weight-medium">SIGN IN</button>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Else register your Orginization <Link to="/register" className="text-primary">Here</Link>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// Redux State Handling
const mapStateToProps = (state) => {
  return {
    isLogin: state.login_reducer.isLogin,
    user_details: state.login_reducer.response,
  };
};

const mapDispatchToProps = {
  LOGIN
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);