import React, {Component} from 'react';
import Quote from '../../components/quote';
import { API_URL } from '../../config';
import { Button, Row, Col, Card, CardTitle, CardText, Jumbotron } from 'reactstrap';
import QuoteCard from '../../components/quoteCard';

export default class QuotePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quotes: []
        }
        this.getRandomQuote = this.getRandomQuote.bind(this);

        this.getQuoteList();

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

    getQuoteList(limit) {
        fetch(API_URL + '/quote')
        .then(res => res.json())
        .then(quotes => {
            this.setState({
                quotes: quotes.quotes
            })
            console.log(this.state.quotes);
        })
        .catch(err => {
            console.log(err);
        })
    }

    // Splits the quotes into cards and formats the table
    createCards() {
        let rows = [];
        let count = 0;
        for (let i = 0; i < this.state.quotes.length; i += 3) {
            if (count % 3 === 0) {
                 count += 1;
            }
            let temp = [
                this.state.quotes[i],
                this.state.quotes[i + 1],
                this.state.quotes[i + 2]
            ]
            rows.push(temp);

        }
        
        return (
            <div>
                {rows.map((row, index) => {
                    return (
                        <Row key = {index.toString()} className = 'quoteCardRow'>
                            {row.map(item => {
                                console.log(item._id);
                                return (<Col key = {item._id}>
                                            <QuoteCard _id = {item._id} text = {item.text} by = {item.by} year = {item.year} />
                                        </Col>)
                            })}
                        </Row>
                    )
                })}
            </div>
        )
    }

    render() {
        
        return (
            <div> 
                <Jumbotron fluid align = 'center'>
                    <h1 className="display-3">Dumb Stuff People Have Said</h1>
                </Jumbotron>
                {this.createCards()}
            </div>
        )
    }
}
