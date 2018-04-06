import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CoverInfo extends Component {
  render() {
    return (
      <div className="info">
        <div>
          <h1>Welcome to EventCity!</h1>
        </div>
        <div>
          <p>
            At EventCity! we pride ourselves on the unrivalled personal {`event`} services, we provide to our clientele. We guide you from the
            stressful decision making {`process`}, ensuring you are comfortable, whether it is a wedding, corporate {`function `}or even a kiddies
            party, we create a buzz around you, taking you to the next level.
          </p>
        </div>
        <div>
          <h3>Innovation, {`Performance`} and Delivery</h3>
        </div>
        <Link to="/login">
          <button type="button" className="btn btn-success btn-lg">
            Sign In here
          </button>
        </Link>
      </div>
    );
  }
}

export default CoverInfo;
