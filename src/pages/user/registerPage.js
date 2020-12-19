import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import {redirectTo} from '../../functions';


export default class RegisterPage extends Component { 
    constructor(props) { 
        super(props);

        this.state = {
            username: "",
            password: "",
            confPassword: "",
            reqErr: {},
            redirectPath: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        if (event.target.name === "username") {
            this.setState({username: event.target.value});
        } else if (event.target.name === "password") {
            this.setState({password: event.target.value});
        } else if (event.target.name === "confPassword") {
            this.setState({confPassword: event.target.value});
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.registerRequest(this.state.username, this.state.password);
    }

    async registerRequest(username, password) {
        const reqURL = process.env.REACT_APP_API_URL + "/user/register";
        const reqOptions = {
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type": "application/json"},
            body: JSON.stringify({
                "username": username,
                // Password cant be encrypted clientside ??? 
                "password": password
              })
        };

        return fetch(reqURL, reqOptions)
        .then((res) => {
            if(res.status === 201) {
                redirectTo("/login");
            } else { 
                this.setState({reqErr: {errCode: res.status, errMsg: res.message}})
            }
        });
    }

    render() {
        return (
            <div style = {{ paddingTop: "20px"}} align = 'center'>
                <h2> Register Now: </h2>
                {
                    this.state.reqErr.errCode === 400 && 
                    <div className = "alert alert-danger" role="alert">
                        Invalid email or password
                    </div>
                }
                {
                    this.state.reqErr.errCode === 409 && 
                    <div className = "alert alert-warning" role="alert">
                        That user already exists!
                    </div>
                }
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                            <Label>
                                Username: 
                                <Input name = "username" type="text" value={this.state.username} onChange={this.handleChange} />
                            </Label>
                        </FormGroup>
                    <FormGroup>
                        <Label> Password: <Input name = "password" type = "password" value={this.state.password} onChange = {this.handleChange} /></Label>
                    </FormGroup>
                    <FormGroup>
                        <Label> Confirm Password: <Input name = "confPassword" type = "password" value={this.state.confPassword} onChange = {this.handleChange} /></Label>
                    </FormGroup>
                    <FormGroup>
                        <Button color = "primary" onClick = {this.handleSubmit}> Submit </Button> 
                    </FormGroup>
                </Form>
                {
                    (this.state.password !== this.state.confPassword) ?
                    <div className = "alert alert-danger" role="alert">
                        Passwords must match
                    </div>
                    : 
                    (this.state.password === "" & this.state.confPassword === "") ?
                    true
                    : 
                    <div className = "alert alert-success" role="alert">
                        Passwords Match!
                    </div>
                }
            </div>
        )
    }
}