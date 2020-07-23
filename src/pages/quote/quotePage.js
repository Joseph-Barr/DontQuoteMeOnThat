import React, {Component} from 'react';
import Quote from '../../components/quote';
import { API_URL } from '../../config';
import { Button } from 'reactstrap';

export default class QuotePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quote: {
                text: '',
                by: '',
                year: ''
            }
        }
        this.getRandomQuote = this.getRandomQuote.bind(this);

        this.getRandomQuote();

    }

    getRandomQuote() {
        fetch(API_URL + "/quote/random")
        .then(res => res.json())
        .then(quote => {
            this.setState({
                quote: {
                    text: quote.text,
                    by: quote.by,
                    year: quote.year
                }
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <div>
                <Quote text = {this.state.quote.text} by = {this.state.quote.by} year = {this.state.quote.year} />

                <div align = 'center' style = {{padding: '20px'}}> 
                    <Button color = 'primary' onClick = { this.getRandomQuote }> Another One </Button>
                </div>
            </div>
        )
    }
}