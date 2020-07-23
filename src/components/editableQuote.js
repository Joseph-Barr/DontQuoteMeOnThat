import React, {Component} from 'react';
import { Button, Container, Row, Col } from 'reactstrap';
import {API_URL} from '../config';


// Component that provides the functionality for a user to modify their quotes
	// Must be passed an edit and delete handler functions
export default class EditableQuote extends Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.state = {
			quote: {
				id: props.id,
				text: props.text,
				by: props.by,
				year: props.year
			}
		}
	}

	// Each instance of this must be wrapped in a container as it returns a row
	render() {
		return (
				<Row>
					<Col>
						{this.state.quote.text}
					</Col>
					<Col>
						{this.state.quote.by + ", " + this.state.quote.year}
					</Col>
					<Col>
					 	<Button color = 'primary' onClick = { this.props.editHandler } value = {this.state.quote.id} > Edit </Button>
					 	<Button color = 'danger' onClick = { this.props.deleteHandler } value = {this.state.quote.id} > Delete </Button>
					</Col>
				</Row>
		)
	}
		
}