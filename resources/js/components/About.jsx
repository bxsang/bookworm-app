import React from 'react'
import { Container } from 'react-bootstrap'

const About = () => (
  <Container>
    <h2>About Us</h2>
    <hr />
    <div className="d-flex justify-content-center">
      <h1>
        <strong>Welcome to Bookworm</strong>
      </h1>
      <h5>
        &quot;Bookworm is an independent New York bookstore and language school
        with locations in Manhattan and Brooklyn. We specialize in travel books
        and language classes.&quot;
      </h5>
    </div>

    <div className="row mt-4">
      <div className="col-sm-6 col-md-6 col-lg-6">
        <h2>
          <strong>Our Story</strong>
        </h2>
        <p>
          The name Bookworm was taken from the original name for New York
          International Airport, which was renamed JFK in December 1963.
        </p>
        <p>
          Our Manhattan store has just moved to the West Village. Our new
          location is 170 7th Avenue South, at the corner of Perry Street.
        </p>
        <p>
          From March 2008 through May 2016, the store was located in the
          Flatiron District.
        </p>
      </div>
      <div className="col-sm-6 col-md-6 col-lg-6">
        <h2>
          <strong>Our Vision</strong>
        </h2>
        <p>
          One of the last travel bookstores in the country, our Manhattan store
          carries a range of guidebooks (all 10% off) to suit the needs and
          tastes of every traveller and budget.
        </p>
        <p>
          We believe that a novel or travelogue can be just as valuable a key to
          a place as any guidebook, and our well-read, well-travelled staff is
          happy to make reading recommendations for any traveller, book lover,
          or gift giver.
        </p>
      </div>
    </div>
  </Container>
)

export default About
