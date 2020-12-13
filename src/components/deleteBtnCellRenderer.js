import React, {Component} from 'react';
import {Button} from 'reactstrap';

export default class DeleteBtnCellRenderer extends Component {
    constructor(props) {
      super(props);
      this.btnClickedHandler = this.btnClickedHandler.bind(this);
    }

    btnClickedHandler() {
     this.props.clicked(this.props.value);
    }

    render() {
      return (
        <Button color = 'danger' size = 'sm' onClick = { this.props.deleteHandler } value = { this.props.data.id }> Delete </Button>
      )
    }
}
