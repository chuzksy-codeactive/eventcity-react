import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { deleteCenter } from "../../actions/centerAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";

/**
 * This component is used to genarate center list items
 * where the user can either delete or edit an existing
 * center
 *
 * @class EditCenterList
 * @extends {Component}
 * @returns {object} JSX DOM
 *
 */
export class EditCenterList extends Component {
  state = {
    id: null
  };
  onDeleteCenter = id => {
    this.props.deleteCenter(id);
    this.modal.classList.toggle("opened");
    this.modal_overlay.classList.toggle("opened");
  };
  onCloseModal = () => {
    this.modal.classList.toggle("opened");
    this.modal_overlay.classList.toggle("opened");
  };
  onOpenModal = id => {
    this.setState({
      id
    });
    this.modal.classList.toggle("opened");
    this.modal_overlay.classList.toggle("opened");
  };

  render() {
    let centerLists = null;
    let eventList = null;
    if (Array.isArray(this.props.centerList.centers)) {
      const centers = this.props.centerList.centers;
      centerLists = centers.map((center, i) => {
        const events = center.Events;
        if (Array.isArray(events) && events.length > 0) {
          eventList = events.map((event, i) => (
            <div className="event-item-details" key={event.id}>
              <h6>{event.name}</h6>
              <div className="wrap-item-details">
                <div className="events-item">
                  <span>
                    <strong>Event Name:</strong>&nbsp;&nbsp;{event.name}
                  </span>
                  <br />
                  <span>
                    <strong>Start Date: </strong>&nbsp;&nbsp;{event.startDate}&nbsp;&nbsp;&nbsp;&nbsp;
                    <strong>End Date: </strong>&nbsp;&nbsp;{event.endDate}
                  </span>
                </div>
              </div>
            </div>
          ));
        } else {
          eventList = (
            <div className="event-item-details" key={i}>
              No event for this center
            </div>
          );
        }
        return (
          <div key={center.id} >
            <div className="list-item" id={center.id}>
              {`${i + 1}. ${center.name}`}{' '}
              <div className="btn-list btn btn-success" data-toggle="tooltip" data-placement="left" title="edit">
                <Link className="{`a-link${i+1}`}" to={`/edit/center/${center.id}`}>
                  <span id="ion-edit" href={`/edit/center/${center.id}`}><i className="ion-edit ion-icon" /></span>
                </Link>
              </div>
              <div className="btn-list btn btn-danger" data-toggle="tooltip" data-placement="right" title="delete">
                <span id="trash"><i className="ion-trash-a" onClick={this.onOpenModal.bind(this, center.id)} /></span>
              </div>{' '}
              <div className="btn btn-primary btn-list" data-toggle="tooltip" data-placement="right" title="view center details">
                <a data-toggle="collapse" href={`#${center.name}`} role="button" aria-expanded="false" aria-controls={center.name}>
                  <span id="dropdown"><i className="ion-android-arrow-dropdown" /></span>
                </a>
              </div>{" "}
            </div>
            <div className="collapse" id={center.name} key={center.name}>
              {eventList}
            </div>
          </div>
        );
      });
    }

    return (
      <div>
        <div className="list-wrapper" id="list-wrapper">{centerLists}</div>
        <div
          className="modal-overlay"
          id="modal-overlay"
          ref={el => {
            this.modal_overlay = el;
          }}
        />
        <div
          className="modal delete"
          id="modal"
          ref={el => {
            this.modal = el;
          }}
        >
          <div className="modal-guts">
            <div className="modal-header">
              <h5>Confirm Delete</h5>
              <span className="close" onClick={this.onCloseModal}>
                &times;
              </span>
            </div>
            {this.props.centerList.loading && (
              <div className="center-loader">
                <span
                  className={this.props.centerList.loading ? "loader" : ""}
                />
              </div>
            )}
            <p>Do you want to delete this center? </p>
            <div className="modal-footer" id="modal-footer">
              <span id="del-button" ><button className="close-button btn btn-danger btn-sm" onClick={this.onDeleteCenter.bind(this, this.state.id)}>
                delete
              </button></span>
              <button type="button" id="cancel" className="btn btn-default btn-sm" onClick={this.onCloseModal}>
                cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  deleteCenter: id => dispatch(deleteCenter(id))
});

const mapStateToProps = state => ({
  center: state.centerReducer,
  centersPerPage: state.centerPaginationReducer
});

EditCenterList.propTypes = {
  deleteCenter: PropTypes.func.isRequired,
  centerList: PropTypes.shape({
    center: PropTypes.array
  }),
  center: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCenterList);
