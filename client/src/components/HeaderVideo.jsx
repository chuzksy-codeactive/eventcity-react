import React from 'react';
import Signup from '../containers/SignUpFormContainer';
import CoverInfo from './CoverInfo';

const HeaderVideo = props => {
  return (
    <div className="video-container">
      <video preload="true" autoPlay loop volume="0" postoer="/images/1.jpg">
        <source src="images/vine.mp4" type="video/mp4" />
        <source src="images/vine1.webm" type="video/webm" />
      </video>
      <div className="video-content">
        <div className="container content">
          <div className="row">
            <div className="col-md-9">
              <CoverInfo />
            </div>
            <div className="col-md-3">
              <Signup history={props.history}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderVideo;
