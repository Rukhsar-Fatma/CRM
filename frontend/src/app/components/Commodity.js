import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import fetchData from '../elements/FetchApi';
import Tablesss from '../elements/Tablesss';
import variables from '../../constatnts/variables';
import { connect } from 'react-redux';

export class Commodity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commodity: '',
      comDetail: '',
      iscommodityErrror: false,
      iscomDetailError: false,
      commodityErrrorMsg: '',
      comDetailErrorMsg: '',
      columns: [
        { dataField: "id", text: "id", sort: true },
        { dataField: "commodity_name", text: "Name", sort: true },
        { dataField: "commodity_desc", text: "Description", sort: true },
        { dataField: "action", text: "Actions", formatter: this.actionLable, sort: false }
      ],
      data: [],
      responseData: {}
    }
  }
  fetchCommodity = async () => {
    console.log("Commodity Data")
    let responseData = await fetchData.post(variables.api_url + 'public/get_commodity_by_org', {
      org_id: this.props.user_details.user_org_id
    });
    this.setState({data : responseData.response})
    console.log('Commodity array: ', responseData)
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  };
  commoditySubmitHandler = async () => {
    if (this.state.commodity === '' || this.state.comDetail === '') {
      this.setState({
        iscommodityErrror: true,
        commodityErrrorMsg: 'This field cannot be empty!',
        iscomDetailError: true,
        comDetailErrorMsg: 'This field cannot be empty!'
      })
    } else {
      try {
        let responseData = await fetchData.post(variables.api_url + 'public/add_commodity', {
          org_id: this.props.user_details.user_org_id,
          commodity_name: this.state.commodity,
          commodity_desc: this.state.comDetail
        });
        console.log("🚀 ~ file: Leadlist.js:17 ~ LeadList ~ componentDidMount=async ~ responseData:", responseData)
        if (responseData.statusCode === 200 && responseData.success === true) {
          this.fetchCommodity()
          this.setState({commodity: "", comDetail: ""})
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
  actionButtons = () => {
    return (
      <>
        <button type="button" onClick={() => { this.handleShowModelBoxLeadAdd() }} className="btn btn-primary"><i className="mdi mdi-upload"></i></button>
        <button type="button" onClick={() => { this.handleShowModelBoxLeadUpload() }} className="btn btn-primary"><i className="mdi mdi-playlist-plus"></i></button>
      </>
    )
  }
  componentDidMount = async () => {
    this.fetchCommodity();
  }
  render() {
    return (
      <div>
        <div className="row w-100 mx-0">
          <div className="col-lg-12 mx-auto">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Commodity Details</h4>
                <form className="forms-sample">
                  {this.state.iscommodityErrror && this.state.commodity === '' ? <Form.Text id='lableforCommodity' className='text-danger mb-1'>{this.state.commodityErrrorMsg}</Form.Text> : <></>}
                  <Form.Group>
                    <Form.Control
                      onChange={this.handleChange}
                      value={this.state.commodity}
                      name="commodity"
                      type="text" id="exampleInputUsername1" placeholder="Commodity" size="lg" />
                  </Form.Group>
                  {this.state.iscomDetailError && this.state.comDetail === '' ? <Form.Text id='lableforCommodityDetail' className='text-danger mb-1'>{this.state.comDetailErrorMsg}</Form.Text> : <></>}
                  <Form.Group>
                    <textarea
                      onChange={this.handleChange}
                      value={this.state.comDetail}
                      name="comDetail"
                      className="form-control" id="exampleTextarea1" rows="4" placeholder="Commodity Details"></textarea>
                  </Form.Group>
                  <button
                    type="button"
                    onClick={this.commoditySubmitHandler}
                    className="btn btn-primary mr-2 btn-md">Add</button>
                  <button className="btn btn-light btn-md">Clear</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Commodity);
