import React from 'react';

import '../css/Nav.css';

class Nav extends React.Component {
    render() {
        return <div className="navContainer">
            <div className="nav">
              <h2>The Weather App</h2>
              <div className="menuBtnFrame" onClick={this.props.toggleMenu}>
                <div className="menuBtnLine btnLine1" />
                <div className="menuBtnLine btnLine2" />
                <div className="menuBtnLine btnLine3" />
              </div>
            </div>
          </div>;
    }
}

export default Nav;