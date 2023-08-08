import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import Tablesss from '../elements/Tablesss';
import variables from '../../constatnts/variables';
import { connect } from 'react-redux';
import fetchData from '../elements/FetchApi';

export class Source extends Component {
  constructor(props) {
    super(props);
    this.state = {
      source: '',
      sourceDetail: '',
      isSourceError: false,
      isSourceDetailError: false,
      SourceErrorMsg: '',
      SourceDetailErrorMsg: '',
      columns: [
        {
          dataField: "id",
          text: "id",
          sort: true
        }, {
          dataField: "source_name",
          text: "Name",
          sort: true
        }, {
          dataField: "action",
          text: "Actions",
          formatter: this.actionLable,
          csvExport: false,
          sort: false
        }
      ],
      data: []
    }
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  fetchSource = async () => {
    console.log("Source Data")
    let responseData = await fetchData.post(variables.api_url + 'public/get_source_by_org', {
      org_id: this.props.user_details.user_org_id
    });
    this.setState({ data: responseData.response })
    console.log('Source array: ', responseData)
  }
  sourceSubmitHandler = async () => {
    if (this.state.source === '') {
      this.setState({ isSourceError: true, SourceErrorMsg: 'This field cannot be empty!', isSourceDetailError: true, SourceDetailErrorMsg: 'This field cannot be empty!' })
    } else {
      try {
        let responseData = await fetchData.post(variables.api_url + 'public/add_source', {
          org_id: this.props.user_details.user_org_id,
          source_name: this.state.source
        });
        console.log("🚀 ~ file: Leadlist.js:17 ~ LeadList ~ componentDidMount=async ~ responseData:", responseData)
        if (responseData.statusCode === 200 && responseData.success === true) {
          this.fetchSource()
          this.setState({ source: "" })
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
  actionLable = (cell, row, rowIndex, formatExtraData) => {
    return (
      <>
        <label className="badge badge-success" onClick={() => { console.log("Upate : ", row.id) }}>Update</label>{" "}
        <label className="badge badge-info" onClick={() => { console.log("Delete : ", row.id) }}>Delete</label>
      </>
    )
  }
  componentDidMount = async () => {
    this.fetchSource()
  }
  render() {
    return (
      <div className="row w-100 mx-0">
        <div className="col-lg-12 mx-auto">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Source Details</h4>
              <form className="forms-sample">
                {this.state.isSourceError && this.state.source === '' ? <Form.Text id='lableforSource' className='text-danger mb-1'>{this.state.SourceErrorMsg}</Form.Text> : <></>}
                <Form.Group>
                  <Form.Control
                    name='source'
                    onChange={this.handleChange}
                    type="text" id="exampleInputUsername1" placeholder="Source" size="lg" />
                </Form.Group>
                <button type="button"
                  onClick={this.sourceSubmitHandler}
                  className="btn btn-primary mr-2 btn-md">Add</button>
                <button className="btn btn-light btn-md">Clear</button>
              </form>
            </div>
          </div>
        </div>
        <div className='col-lg-12 mt-2'>
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Source List</h4>
              <Tablesss data={this.state.data} columns={this.state.columns} />
            </div>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Source);
