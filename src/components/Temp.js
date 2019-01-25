import React from 'react';
import '../css/Temp.css';

class Temp extends React.Component {
    render() {
        return <div className="tempFrame">
            <h3>Temp Data: </h3>
            {/* <p>Humidity: {this.props.temperature.humidity}</p> */}
            {/* <p>Pressure: {this.props.temperature.pressure}</p> */}
            {/* <p>Temp: {this.props.temperature.temperature}</p> */}
          </div>;
    }
}

export default Temp;