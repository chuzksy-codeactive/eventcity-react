import HeaderVideo from './HeaderVideo';
import React, { Component } from 'react';

/**
 * This component handles video playing 
 * on the landing page
 *
 * @class {CoverPage} 
 * @return {object} JSX DOM
 */
class CoverPage extends Component {
  render() {

    return (
      <div>
        <HeaderVideo history={this.props.history}/>
      </div>
    );
  }
}

export default CoverPage;
