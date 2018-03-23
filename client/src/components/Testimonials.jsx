import React from 'react';

const Testimonials = () => {
  return (
    <section className="section-testimonials">
      <div>
        <h2 className="header-section row-width" style={{ color: 'white' }}>
          HEAR WHAT PEOPLE SAY ABOUT EVENTCITY
        </h2>
      </div>
      <div className="testimonials container">
        <div className="testimony">
          <blockquote>
            They basically helped me through out my wedding even after I booked a venue with them, I was surprised when I got a gift from them for my
            wedding. Thumbs up to the guys behind EventCity, God Bless you all.
            <cite>
              <img src="/images/customer1.jpg" alt="testimonial image" />Okwarazoro Austin
            </cite>
          </blockquote>
        </div>
        <div className="testimony">
          <blockquote>
            I will be more than glad to recommend, in fact I am sure I have recommended your service already. In this day of internet fraud and scams
            where trying to get something done online can end up hurting/harming you, I am glad I came across EventCity and the sincerity with which I
            was served. I almost fell into the hands of a fraud on this venue search so I am speaking from experience.
            <cite>
              <img src="/images/customer2.jpg" alt="testimonial image" />Oguntimehim Posi
            </cite>
          </blockquote>
        </div>
        <div className="testimony">
          <blockquote>
            I'm really happy about their service, I had already spent 2 months searching for an event centre for my daughters wedding before I got to
            know about them. Awesome customer service and their staff was very patient with me even with all my requirements.
            <cite>
              <img src="/images/customer3.jpg" alt="testimonial image" />Adekunle Shina
            </cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
};
export default Testimonials;
