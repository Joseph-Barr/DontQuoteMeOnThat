import React, { Component } from 'react';
import {Jumbotron, Button} from 'reactstrap';
import { API_URL } from '../../config';

export default class QuoteLinkPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quote: {
                text: 'Getting Quote...',
                by: '',
                year: 0,
                id: ''
            }
        }
    }

    getQuote() {
        let quoteID = window.location.pathname.split('/')[2];
        console.log(API_URL + '/quote/' + quoteID);
        fetch(API_URL + '/quote/' + quoteID)
        .then(res => res.json())
        .then(res => {
            this.setState({quote: res.quote})
            console.log(this.state.quote)
        })
        .catch(err => console.log(err));
    }

    componentDidMount() {
        this.getQuote();
    }

    render() {
        return(
            <div>
                <Jumbotron fluid align = 'center'>
                    <h1 className="display-3">{this.state.quote.text}</h1>
                    <p className="lead">{this.state.quote.by}</p>
                    <hr className="my-2" />
                    <p>{this.state.quote.year ? this.state.quote.year : ''}</p>
                    <Button color="primary" onClick = ''> Copy Link </Button>
                </Jumbotron>
            </div>
        )
    }
}
