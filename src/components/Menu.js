import React from "react";

import "../css/Menu.css";

class Menu extends React.Component {

  componentDidMount() {
  }

  handleOnClick = (event) => {
    let unit = event.target.value;
    this.props.handleConvertUnits(unit, this.props.weatherData);
  }

  render() {
    return <div className="menuContainer closed">
        <div className="menu">
          <button id="km" value="km/h" className="km measure" onClick={this.handleOnClick}>km/h</button>
          <button id="mi" value="mph" className="mi measure" onClick={this.handleOnClick}>mph</button>
          <button id="c" value="c" className="c measure" onClick={this.handleOnClick}>C</button>
          <button id="f" value="f" className="f measure" onClick={this.handleOnClick}>F</button>
        </div>
      </div>;
  }
}

export default Menu;
