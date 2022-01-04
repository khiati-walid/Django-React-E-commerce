import React, { Component } from 'react'

import axios from 'axios';
import { withRouter } from "react-router-dom"
import Header from './Header';
import Footer from './Footer';
class EventDetails extends Component {
    id = this.props.match.params.id;
    state = {
        event: {
            loading: false,
            id: this.id,
            name_fr: null,
            description1: null,
            description2: null,
            src: null,
            error: false,
        },
    }

    getEvent(id) {
        let api = "http://localhost:8000/events/" + id + "/"
        axios.get(api).then(res => {
            this.setState({
                event: {
                    loading: false,
                    id: id,
                    name_fr: res.data.name_fr,
                    desc_fr: res.data.desc_fr,
                    desc_ar: res.data.desc_ar,
                    description_fr: res.data.description_fr,
                    description_ar: res.data.description_ar,
                    src: res.data.imageevents,
                    error: false,

                },
            });
        }).catch(() => {

        })
    }

    componentDidMount() {
        this.getEvent(this.id)
    }

    render() {
        console.log(this.state)
        return (<>

            <Header></Header>


            <div className=" text-center event-details fluid-container min-height">
                <h2>{this.state.event.name_fr}</h2>
                < div className="row">
                    <div className="d-flex justify-content-center">
                        {this.state.event.src && this.state.event.src.length ? this.state.event.src.map((event, index) => (
                            <div key={index} className="col-md-4 col-lg-4 col-sm-12 ">
                                <img alt="" src={event.image} className="img-fluid rounded" />
                            </div>
                        )) : (
                            <div className="col-md-4 col-lg-4 col-sm-12 ">
                                <img alt="" src="../dist/img/noimage.png" className="img-fluid rounded" />
                            </div>
                        )}

                    </div>
                </div>
                <p>{this.state.event.desc_fr}</p>
            </div>
            <Footer></Footer>
        </>


        )


    }
}

export default withRouter(EventDetails);