import React, {Component} from "react";
import "./Footer.css";

class Author extends Component {
    render() {
        return (<h4 className="footer-author">{"Andrew x K."} </h4>);
    }
}

class CopyRight extends Component {
    render() {
        return (
            <p className={"copyRight"}>{"ООО \"Да помогут нам всевышние силы\""}<br/>{"© all rights reserved"}</p>
        );
    }
}

class Footer extends Component {

    render() {
        return (
            <footer>
                <Author/>
            </footer>
        );
    }
}

export default Footer;