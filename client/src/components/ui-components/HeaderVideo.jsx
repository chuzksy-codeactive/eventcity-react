import React from 'react';
import PropTypes from 'prop-types';
import Signup from '../users/SignUpFormContainer';
import CoverInfo from './CoverInfo';

/**
 * This component is used to display
 * video on the landing page
 *
 * @class HeaderVideo
 * @extends {Component}
 * @returns {object} JSX DOM
 */

const HeaderVideo = props => (
    <div className="video-container">
      <video preload="true" autoPlay loop volume="0" poster="https://res.cloudinary.com/dcgwltbei/image/upload/v1530624110/1.jpg">
        <source src="https://res.cloudinary.com/dcgwltbei/video/upload/v1526644027/vine.mp4" type="video/mp4" />
        <source src="https://res.cloudinary.com/dcgwltbei/video/upload/v1526643986/vine1.webm" type="video/webm" />
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

HeaderVideo.propTypes = {
  history: PropTypes.object.isRequired
}

export default HeaderVideo;
