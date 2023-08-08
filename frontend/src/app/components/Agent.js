import React, { Component } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import validator from 'validator';
import fetchData from '../elements/FetchApi';
import { connect } from 'react-redux';
import variables from '../../constatnts/variables';
import toast from 'react-hot-toast';
import Tablesss from '../elements/Tablesss';

export class Agent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agent: '',
      email: '',
      fullname: '',
      phone: '',
      password: '',
      isAgentError: false,
      isEmailError: false,
      isPhoneError: false,
      isPasswordError: false,
      agentErrorMsg: '',
      emailErrorMsg: '',
      phoneErrorMsg: '',
      passwordErrorMsg: '',
      columns: [
        {
          dataField: "id",
          text: "id",
          sort: false,
        },
        {
          dataField: "agent_fullname",
          text: "Name",
          sort: true
        },
        {
          dataField: "agent_username",
          text: "User Name",
          sort: true
        },
        {
          dataField: "agent_email",
          text: "Email",
          sort: true
        },
        {
          dataField: "agent_phone",
          text: "Phone",
          sort: true
        },
        {
          dataField: "action",
          text: "Actions",
          formatter: this.actionLable,
          sort: false
        }
      ],
      data: [],
      DeleteAgentDetails: {},
      UpdateAgentDetails: {},
      ShowModelBoxDeleteAgent: false,
      ShowModelBoxUpdateAgent: false
    }
  }
  handleShowModelBoxDeleteAgent = () => {
    this.setState({ ShowModelBoxDeleteAgent: true })
  }
  handleCloseModelBoxDeleteAgent = () => {
    this.setState({ ShowModelBoxDeleteAgent: false })
  }
  handleShowModelBoxUpdateAgent = () => {
    this.setState({ ShowModelBoxUpdateAgent: true })
  }
  handleCloseModelBoxUpdateAgent = () => {
    this.setState({ ShowModelBoxUpdateAgent: false })
  }
  DeleteAgent = async () => {
    let responseData = await fetchData.post(variables.api_url + 'public/del_agent', {
      org_id: this.props.user_details.user_org_id,
      agent_id: this.state.DeleteAgentDetails._id
    })
    if (responseData.statusCode === 200 && responseData.success === true) {
      this.setState({ DeleteAgentDetails: {} })
      this.FetchAgents()
      this.handleCloseModelBoxDeleteAgent()
    }
  }
  modelBoxDeleteAgent = () => {
    return (
      <Modal show={this.state.ShowModelBoxDeleteAgent} onHide={() => { this.handleCloseModelBoxDeleteAgent() }}>
        <Modal.Header closeButton>
          <h4>Delete Agent</h4>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this user <span className='text-danger'>{this.state.DeleteAgentDetails.agent_username || 'Not found'}</span> ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={() => { this.handleCloseModelBoxDeleteAgent() }}>
            Close
          </Button>
          <Button variant="primary" size="sm" onClick={async () => { await this.DeleteAgent() }}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
  modelBoxUpdateAgent = () => {
    return (
      <Modal show={this.state.ShowModelBoxUpdateAgent} onHide={() => { this.handleCloseModelBoxUpdateAgent() }}>
        <Modal.Header closeButton>
          <h4>Add Lead</h4>
        </Modal.Header>
        <Modal.Body>
          <form className="forms-sample">
            <Form.Group>
              {this.state.isAgentError && this.state.agent === '' ? <Form.Text id='lableforAgent' className='text-danger mb-1'>{this.state.agentErrorMsg}</Form.Text> : <></>}
              <Form.Control
                value={this.state.UpdateAgentDetails.agent_username || ''}
                onChange={async e => {
                }}
                type="text" id="exampleInputUsername" placeholder="Agent User Name" size="lg" />
            </Form.Group>
            <Form.Group>
              <Form.Control
                value={this.state.UpdateAgentDetails.agent_fullname || ''}
                onChange={async e => {
                }}
                type="text" className="form-control" id="exampleInputFullName" placeholder="Full Name" />
            </Form.Group>
            {this.state.isPhoneError ? <Form.Text id='lableforPhone' className='text-danger mb-1'>{this.state.phoneErrorMsg}</Form.Text> : <></>}
            <Form.Group>
              <Form.Control
                value={this.state.UpdateAgentDetails.agent_phone || ''}
                onChange={async e => {
                  this.phoneHandler()
                }}
                type="number" className="form-control" id="exampleInputPhone1" placeholder="Phone Number" />
            </Form.Group>
            {this.state.isPasswordError ? <Form.Text id='lableforPassword' className='text-danger mb-1'>{this.state.passwordErrorMsg}</Form.Text> : <></>}
            <Form.Group>
              <Form.Control
                value=''
                onChange={async e => {
                  this.passwordHandler()
                }}
                type="password" className="form-control" id="exampleInputPassword1" placeholder="Passoword" />
            </Form.Group>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={() => { this.handleCloseModelBoxUpdateAgent() }}>
            Close
          </Button>
          <Button variant="primary" size="sm" onClick={() => { this.handleCloseModelBoxUpdateAgent() }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
  actionLable = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div>
        <label className="badge badge-success" onClick={async () => {
          console.log("Upate : ", row)
          this.setState({ UpdateAgentDetails: row })
          this.handleShowModelBoxUpdateAgent()
        }}>Update</label>{" "}
        <label className="badge badge-info" onClick={async () => {
          console.log("Delete :", row)
          await this.setState({ DeleteAgentDetails: row })
          this.handleShowModelBoxDeleteAgent()
        }}>Delete</label>
      </div>
    )
  }
  emailHandler = () => {
    let validEmail = validator.isEmail(this.state.email)
    if (!validEmail) {
      this.setState({ isEmailError: true, emailErrorMsg: 'Please check your email format!' })
    } else {
      this.setState({ isEmailError: false, emailErrorMsg: '' })
    }
  }
  phoneHandler = () => {
    let validphone = validator.isNumeric(this.state.phone) && this.state.phone.length === 10;
    if (!validphone) {
      this.setState({ isPhoneError: true, phoneErrorMsg: 'Please Enter 10 Digit Number!' })
    } else {
      this.setState({ isPhoneError: false, phoneErrorMsg: '' })
    }
  }
  passwordHandler = () => {
    let validpassword = validator.isStrongPassword(this.state.password);
    if (!validpassword) {
      this.setState({ isPasswordError: true, passwordErrorMsg: 'Password Not Strong Enough!' })
    } else {
      this.setState({ isPasswordError: false, passwordErrorMsg: '' })
    }
  }
  agentSubmitHandler = async () => {
    let validEmail = validator.isEmail(this.state.email)
    let validPhone = validator.isNumeric(this.state.phone)
    let validPassword = validator.isStrongPassword(this.state.password)
    if (this.state.agent === '' || this.state.email === '' || this.state.phone === '' || this.state.password === '') {
      this.setState({
        isAgentError: true, agentErrorMsg: 'This feild cannot be empty',
        isEmailError: true, emailErrorMsg: 'This field cannot be empty!',
        isPhoneError: true, phoneErrorMsg: 'This feild cannot be empty',
        isPasswordError: true, passwordErrorMsg: 'This feild cannot be empty'
      })
    } else if (!validEmail) {
      this.setState({ isEmailError: true, emailErrorMsg: 'Invalid email format!' })
    } else if (!validPhone) {
      this.setState({ isPhoneError: true, phoneErrorMsg: 'Invalid Mobile Input!' })
    } else if (!validPassword) {
      this.setState({ isPasswordError: true, passwordErrorMsg: 'Password Not Strong Enough!' })
    } else {
      let responseData = await fetchData.post(variables.api_url + 'public/add_agent', {
        agent_username: this.state.agent,
        agent_phone: this.state.phone,
        agent_email: this.state.email,
        agent_password: this.state.password,
        org_id: this.props.user_details.user_org_id,
        agent_org_admin_id: this.props.user_details.role_id,
        agent_fullname: this.state.fullname
      });
      if (responseData.statusCode === 200 && responseData.success === true) {
        toast.success(responseData.msg)
        this.FetchAgents()
        this.setState({
          phone: '',
          email: '',
          password: '',
          fullname: '',
          agent: ''
        })
      }
    }
  }
  FetchAgents = async () => {
    let responseData = await fetchData.post(variables.api_url + 'public/get_agent', {
      org_id: this.props.user_details.user_org_id
    });
    if (responseData.statusCode === 200 && responseData.success === true) {
      toast.success(responseData.msg)
      this.setState({
        data: responseData.response
      })
    }
  }
  componentDidMount = async () => {
    this.FetchAgents()
  }
  render() {
    const DeleteAgentModalBox = this.modelBoxDeleteAgent;
    const UpdateAgentModalBox = this.modelBoxUpdateAgent;
    return (
      <div className="row w-100 mx-0">
        <div className="col-lg-12 mx-auto">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Agent Details</h4>
              <form className="forms-sample">
                <Form.Group>
                  {this.state.isAgentError && this.state.agent === '' ? <Form.Text id='lableforAgent' className='text-danger mb-1'>{this.state.agentErrorMsg}</Form.Text> : <></>}
                  <Form.Control
                    value={this.state.agent}
                    onChange={async e => {
                      await this.setState({ agent: e.target.value })
                    }}
                    type="text" id="exampleInputUsername" placeholder="Agent User Name" size="lg" />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    value={this.state.fullname}
                    onChange={async e => {
                      await this.setState({ fullname: e.target.value })
                      // this.emailHandler()
                    }}
                    type="text" className="form-control" id="exampleInputFullName" placeholder="Full Name" />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    value={this.state.email}
                    onChange={async e => {
                      await this.setState({ email: e.target.value })
                      this.emailHandler()
                    }}
                    type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
                </Form.Group>
                {this.state.isPhoneError ? <Form.Text id='lableforPhone' className='text-danger mb-1'>{this.state.phoneErrorMsg}</Form.Text> : <></>}
                <Form.Group>
                  <Form.Control
                    value={this.state.phone}
                    onChange={async e => {
                      await this.setState({ phone: e.target.value })
                      this.phoneHandler()
                    }}
                    type="number" className="form-control" id="exampleInputPhone1" placeholder="Phone Number" />
                </Form.Group>
                {this.state.isPasswordError ? <Form.Text id='lableforPassword' className='text-danger mb-1'>{this.state.passwordErrorMsg}</Form.Text> : <></>}
                <Form.Group>
                  <Form.Control
                    value={this.state.password}
                    onChange={async e => {
                      await this.setState({ password: e.target.value })
                      this.passwordHandler()
                    }}
                    type="password" className="form-control" id="exampleInputPassword1" placeholder="Passoword" />
                </Form.Group>
                <button type="button"
                  onClick={this.agentSubmitHandler}
                  className="btn btn-primary mr-2 btn-md">Add</button>
                <button className="btn btn-light">Clear</button>
              </form>
            </div>
          </div>
        </div>
        <div className='col-lg-12 mt-2'>
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Commodity List</h4>
              <Tablesss data={this.state.data} columns={this.state.columns} />
            </div>
          </div>
        </div>
        <DeleteAgentModalBox />
        <UpdateAgentModalBox />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user_details: state.login_reducer.response,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Agent);