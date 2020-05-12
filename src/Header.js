import React, {Component} from "react";
import "./Header.css";
import dark from "./imgs/dark.jpg";

class Header extends Component {

    render() {
        return (<header><img src={dark} className="darkbg" alt="background"/></header>);
    }
}


export default Header;