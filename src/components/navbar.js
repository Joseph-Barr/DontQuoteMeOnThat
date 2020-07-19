import React, {Component} from 'react';
import {logout} from '../functions';

// The main navbar for the page
// Purely stateless component
export default class Navbar extends Component {
    render() {
        return (
            <div id = "navbar" align = "center">
                <div className = "navbar-element"><a href="/">Home</a></div>
                <div className = "navbar-element"><a href="/quote"> Quotes</a></div>
                <div className = "navbar-element"><a href="/profile"> My Quotes </a></div>


                {
                    localStorage.token !== undefined && localStorage.token !== 'undefined' ?
                    <div className = "navbar-element"><a href = "" onClick = { function(event) {logout();} }> Logout </a></div> 
                    :
                    <div className = "navbar-element"><a href="/login"> Login </a></div> 
                }
                
            </div> 
        )
    }
}