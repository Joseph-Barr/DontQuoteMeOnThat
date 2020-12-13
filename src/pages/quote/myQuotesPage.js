import React, {Component} from 'react';
import EditBtnCellRenderer from '../../components/EditButtonCellRenderer';
import DeleteBtnCellRenderer from '../../components/deleteBtnCellRenderer';
import { API_URL } from '../../config';

import { redirectTo } from '../../functions';

// AG Grid
import { AgGridReact } from 'ag-grid-react';
import CreateQuoteModal from '../../components/createQuoteModal';


export default class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resStatus: 0,
            quotes: [],
            gridOptions: { // Controls for the AG Grid
                frameworkComponents: {
                    editBtnCellRenderer: EditBtnCellRenderer,
                    deleteBtnCellRenderer: DeleteBtnCellRenderer
                },
                defaultColDef: {
                    resizable: true
                },
                onGridReady: function(params) {
                    // Make the ID invisible
                    params.columnApi.setColumnVisible('_id', false);
                },
            },
            columnDefs: [
                        {
                            headerName: "_id", field: "_id", supressToolPanel: true
                        },
                        {
                            headerName: "Quote", field: "text"
                        },
                        {
                            headerName: "By", field: 'by'
                        },
                        {
                            headerName: "Year", field: 'year'
                        },
                        {
                            headerName: 'Edit',
                            cellRenderer: 'editBtnCellRenderer',
                            cellRendererParams: {
                                editHandler: this.editQuote
                            }
                        },
                        {
                            headerName: 'Delete',
                            cellRenderer: 'deleteBtnCellRenderer',
                            cellRendererParams: {
                                deleteHandler: this.deleteQuote
                            }
                        }
                    ]
        };
        
        //this.getAllUserQuotes = this.getAllUserQuotes.bind(this);
        this.getAllUserQuotes();
    }

    getAllUserQuotes() {
        const headers = {
            authorization: 'Bearer ' + localStorage.token,
            accept: "application/json",
            "Content-Type": "application/json",
        };
        fetch(API_URL + "/quote/user/all", {headers})
        .then(res => {
            this.setState({resStatus: res.status});
            return res;
        })
        .then(res => res.json())
        .then(data => {
            // When rows are actually returned
            if (data.quotes !== undefined) {
                this.setState({
                    // Set the quotes in the state to the returned results, latest quote first
                    quotes: data.quotes.reverse()
                });
            }
        });
    }

    deleteQuote = event => {
        const quoteID = event.target.value;
        const headers = {
            method: 'DELETE',
            headers: { "Accept": "application/json", "Content-Type": "application/json", 'Authorization': ('Bearer ' + localStorage.token) },
        };


        fetch((API_URL + '/quote/delete/' + quoteID), headers)
        .then(res => res.json())
        .then(res => {
            // Update state, cause re-rendering of component
            this.setState({
                // Filter the stored quotes, only keeping quotes where _id is not the requested ID
                quotes: this.state.quotes.filter(quote => quote._id !== quoteID)
            });
            this.state.gridOptions.api.refreshCells();
        })
        .catch((err) => {
            console.log(err);
            //this.setState({resStatus: err.status})
        });
    }

    createQuote = event => {
        // Quote body will only parse the values for text, by, year and public. All other fields will be ignored
        const reqBody = event.target.value;
        const options = {
            method: 'POST',
            headers: { "Accept": "application/json", "Content-Type": "application/json", 'Authorization': ('Bearer ' + localStorage.token) },
            body: reqBody
        };

        fetch(API_URL + '/quote/create', options)
        .then(res => {this.setState({resStatus: res.status}); return res})
        .then((res) => res.json())
        .then(res => {
            if (this.state.resStatus === 200) {
                // Read state
                let newQuoteState = this.state.quotes;
                newQuoteState.unshift(res.quote);

                // Update state with quote
                this.setState({quotes: newQuoteState});

                // Queue a transaction to update row 0 of the table
                this.state.gridOptions.api.applyTransaction({add: [res.quote]});
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    editQuote = event => {
        const reqBody = event.target.value;
        // Remove any unchanged fields here
        
        const quoteID = JSON.parse(reqBody)._id;
        const options = {
            method: 'POST',
            headers: { "Accept": "application/json", "Content-Type": "application/json", 'Authorization': ('Bearer ' + localStorage.token) },
            body: reqBody
        }

        fetch(API_URL + '/quote/edit/' + quoteID, options)
        .then(res => {this.setState({resStatus: res.status}); return res;})
        .then((res) => res.json())
        .then(res => {
            if (this.state.resStatus === 200) {
                // Copy current state
                let newState = this.state.quotes;
                // Get the index of the updated item in the current state
                const quoteIndex = newState.findIndex(quote => quote._id === quoteID);

                // Update Values
                Object.keys(newState[quoteIndex]).forEach(key => newState[quoteIndex][key] = res.values[key]);

                // Set the _id and creator as they are seperate to the returned new values
                newState[quoteIndex]._id = res.updated._id;
                newState[quoteIndex].creator = res.updated.creator;

                // Push change
                this.setState({quotes: newState});
                this.state.gridOptions.api.refreshCells();
            } else {
                // Error Message
            }
            
        })
        .catch(err => {
            console.log(err);
        });
    }

    render() {
        if (localStorage.token === undefined || localStorage.token === 'undefined') {
            redirectTo('/login');
        }

        return (
            <div align = 'center'> 
                <div className = 'profileGrid'>
                    <div
                        className="ag-theme-alpine"
                        style={{
                        height: '75%',
                        width: '100%'}}
                    >
                        <AgGridReact
                            gridOptions = { this.state.gridOptions }
                            columnDefs = {this.state.columnDefs}
                            rowData = {this.state.quotes}>
                        </AgGridReact>
                    </div>
                </div>
                <CreateQuoteModal buttonLabel = 'Create' reactButtonColor = 'success' createHandler = { this.createQuote } size = 'lg' />
            </div>

        )
    }
}
