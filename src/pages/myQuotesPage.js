import React, {Component} from 'react';
import Quote from '../components/quote';
import { API_URL } from '../config';
import { Button } from 'reactstrap';

export default class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resStatus: 0,
            quotes: []
        }
        this.getAllUserQuotes();
    }

    getAllUserQuotes() {
        const headers = {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + localStorage.token
        }
        fetch(API_URL + "/quote/user/all", {headers})
        .then(res => {
            this.setState({resStatus: res.status});
            return res;
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                quotes: data.quotes
            })
        })
    }

    render() {
        return (
            <div>
                <h1> Your Quotes: </h1>
               { this.state.quotes.map(quote => <Quote text = {quote.text} by = {quote.by} year = {quote.year} />) }
            </div>
        )
    }
}