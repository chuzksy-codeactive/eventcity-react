import HeaderVideo from './HeaderVideo';

import React, { Component } from 'react';

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
