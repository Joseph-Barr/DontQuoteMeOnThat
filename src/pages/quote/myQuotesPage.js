import React, {Component} from 'react';
import EditableQuote from '../../components/editableQuote';
import CreateQuoteModal from '../../components/createQuoteModal';
import EditBtnCellRenderer from '../../components/EditButtonCellRenderer';
import { API_URL } from '../../config';

import { Button, Container, Row, Col } from 'reactstrap';
import { redirectTo } from '../../functions';

// AG Grid
import { AgGridReact } from 'ag-grid-react';


export default class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resStatus: 0,
            quotes: [],
            gridOptions: {
                frameworkComponents: {
                    editBtnCellRenderer: EditBtnCellRenderer,
                }
            },
            columnDefs: [{
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
                        }
                    ]
        };
        
        //this.getAllUserQuotes = this.getAllUserQuotes.bind(this);
        this.getAllUserQuotes();

        //this.deleteQuote = this.deleteQuote.bind(this);
    }

    getAllUserQuotes() {
        const headers = {
            authorization: 'Bearer ' + localStorage.token,
            accept: "application/json",
            "Content-Type": "application/json",
        };
        console.log(headers);
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
                quotes: this.state.quotes.filter(quote => quote._id !== quoteID)
            });
        })
        .catch((err) => {
            console.log(err);
            //this.setState({resStatus: err.status})
        });
    }

    createQuote = event => {
        // Quote body will only parse the values for text, by, year and public. All other fields will be ignored
        const reqBody = event.target.value;
        console.log(reqBody);
        const options = {
            method: 'POST',
            headers: { "Accept": "application/json", "Content-Type": "application/json", 'Authorization': ('Bearer ' + localStorage.token) },
            body: reqBody
        };

        fetch(API_URL + '/quote/create', options)
        .then(res => {this.setState({resStatus: res.status}); return res})
        .then((res) => res.json())
        .then(res => {
            console.log(res);
            if (this.state.resStatus === 200) {
                // Read state
                let newQuoteState = this.state.quotes;
                newQuoteState.unshift(res.quote);
                console.log(newQuoteState);

                // Update state with quote
                this.setState({quotes: newQuoteState});
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
        if (localStorage.token === undefined) {
            redirectTo('/login');
        }



        return (

            <div
                className="ag-theme-alpine"
                style={{
                height: '250px',
                width: '600px' }}
              >
                <AgGridReact
                    gridOptions = { this.state.gridOptions }
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.quotes}>
                </AgGridReact>
            </div>

        )
    }
}
/*
            <div>
                <h1> Your Quotes: </h1>
                {
                    this.state.quotes.length <= 0 && 
                    <div className = "alert alert-danger" role="alert" align = 'center'>
                        You haven't quoted anything yet
                    </div>
                }
                <Row>
                    <Col align = 'center' style = {{padding: '20px'}}>
                        <CreateQuoteModal reactButtonColor = 'success' buttonLabel = 'New Quote' createHandler = {this.createQuote}/>
                    </Col>
                </Row>
                <Container>
                    { this.state.quotes.map(quote => <EditableQuote key = { quote._id } id = { quote._id } value = { quote._id } text = {quote.text} by = {quote.by} year = {quote.year} public = {quote.public} editHandler = { this.editQuote } deleteHandler = { this.deleteQuote } />) }
                </Container>
            </div>

            */