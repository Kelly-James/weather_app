import React from "react";

import "../css/Menu.css";

class Menu extends React.Component {

  componentDidMount() {
  }

  render() {
    return <div className="menuContainer closed">
        <div className="menu">
          <button className="cKm measure">C, km/h</button>
          <button className="fM measure">F, mph</button>
          <button className="cM measure">C, mph</button>
          <button className="cMs measure">C, m/s</button>
        </div>
      </div>;
  }
}

export default Menu;
