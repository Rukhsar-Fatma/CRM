import React, { Component } from 'react'
import Tablesss from '../elements/Tablesss';
import { Button, Modal, Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import fetchData from '../elements/FetchApi';
import variables from '../../constatnts/variables';
import { connect } from 'react-redux';

export class LeadList extends Component {
  componentDidMount = async () => {
    console.log("🚀 ~ file: Leadlist.js:23 ~ LeadList ~ componentDidMount= ~ this.props.user_details:", this.props.user_details)
    try {
      const responseData = await fetchData.post(variables.api_url + 'public/get_leads', {
        role: String(this.props.user_details.role),
        org_id: this.props.user_details.user_org_id,
        role_id: this.props.user_details.role_id
      });
      this.setState({ data: responseData.response })
      console.log("🚀 ~ file: Leadlist.js:17 ~ LeadList ~ componentDidMount=async ~ responseData:", responseData.response)
    } catch (error) {
      console.error(error);
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      ShowModelBoxLeadUpload: false,
      ShowModelBoxLeadAdd: false,
      startDate: new Date(),
      columns: [
        {
          dataField: "id",
          text: "id",
          sort: false,
        },
        {
          dataField: "lead_name",
          text: "User Name",
          sort: true
        },
        {
          dataField: "lead_company",
          text: "Company",
          sort: true
        },
        {
          dataField: "commodity_name",
          text: "Product",
          sort: true
        },
        {
          dataField: "action",
          text: "Actions",
          formatter: this.actionLable,
          sort: false
        }
      ],
      data: []
    };
  }
  handleChange = date => {
    this.setState({
      startDate: date
    });
  };
  actionLable = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div>
        <label className="badge badge-success" onClick={() => { console.log("Upate : ", row._id) }}>Update</label>{" "}
        <label className="badge badge-info" onClick={() => { console.log("Delete : ", row._id) }}>Delete</label>
      </div>
    )
  }
  actionButtons = () => {
    return (
      <>
        <button type="button" onClick={() => { this.handleShowModelBoxLeadAdd() }} className="btn btn-primary"><i className="mdi mdi-upload"></i></button>
        <button type="button" onClick={() => { this.handleShowModelBoxLeadUpload() }} className="btn btn-primary"><i className="mdi mdi-playlist-plus"></i></button>
      </>
    )
  }
  handleCloseModelBoxLeadUpload = () => {
    this.setState({ ShowModelBoxLeadUpload: false })
  }
  handleShowModelBoxLeadUpload = () => {
    this.setState({ ShowModelBoxLeadUpload: true })
  }
  handleCloseModelBoxLeadAdd = () => {
    this.setState({ ShowModelBoxLeadAdd: false })
  }
  handleShowModelBoxLeadAdd = () => {
    this.setState({ ShowModelBoxLeadAdd: true })
  }
  modelBoxLeadAdd = () => {
    return (
      <Modal show={this.state.ShowModelBoxLeadAdd} onHide={() => { this.handleCloseModelBoxLeadAdd() }}>
        <Modal.Header closeButton>
          <h4>Lead Bulk Upload</h4>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <p>File upload</p>
              <div className="custom-file">
                <Form.Control type="file" className="form-control visibility-hidden" id="customFileLang" lang="es" />
                <label className="custom-file-label" htmlFor="customFileLang">Upload CSV</label>
              </div>
              <label className="card-description mt-1"> Download Sample from <code>here</code></label>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={() => { this.handleCloseModelBoxLeadAdd() }}>
            Close
          </Button>
          <Button variant="primary" size="sm" onClick={() => { this.handleCloseModelBoxLeadAdd() }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
  modelBoxLeadUpload = () => {
    return (
      <Modal show={this.state.ShowModelBoxLeadUpload} onHide={() => { this.handleCloseModelBoxLeadUpload() }}>
        <Modal.Header closeButton>
          <h4>Add Lead</h4>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <label htmlFor="exampleInputUsername1">Username</label>
              <Form.Control type="text" id="exampleInputUsername1" placeholder="Username" size="lg" />
            </Form.Group>
            <Form.Group>
              <label htmlFor="exampleInputUsername1">Username</label>
              <Form.Control type="text" id="exampleInputUsername1" placeholder="Username" size="lg" />
            </Form.Group>
            <Form.Group className="row">
              <label className="col-sm-3 col-form-label">Date of Birth</label>
              <div className="col-sm-9">
                <DatePicker className="form-control"
                  selected={this.state.startDate}
                  onChange={this.handleChange}
                />
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={() => { this.handleCloseModelBoxLeadUpload() }}>
            Close
          </Button>
          <Button variant="primary" size="sm" onClick={() => { this.handleCloseModelBoxLeadUpload() }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
  render() {
    const UploadLeadModalBox = this.modelBoxLeadUpload;
    const AddLeadModalBox = this.modelBoxLeadAdd;
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title"> Lead List </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Lead</a></li>
              <li className="breadcrumb-item active" aria-current="page">Lead List</li>
            </ol>
          </nav>
        </div>
        <div className='row'>
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <Tablesss data={this.state.data} columns={this.state.columns} actionButtons={this.actionButtons} />
              </div>
            </div>
          </div>
        </div>
        <UploadLeadModalBox />
        <AddLeadModalBox />
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

export default connect(mapStateToProps, mapDispatchToProps)(LeadList);