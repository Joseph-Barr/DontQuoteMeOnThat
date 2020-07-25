import React, {Component} from 'react';
import EditableQuote from '../../components/editableQuote';
import CreateQuoteModal from '../../components/createQuoteModal';
import { API_URL } from '../../config';

import { Button, Container, Row, Col } from 'reactstrap';
import { redirectTo } from '../../functions';

export default class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resStatus: 0,
            quotes: []
        };
        //this.getAllUserQuotes = this.getAllUserQuotes.bind(this);
        this.getAllUserQuotes();

        //this.deleteQuote = this.deleteQuote.bind(this);
    }

    getAllUserQuotes() {
        const headers = {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + localStorage.token
        };
        fetch(API_URL + "/quote/user/all", {headers})
        .then(res => {
            this.setState({resStatus: res.status});
            return res;
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                quotes: data.quotes.reverse()
            });
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
        const quoteID = reqBody._id;
        const options = {
            method: 'POST',
            headers: { "Accept": "application/json", "Content-Type": "application/json", 'Authorization': ('Bearer ' + localStorage.token) },
            body: reqBody
        }
        console.log(reqBody);

        fetch(API_URL + '/quote/edit/' + quoteID, options)
        .then(res => {this.setState({resStatus: res.status}); return res;})
        .then(res => {console.log(res); return res;})
        .then((res) => res.json())
        .then(res => {
            // Copy current state
            let newState = this.state.quotes;
            // Get the index of the updated item in the current state
            const quoteIndex = this.state.newState.findIndex(quote => quote._id === quoteID );

            // Update values
            Object.keys(newState[quoteIndex]).forEach(key => newState[quoteIndex][key] = res.values[key]);
            // Push change
            this.setState(newState);

            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        if (localStorage.token === undefined) {
            redirectTo('/login');
        }
        return (
            <div>
                <h1> Your Quotes: </h1>
                <Row>
                    <Col align = 'center' style = {{padding: '20px'}}>
                        <CreateQuoteModal reactButtonColor = 'success' buttonLabel = 'New Quote' createHandler = {this.createQuote}/>
                    </Col>
                </Row>
                <Container>
                    { this.state.quotes.map(quote => <EditableQuote key = { quote._id } id = { quote._id } value = { quote._id } text = {quote.text} by = {quote.by} year = {quote.year} public = {quote.public} editHandler = { this.editQuote } deleteHandler = { this.deleteQuote } />) }
                </Container>
            </div>
        )
    }
}

