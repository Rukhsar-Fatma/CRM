import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, FormText } from 'react-bootstrap';
import { connect } from 'react-redux';
import validator from 'validator';
import { ORG_REGISTER } from '../../actions/orgRegisterAction';
import fetchData from '../elements/FetchApi';
import variables from '../../constatnts/variables';
import toast from 'react-hot-toast';

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOrgDetail: true,
      isOrgAdminDetail: false,
      isOrgDomainDetail: false,
      org_name: '',
      org_email: '',
      org_phno: '',
      org_country: '',
      org_pincode: '',
      org_type: '',

      isOrgError: false,
      isEmailError: false,
      isPhoneError: false,
      isPincodeError: false,
      isCountryError: false,
      isOrgType: false,
      isPassowrdError: false,
      isDomainError: false,

      orgErrorMsg: '',
      emailErrorMsg: '',
      phoneErrorMsg: '',
      pincodeErrorMsg: '',
      countryErrorMsg: '',
      orgTypeErrorMsg: '',
      passwordErrorMsg: '',
      domainErrorMsg: '',

      termsIsChecked: false,
      org_admin_password: '',
      org_domain: '',
      countries: ['India', 'Germany', 'United States of America', 'United Kingdom'],
      industrial_domain: ['Education', 'Pharma', 'Finance', 'Technology', 'Other']
    };
  };
  componentDidUpdate(){
    console.log(this.state)
  }
  orgNameHandler = () => {
    let org_name_trimmed = this.state.org_name.trim()
    console.log(org_name_trimmed);
    let validName = /^[a-zA-Z0-9_ ]*$/; // regular expression to allow only alphanumeric and underscore characters
    if (!validName.test(org_name_trimmed)) {
      this.setState({ isOrgError: true, orgErrorMsg: 'Input contains special characters!' })
    } else {
      this.setState({ isOrgError: false, orgErrorMsg: '' })
    }
  }
  emailHandler = () => {
    let validEmail = validator.isEmail(this.state.org_email)
    if (!validEmail) {
      this.setState({ isEmailError: true, emailErrorMsg: 'Please check your email format!' })
    } else {
      this.setState({ isEmailError: false, emailErrorMsg: '' })
    }
  }
  phoneHandler = () => {
    let validPhone = validator.isNumeric(this.state.org_phno) && this.state.org_phno.length === 10;
    if (!validPhone) {
      this.setState({ isPhoneError: true, phoneErrorMsg: 'Please Enter 10 Digit Number!' })
    } else {
      this.setState({ isPhoneError: false, phoneErrorMsg: '' })
    }
  }
  pincodeHandler = () => {
    let validPincode = validator.isNumeric(this.state.org_pincode) && this.state.org_pincode.length === 6;
    if (!validPincode) {
      this.setState({ isPincodeError: true, pincodeErrorMsg: 'Enter Valid Pincode!' })
    } else {
      this.setState({ isPincodeError: false, pincodeErrorMsg: '' })
    }
  }
  onCountrySelect = async (e) => {
    await this.setState({ org_country: e.target.value }, () => {
      console.log(this.state.org_country)
    })
  }
  onOrgTypeSelect = async (e) => {
    await this.setState({ org_type: e.target.value }, () => {
      console.log(this.state.org_type)
    })
  }
  orgRegisterHandler = () => {
    let validEmail = validator.isEmail(this.state.org_email);
    let validPhone = validator.isNumeric(this.state.org_phno)
    let validPincode = validator.isNumeric(this.state.org_pincode)
    let validName = validator.isAlpha(this.state.org_name)
    console.log(this.state.org_name, this.state.org_email, this.state.org_phno, this.state.org_pincode, this.state.org_country, this.state.org_type);
    if (this.state.org_name === '' &
      this.state.org_email === '' &
      this.state.org_phno === '' &
      this.state.org_pincode === '') {
      this.setState({
        isOrgError: true, orgErrorMsg: 'This field cannot be empty!',
        isEmailError: true, emailErrorMsg: 'This field cannot be empty!',
        isPhoneError: true, phoneErrorMsg: 'This feild cannot be empty',
        isPincodeError: true, pincodeErrorMsg: 'This feild cannot be empty'
      })
    } else if (!validEmail & !validPhone & !validPincode & !validName) {
      this.setState({
        isEmailError: true, emailErrorMsg: 'Invalid email format!',
        isPhoneError: true, phoneErrorMsg: 'Invalid Mobile Input!',
        isPincodeError: true, pincodeErrorMsg: 'Invalid Pincode',
        isOrgError: true, orgErrorMsg: 'Required'
      })
      console.log(this.setState)
    } else if (this.state.org_country === '') {
      alert('Please select Country');
      return;
    } else if (this.state.org_type === '') {
      alert('Please select Domain');
      return;
    }
    else {
      // window.location.href = '/org-domain/leads/leadlist'
      this.setState({ isOrgDetail: false, isOrgAdminDetail: true })
    }
  }
  passwordHandler = () => {
    let validPassword = validator.isStrongPassword(this.state.org_admin_password)
    if (!validPassword) {
      this.setState({ isPassowrdError: true, passwordErrorMsg: 'Your password is too weak!' })
    } else {
      this.setState({ isPassowrdError: false, passwordErrorMsg: '' })
    }
  }

  passwordSubmitHandler = () => {
    let validPassword = validator.isStrongPassword(this.state.org_admin_password)
    if (this.state.orgTypeErrorMsg === '') {
      this.setState({ isPassowrdError: true, passwordErrorMsg: 'This field cannot be empty!' })
    } else if (!validPassword) {
      this.setState({ isPassowrdError: true, passwordErrorMsg: 'Password is too weak!' })
    } else {
      this.setState({ isPassowrdError: false, passwordErrorMsg: '' })
    }
    console.log(this.state.org_admin_password)
  }

  orgDomainHandler = () => {
    let org_domain_trimmed = this.state.org_domain.trim()
    console.log(org_domain_trimmed);
    let validName = /^[a-zA-Z0-9_-]*$/; // regular expression to allow only alphanumeric and underscore characters
    if (!validName.test(org_domain_trimmed)) {
      this.setState({ isDomainError: true, domainErrorMsg: 'Domain contains special characters!' })
    } else {
      this.setState({ isDomainError: false, domainErrorMsg: '' })
    }
  }
  
  onSignupButtonPressed = async (e) => {
    let req2action = {
      org_name: this.state.org_name || "",
      org_email: this.state.org_email || "",
      org_phno: Number(this.state.org_phno) || "",
      org_country: this.state.org_country || "",
      org_pincode: Number(this.state.org_pincode) || "",
      org_type: this.state.org_type || "",
      org_admin_username: this.state.org_name || "",
      org_admin_password: this.state.org_admin_password || "",
      org_domain: this.state.org_domain || ""
    }
    let responseData = await fetchData.post(variables.api_url + 'public/org_reg', req2action);
    console.log("responseData: ",responseData)
    if(responseData.statusCode === 200 && responseData.success === true){
      toast.success(responseData.msg);
      this.setState({
        isOrgDetail: true,
        isOrgAdminDetail: false,
        isOrgDomainDetail: false,
        org_name: '',
        org_email: '',
        org_phno: '',
        org_country: '',
        org_pincode: '',
        org_type: '',
        isOrgError: false,
        isEmailError: false,
        isPhoneError: false,
        isPincodeError: false,
        isCountryError: false,
        isOrgType: false,
        isPassowrdError: false,
        isDomainError: false,
        orgErrorMsg: '',
        emailErrorMsg: '',
        phoneErrorMsg: '',
        pincodeErrorMsg: '',
        countryErrorMsg: '',
        orgTypeErrorMsg: '',
        passwordErrorMsg: '',
        domainErrorMsg: '',
        termsIsChecked: false,
        org_admin_password: '',
        org_domain: '',
        countries: ['India', 'Germany', 'United States of America', 'United Kingdom'],
        industrial_domain: ['Education', 'Pharma', 'Finance', 'Technology', 'Other']
      })
    }
  }
  render() {
    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img src={require("../../assets/images/logo.svg")} alt="logo" />
                </div>
                {
                  this.state.isOrgDetail ? <div className='org_details'>
                    <h4>New here?</h4>
                    <h6 className="font-weight-light">Signing up is easy. It only takes a few steps</h6>
                    <form className="pt-3">
                      {this.state.isOrgError ? <Form.Text id='lableforSource' className='text-danger mb-1'>{this.state.orgErrorMsg}</Form.Text> : <></>}
                      <div className="form-group">
                        <input
                          value={this.state.org_name}
                          onChange={async (e) => {
                            await this.setState({ org_name: e.target.value })
                            this.orgNameHandler()
                          }}
                          type="text"
                          className="form-control"
                          id="exampleInputEmail1" placeholder="Org Name" />
                      </div>
                      {this.state.isEmailError ? <Form.Text id='lableforSource' className='text-danger mb-1'>{this.state.emailErrorMsg}</Form.Text> : <></>}
                      <div className="form-group">
                        <input
                          value={this.state.org_email}
                          onChange={async (e) => {
                            await this.setState({ org_email: e.target.value })
                            this.emailHandler()
                          }}
                          type="email"
                          className="form-control"
                          id="exampleInputEmail1" placeholder="Email" />
                      </div>
                      {this.state.isPhoneError ? <Form.Text id='lableforPhone' className='text-danger mb-1'>{this.state.phoneErrorMsg}</Form.Text> : <></>}
                      <div className="form-group">
                        <input
                          value={this.state.org_phno}
                          onChange={async (e) => {
                            await this.setState({ org_phno: e.target.value })
                            this.phoneHandler()
                          }}
                          type="number"
                          className="form-control" id="exampleInputEmail1" placeholder="Phone Number" />
                      </div>
                      <div className="form-group">
                        <select
                          value={this.state.org_country}
                          onChange={this.onCountrySelect.bind(this)}
                          className="form-control text-dark" id="exampleFormControlSelect2" required>
                          <option hidden value={0}>Select Country</option>
                          {this.state.countries.map(country => (
                            <option className='text-muted' key={country} value={country}>{country}</option>
                          ))}
                        </select>
                      </div>
                      {this.state.isPincodeError ? <Form.Text id='lableforPincode' className='text-danger mb-1'>{this.state.pincodeErrorMsg}</Form.Text> : <></>}
                      <div className="form-group">
                        <input
                          value={this.state.org_pincode}
                          onChange={async (e) => {
                            await this.setState({ org_pincode: e.target.value })
                            this.pincodeHandler()
                          }}
                          type="number"
                          className="form-control" id="exampleInputEmail1" placeholder="Pincode" />
                      </div>
                      <div className="form-group">
                        <select
                          value={this.state.org_type}
                          onChange={this.onOrgTypeSelect.bind(this)}
                          className="form-control text-dark" id="exampleFormControlSelect2" required>
                          <option hidden value={0}>Select Industrial Domain</option>
                          {this.state.industrial_domain.map(industry => (
                            <option className='text-muted' key={industry} value={industry}>{industry}</option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-4">
                        <div className="form-check">
                          <label className="form-check-label text-muted">
                            <input
                              checked={this.state.termsIsChecked}
                              onChange={() => {
                                this.setState({ termsIsChecked: !this.state.termsIsChecked })
                              }}
                              type="checkbox" className="form-check-input" />
                            <i className="input-helper"></i>
                            I agree to all Terms & Conditions
                          </label>
                        </div>
                      </div>
                      <div className="mt-3">
                        <button
                          type='button'
                          onClick={async () => {
                            await this.orgRegisterHandler()
                          }}
                          className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/">NEXT</button>
                      </div>
                      <div className="text-center mt-4 font-weight-light">
                        Already have an account? <Link to="/user-pages/login" className="text-primary">Login</Link>
                      </div>
                    </form>
                  </div> : <div></div>
                }
                {
                  this.state.isOrgAdminDetail ? <div className='org_admin_details'>
                    <h4>Security is must !</h4>
                    <h6 className="font-weight-light">Set password for your organization admin account</h6>
                    <form className="pt-3">
                      {this.state.isPassowrdError ? <Form.Text id='lableforPassword' className='text-danger mb-1'>{this.state.passwordErrorMsg}</Form.Text> : <></>}
                      <div className="form-group">
                        <input
                          value={this.state.org_admin_password}
                          onChange={async (e) => {
                            await this.setState({ org_admin_password: e.target.value })
                            this.passwordHandler()
                          }}
                          type="password" className="form-control" id="exampleInputPassword" placeholder="Password" />
                      </div>
                      <div className="mt-3">
                        <button
                          type='button'
                          onClick={async () => {
                            await this.passwordSubmitHandler()
                            this.setState({ isOrgAdminDetail: false, isOrgDomainDetail: true })
                          }} className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/">NEXT</button>
                      </div>
                      <div className="mt-3">
                        <button
                          type='button'
                          onClick={() => {
                            this.setState({ isOrgDetail: true, isOrgAdminDetail: false, isOrgDomainDetail: false })
                          }} className="btn btn-block btn-outline-primary btn-lg font-weight-medium auth-form-btn" to="/">BACK</button>
                      </div>
                    </form>
                  </div> : <div></div>
                }
                {
                  this.state.isOrgDomainDetail ? <div className='org_domain_details'>
                    <h4>Setup Domain Name</h4>
                    <h6 className="font-weight-light">Set your domain name <br></br><span className='text-muted'>(eg: slashrtc.com/crm/<span className='text-danger'>your-company-name</span>)</span></h6>
                    <form className="pt-3">
                      <div className="form-group">
                        {this.state.isDomainError ? <FormText id='lableforOrgDomain' className='text-danger mb-1'>{this.state.domainErrorMsg}</FormText> : <></>}
                        <input
                          value={this.state.org_domain}
                          onChange={async (e) => {
                            await this.setState({ org_domain: e.target.value })
                            this.orgDomainHandler()
                          }}
                          type="text" className="form-control" id="exampleInputDomain" placeholder="Domain (your-company-name)" />
                      </div>
                      <div className="mt-3">
                        <button
                          type='button'
                          onClick={() => {
                            this.onSignupButtonPressed();
                          }}
                          className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">SIGN UP</button>
                      </div>
                      <div className="mt-3">
                        <button onClick={() => {
                          this.setState({ isOrgDetail: false, isOrgAdminDetail: true, isOrgDomainDetail: false })
                        }} className="btn btn-block btn-outline-primary btn-lg font-weight-medium auth-form-btn" to="/">BACK</button>
                      </div>
                    </form>
                  </div> : <div></div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // isLogin: state.login_reducer.isLogin,
    // user_details: state.login_reducer.response,
  };
};

const mapDispatchToProps = {
  ORG_REGISTER
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);