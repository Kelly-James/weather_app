import React from 'react';
import '../css/Sun.css';

class Sun extends React.Component {
    render() {
        return (
            <div className="sunFrame">
                <h3>Sun Data: </h3>
                {/* <p>Sunrise: {this.props.sun.sunrise}</p> */}
                {/* <p>Sunset: {this.props.sun.sunset}</p> */}
            </div>
        )
    }
}

export default Sun;