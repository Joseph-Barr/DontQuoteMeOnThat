import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Label, Input, FormGroup } from 'reactstrap';

// Similar to createQuoteModal, except that it takes additional props to define the values of the form fields
const EditQuoteModal = (props) => {
	// Store props
	const {
	buttonLabel,
	size,
	className,
	editHandler,
	// This prop defines the default values for the quote, must be a JSON parsable string
	jsonParsableQuote
	} = props;

	const getQuoteObj = () => {
		if (jsonParsableQuote) {
			return JSON.parse(jsonParsableQuote);
		} else {
			return '';
		}
		
	};

	// Hooks to keep track of state
	const [modal, setModal] = useState(false);
	// Init default state values
	const [newQuote, setNewQuote] = useState(
		// Set all values here
		getQuoteObj
	);

	const [stringified, setStringified] = useState(JSON.stringify(newQuote));

	const toggle = () => setModal(!modal);

	const submitClick = (event) => {
		editHandler(event);
		toggle();
	};

	const handleChange = (event) => {
		event.preventDefault();
		let newState = newQuote;
		if (event.target.id === 'public') {
			// Convert the values from string too bool
			newState[event.target.id] = event.target.value === 'true' ? true : false;
		} else {
			newState[event.target.id] = event.target.value;
		}
		// Update the new quote state
		setNewQuote(newState);
		// Update the state of the save button
		setStringified(JSON.stringify(newState));
	}

	return (
	<div>
	  <Button color='primary' size = {size} onClick={toggle}>{buttonLabel}</Button>
	  <Modal isOpen={modal} toggle={toggle} className={className}>
	  	<ModalHeader toggle={toggle}><b>Edit Quote</b></ModalHeader>
	    <ModalBody>
	    	<Form>
	    		<FormGroup>
	    			<Label for = 'text' > Quote Text</Label>
	    			<Input type = 'textarea' placeholder = 'Quote Goes Here' id = 'text' value = { newQuote.text } onChange = {handleChange} maxLength = '255'> </Input>
	    			<br></br>
	    			<Label for = 'by'> By </Label>
	    			<Input type = 'text' placeholder = 'Who Said It' id = 'by' value = { newQuote.by } onChange = {handleChange}> </Input>
	    			<br></br>
	    			<Label for = 'year'> Year </Label>
	    			<Input type = 'number' placeholder = 'When did they say it' id = 'year' value = { newQuote.year } onChange = {handleChange}> </Input>
	    			<br></br>
	    			<Label for="public">Visibility</Label>
			        <Input type="select" name="select" id="public" value = { newQuote.public } onChange = {handleChange}>
			        	<option value = {true} >Public</option>
			        	<option value = {false}>Private</option>
			        </Input>
	    		</FormGroup>
	    	</Form>
	    </ModalBody>
	    <ModalFooter>
	      <Button color="primary" onClick = {submitClick} value = { stringified }> Save </Button>{' '}
	      <Button color="secondary" onClick = {toggle} > Cancel </Button>
	    </ModalFooter>
	  </Modal>
	</div>
	);
}

export default EditQuoteModal;