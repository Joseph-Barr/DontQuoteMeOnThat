import React, {Component} from 'react';
import { Button, Row, Col, ButtonGroup } from 'reactstrap';
import EditQuoteModal from './editQuoteModal';


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
				year: props.year,
				public : props.public

			}
		}
	}

	// Each instance of this must be wrapped in a container as it returns a row
	render() {
		return (
				<Row className = 'editQuoteRow' align = 'center'>
					<Col>
						{this.state.quote.text}
					</Col>
					<Col>
						{this.state.quote.by + ", " + this.state.quote.year}
					</Col>
					<Col className = 'col-sm-4'>
						<ButtonGroup>
							<EditQuoteModal buttonLabel = 'Edit' editHandler = {this.props.editHandler} jsonParsableQuote = {JSON.stringify(this.state.quote)} />
							<Button color = 'danger' onClick = { this.props.deleteHandler } value = {this.state.quote.id} > Delete </Button>
						 </ButtonGroup>
					</Col>
				</Row>
		)
	}
		
}