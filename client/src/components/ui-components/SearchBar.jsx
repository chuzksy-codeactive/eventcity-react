import React, { Component } from 'react';

/**
 * This component is used for render
 * search functionality in other component
 *
 * @function
 * @return {object} JSX DOM
 */

class SearchBar extends Component {
  render() {
    return (
      <section className="section">
        <div className="container-fluid searchbar">
          <div className="row justify-content-center">
            <div className="col-6">
              <input
                className="form-control inner-addon left-addon"
                id="search-input"
                type="text"
                name="search"
                placeholder="Search centers by name, facilities or location"
                onChange={this.props.onInputChange}
              />
            </div>
          </div>
        </div>
        <div>
          <h1 className="header-section row-width">Explore our centers and make a choice</h1>
          <p className="para-section row-width">
            We guide you from the stressful decision making process, ensuring you are comfortable, whether it is a wedding, corporate {'function'} or
            even a kiddies party, we create a buzz around you, taking you to the next level.
          </p>
        </div>
      </section>
    );
  }
}
export default SearchBar;
