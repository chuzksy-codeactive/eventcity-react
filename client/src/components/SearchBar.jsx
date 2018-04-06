import React from 'react';

const SearchBar = () => {
  return (
    <section className="section">
      <div className="container-fluit searchbar">
        <div className="row justify-content-center">
          <div className="col-6">
            <form id="search" className="form-inline">
              <input
                className="form-control"
                id="search-input"
                type="text"
                name="search"
                placeholder="Search centers by name, facilities or location"
              />
              <button className="btn btn-primary" form="search" value="Submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
      <div>
        <h1 className="header-section row-width">Explore our centers and make a choice</h1>
        <p className="para-section row-width">
          We guide you from the stressful decision making process, ensuring you are comfortable,
          whether it is a wedding, corporate {`function`} or even a kiddies party, we create a buzz
          around you, taking you to the next level.
        </p>
      </div>
    </section>
  );
};
export default SearchBar;
