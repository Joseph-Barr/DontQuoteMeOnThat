import React, {Component} from 'react';
import EditQuoteModal from './editQuoteModal'

export default class EditBtnCellRenderer extends Component {
    constructor(props) {
      super(props);
      this.btnClickedHandler = this.btnClickedHandler.bind(this);
    }
    btnClickedHandler() {
     this.props.clicked(this.props.value);
    }
    render() {
      return (
        <EditQuoteModal buttonLabel = 'Edit' />
      )
    }
}

//editHandler = {this.props.editHandler} jsonParsableQuote = {JSON.stringify(this.state.quote)}