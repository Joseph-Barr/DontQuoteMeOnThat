import React, {Component} from 'react';
// import {logout} from './Logout';

// The main navbar for the page
// Purely stateless component
export default class Navbar extends Component {
    render() {
        console.log(localStorage.token);
        return (
            <div id = "navbar" align = "center">
                <div className = "navbar-element"><a href="/">Home</a></div>
                <div className = "navbar-element"><a href="/quotes"> Quotes</a></div>
                <div className = "navbar-element"><a href="/profile"> My Quotes </a></div>


                {
                    localStorage.token !== "undefined" ?
                    <div className = "navbar-element"><a href = "" onClick = { console.log("Logout") /* function(event) {logout();} */}> Logout </a></div> 
                    :
                    <div className = "navbar-element"><a href="/login"> Login </a></div> 
                }
                
            </div> 
        )
    }
}