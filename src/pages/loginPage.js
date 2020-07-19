import React, {Component} from 'react';

import {API_URL} from '../config';
//import jwt from 'jsonwebtoken';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import {redirectTo} from '../functions';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            resStatus: 0,
            redirectPath: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) { 
        if (event.target.name === "username") {
            this.setState({username: event.target.value});
        } else if (event.target.name === "password") {
            this.setState({password: event.target.value});
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        
        // Make API request here
        this.login(this.state.username, this.state.password);
    }

     async login(username, password) {
        const url = API_URL + '/user/login';
        const requestOptions = {
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type": "application/json"},
            body: JSON.stringify({
                "username": username,
                // Password cant be encrypted clientside ??? 
                "password": password
              })
        }
    
        return await fetch(url, requestOptions)
        .then(res => {
            this.setState({resStatus: res.status});
            return res;
        })
        .then((res) => res.json())
        .then((res) => {localStorage.setItem("token", res.token); return res})
        .then((res) => {
            if (!res.error) {
                redirectTo("/");
            }
            return res; 
        })
        .catch(error => () => {});
    }

    render() {
        return (
            <div>
                {
                    this.state.resStatus === 401 &&
                    <div className = "alert alert-danger" role="alert" align = 'center'>
                            Incorrect Username Or Password
                    </div>
                }
                {
                    this.state.resStatus === 400 &&
                    <div className = "alert alert-danger" role="alert" align = 'center'>
                            Username Or Password Missing
                    </div>
                }
                <div className = "loginFormContainer" align = "center">
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label>
                                Username: 
                            <Input name = "username" type="text" value={this.state.username} onChange={this.handleChange} /></Label>
                            </FormGroup>
                        <FormGroup>
                            <Label> Password: <Input name = "password" type = "password" value={this.state.password} onChange = {this.handleChange} /></Label>
                        </FormGroup>
                        <FormGroup>
                            <input type="submit" value="Submit" className="btn btn-secondary" /> 
                        </FormGroup>
                    </Form>

                    <small className="text-muted">Don't have an account? <a href = "/register"> Register Now</a></small>
                </div>
            </div>
        )
    }
}

