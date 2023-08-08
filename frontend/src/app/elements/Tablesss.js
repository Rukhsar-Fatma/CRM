import React, { Component } from 'react'
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

class Tablesss extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    };
    componentDidMount() {
        console.log("Table Content: ", this.props)
    }
    render() {
        let ActionButtons;
        const { SearchBar, ClearSearchButton } = Search;
        const { ExportCSVButton } = CSVExport;
        if (this.props.actionButtons) {
            ActionButtons = this.props.actionButtons;
        }
        return (
            <div>
                <div>
                    {this.props.data && this.props.data.length !== 0 ?
                        <ToolkitProvider
                            keyField="id"
                            data={this.props.data.map((item, index) => ({ ...item, id: index }))}
                            columns={this.props.columns.map((column) => ({
                                ...column,
                                dataFormat: (cell, row, rowIndex) => {
                                    return {
                                        id: rowIndex,
                                        [column.dataField]: cell,
                                    };
                                },
                            }))}
                            search
                            columnToggle
                        >
                            {
                                props => (
                                    <div>
                                        <div className='card-description'>
                                            <div className='form-group'>
                                                <div className='row'>
                                                    <div className='col-md-8 col-sm-12'>
                                                        <SearchBar className="form-control" {...props.searchProps} />
                                                        <ClearSearchButton className='btn btn-success ml-2 text-white' {...props.searchProps} />
                                                    </div>
                                                    <div className='col-md-4 col-sm-12 text-right'>
                                                        <div className="btn-group" role="group">
                                                            <ExportCSVButton className='btn btn-success text-white' {...props.csvProps}><i className="mdi mdi-download"></i></ExportCSVButton>
                                                            {this.props.actionButtons ? <ActionButtons /> : <></>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='table-responsive-md'>
                                            <BootstrapTable
                                                bootstrap4
                                                hover
                                                bordered={false}
                                                pagination={paginationFactory({ sizePerPage: 5 })}
                                                {...props.baseProps}
                                            />
                                        </div>
                                    </div>
                                )
                            }
                        </ToolkitProvider> :
                        <div>
                            <div className='row'>
                                <div className='col-md-4 col-sm-12'>
                                    <div className="btn-group" role="group">
                                        {this.props.actionButtons ? <ActionButtons /> : <></>}
                                    </div>
                                </div>
                            </div>
                            <hr></hr>
                            <div className='text-danger text-center'>No Data!</div>
                        </div>}
                </div>
            </div>
        )
    }
}
export default Tablesss;