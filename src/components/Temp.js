import React from 'react';
import '../css/Temp.css';

class Temp extends React.Component {
    render() {
        return <div className="tempFrame">
            <h3>Temp Data: </h3>
            <p>Humidity: {this.props.temp.humidity}</p>
            <p>Pressure: {this.props.temp.pressure}</p>
            <p>Temp: {this.props.temp.temp}</p>
            <p>Temp_max: {this.props.temp.temp_max}</p>
            <p>Temp_min: {this.props.temp.temp_min}</p>
          </div>;
    }
}

export default Temp;