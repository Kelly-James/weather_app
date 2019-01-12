import React from 'react';
import '../css/Nav.css';

class Nav extends React.Component {
    render() {
        return (
            <div className="navContainer">
                <div className="nav">
                    <div className="menuBtnFrame" onClick={this.props.toggleMenu}>
                        <div className="menuBtnLine btnLine1"></div>
                        <div className="menuBtnLine btnLine2"></div>
                        <div className="menuBtnLine btnLine3"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Nav;