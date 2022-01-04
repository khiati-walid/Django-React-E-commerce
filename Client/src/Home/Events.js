

import React, { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";



class Events extends Component {
  api = "http://localhost:8000/events/"
  state = {
    events: {
      loading: false,
      data: null,
      error: false,
      visible: false
    }
  }
  componentDidMount() {
    axios.get(this.api).then(res => {
      this.setState({
        events: {
          loading: false,
          data: res.data,
          error: false
        }
      })
    }).catch(() => {
      this.setState({
        events: {
          loading: false,
          data: null,
          error: true
        }
      })

    })


  }

  render() {

    return (
      <div className="my-5" id="events">
        <div id="events" className="carousel slide " data-ride="carousel">
          <div className="d-flex justify-content-center mb-4">
            <a href="#events" role="button" data-slide="prev">
              <i className="fa fa-angle-left"></i>
            </a>
            &nbsp;
            <h2>Chiali Trading Events</h2>
            &nbsp;
            <a href="#events" role="button" data-slide="next">
              <i className="fa fa-angle-right"></i>
            </a>

          </div>

          <div className="carousel-inner">
            <div className="carousel-item active" data-interval="5000">
              < div className="row">
                <div className="d-flex justify-content-center">
                  {this.state.events.data ? this.state.events.data.results.map((event, index) => (
                    <div className="col-md-12 col-lg-6 col-xl-4 " key={event.id}>
                      <Link to={"/events/" + event.id}>
                        <div className="card event ">
                          <div className="inner-card">
                            <img alt="" src={event.imageevents.length ? event.imageevents[0].image : "../dist/img/noimage.png"} height="300" className="img-fluid rounded" />
                            <h4 className="event-title">  {event.name_fr}</h4>

                          </div>
                        </div>
                      </Link>
                    </div>
                  )) : "erreur"}
                </div>
              </div>
            </div>



          </div>

        </div>

      </div >
    );
  }
}

export default Events;
