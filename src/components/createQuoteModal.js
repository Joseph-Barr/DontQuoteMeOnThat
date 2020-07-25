import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Label, Input, FormGroup } from 'reactstrap';

const CreateQuoteModal = (props) => {
	// Store props
	const {
	buttonLabel,
	className,
	reactButtonColor,
	createHandler
	} = props;

	const currentYear = new Date().getFullYear();

	// Hooks to keep track of state
	const [modal, setModal] = useState(false);
	// Init default state values
	const [newQuote, setNewQuote] = useState({
		year: currentYear,
		public: true
	});

	const [stringified, setStringified] = useState(JSON.stringify(newQuote));

	const toggle = () => setModal(!modal);

	const submitClick = (event) => {
		createHandler(event);
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
		setNewQuote(newState);
		setStringified(JSON.stringify(newState));
	};

	return (
	<div>
	  <Button color={reactButtonColor} onClick={toggle}>{buttonLabel}</Button>
	  <Modal isOpen={modal} toggle={toggle} className={className}>
	  	<ModalHeader toggle={toggle}><b>New Quote</b></ModalHeader>
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
	      <Button color="success" onClick = {submitClick} value = { stringified }> Create </Button>{' '}
	      <Button color="secondary" onClick = {toggle} > Cancel </Button>
	    </ModalFooter>
	  </Modal>
	</div>
	);
}

export default CreateQuoteModal;