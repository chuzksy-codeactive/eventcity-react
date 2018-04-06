import React from 'react';

const Carousel = () => {
  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
      <ol className="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active" />
        <li data-target="#carouselExampleIndicators" data-slide-to="1" />
        <li data-target="#carouselExampleIndicators" data-slide-to="2" />
        <li data-target="#carouselExampleIndicators" data-slide-to="2" />
      </ol>
      <div className="carousel-inner" role="listbox">
        <div className="carousel-item active c-1">
          <div className="carousel-caption d-none d-md-block">
            <h3>Best Price Guaranteed</h3>
            <p>Discounted prices apply when you book on hold online</p>
          </div>
        </div>
        <div className="carousel-item c-2">
          <div className="carousel-caption d-none d-md-block">
            <h3>Live Availability</h3>
            <p>Check Availability instantly</p>
          </div>
        </div>
        <div className="carousel-item c-3">
          <div className="carousel-caption d-none d-md-block">
            <h3>Omnipresence</h3>
            <p>1000+ choices across Nigeria</p>
          </div>
        </div>
        <div className="carousel-item c-4">
          <div className="carousel-caption d-none d-md-block">
            <h3>
              Find reception halls, venues for your wedding receptions, birthday parties, etc.
            </h3>
            <p>
              Book marquee, conference centres, party halls, convention centres and various types of
              event centres.
            </p>
          </div>
        </div>
      </div>
      <a
        className="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

export default Carousel;
