import React from "react";

import "../css/Menu.css";

class Menu extends React.Component {

  componentWillReceiveProps(nextProps) {
    this.toggleBtn(nextProps);
  }

  // Disable clicked button and reenable the previously clicked button
  handleOnClick = event => {
    let speedButtons = Array.from(document.querySelectorAll(".speed"));
    let tempButtons = Array.from(document.querySelectorAll(".temp"));
    let clickedButton = document.querySelector("#" + event.target.id);
    if(clickedButton.classList.contains('speed')) {
      speedButtons.forEach(element => {
        element.disabled = false;
      });
    } else if (clickedButton.classList.contains('temp')) {
      tempButtons.forEach(element => {
        element.disabled = false;
      });
    }
    clickedButton.disabled = true;
    let unit = event.target.value;
    this.props.handleConvertUnits(unit);
  }

  toggleBtn = (props) => {
    let measureButtons = Array.from(document.querySelectorAll(".measure"));
    let speed = props.ui.units.speed;
    let temp = props.ui.units.temperature;
    measureButtons.forEach(btn => {
      if(btn.innerHTML === speed || btn.innerHTML === temp) {
        btn.disabled = true;
      } else {
        btn.disabled = false;
      }
    })
  }

  render() {
    return <div className="menuContainer closed">
        <div className="menu">
          <button id="km" value="km/h" className="km measure speed" onClick={this.handleOnClick}>km/h</button>
          <button id="mph" value="mph" className="mi measure speed" onClick={this.handleOnClick}>mph</button>
          <button id="ms" value="m/s" className="ms measure speed" onClick={this.handleOnClick}>m/s</button>
          <button id="c" value="c" className="c measure temp" onClick={this.handleOnClick}>C</button>
          <button id="f" value="f" className="f measure temp" onClick={this.handleOnClick}>F</button>
        </div>
      </div>;
  }
}

export default Menu;
