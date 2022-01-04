import { Link } from "react-router-dom"

import "../styles.css"
import React, { Component } from 'react';
import axios from "axios";

class Agricole extends Component {
    api = "http://127.0.0.1:8000/products/"
    state = {
        productsA: {
            loading: false,
            data: null,
            error: false
        },
        productsG: {
            loading: false,
            data: null,
            error: false
        },
        productsN: {
            loading: false,
            data: null,
            error: false
        }
    }

    componentDidMount() {

        let config = {
            params: {
                domain: "A"
            },
        }
        axios.get(this.api, config).then(res => {
            this.setState({
                productsA: {
                    loading: false,
                    data: res.data,
                    error: false
                }
            })

        }).catch(() => {
            this.setState({
                productsA: {
                    loading: false,
                    data: null,
                    error: true
                }
            })
        })
        config = {
            params: {
                domain: "N"
            },
        }
        axios.get(this.api, config).then(res => {
            this.setState({
                productsN: {
                    loading: false,
                    data: res.data,
                    error: false
                }
            })

        }).catch(() => {
            this.setState({
                productsN: {
                    loading: false,
                    data: null,
                    error: true
                }
            })
        })
        config = {
            params: {
                domain: "G"
            },
        }
        axios.get(this.api, config).then(res => {
            this.setState({
                productsG: {
                    loading: false,
                    data: res.data,
                    error: false
                }
            })

        }).catch(() => {
            this.setState({
                productsG: {
                    loading: false,
                    data: null,
                    error: true
                }
            })
        })
    }

    render() {

        return (

            <div className="container">
                {/* ============================ */}
                <div id="slide" className="carousel slide " data-ride="carousel">

                    <div className="d-flex justify-content-center mb-4">

                        <a href="#slide" role="button" data-slide="prev">
                            <i className="fa fa-angle-left"></i>
                        </a>

                        <h2>Nos Produits</h2>
                        <a href="#slide" role="button" data-slide="next">
                            <i className="fa fa-angle-right"></i>
                        </a>

                    </div>

                    <div className="carousel-inner">
                        <div className="carousel-item " data-interval="5000">
                            <Link to={"/products/A"}> <h3 className="text-primary">AGRICOLE</h3></Link>
                            <div className="row  d-flex  justify-content-center">

                                {this.state.productsA.data && this.state.productsA.data.results.slice(0, 3).map((product, index) => (
                                    <div className="col-sm-12 col-md-4 mt-4" key={index}>
                                        <Link to={"/productsA"}>
                                            <div className="product-card shadow-sm">
                                                <div className="tag">Nouveau</div>

                                                <div className="d-flex align-items-center justify-content-center">
                                                    <div className="card-img-actions">
                                                        <img src={product.imageproducts.length ? product.imageproducts[0].image : "../dist/img/noimage.png"} className="card-img img-fluid" alt="" /> </div>
                                                </div>
                                                <div className="product-card-body">
                                                    <h6>Chiali Groupe</h6>

                                                    <h4 >  {product.nom} </h4>

                                                    <div className="price" > </div>
                                                </div>

                                            </div>
                                        </Link>
                                    </div>

                                ))}

                            </div>


                        </div>
                        <div className="carousel-item " data-interval="5000">
                            <Link to={"/products/N"}> <h3 className="text-primary">NAWAFID</h3></Link>

                            <div className="row  d-flex  justify-content-center">
                                {this.state.productsN.data && this.state.productsN.data.results.slice(0, 3).map((product, index) => (
                                    <div className="col-sm-12 col-md-4 mt-4" key={index}>
                                        <Link to={"/productsN"}>
                                            <div className="product-card shadow-sm">
                                                <div className="tag">Nouveau</div>
                                                <div className="tag-h"><i className="fa fa-heart"></i></div>
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <div className="card-img-actions">
                                                        <img src={product.imageproducts.length ? product.imageproducts[0].image : "../dist/img/noimage.png"} className="card-img img-fluid" /> </div>
                                                </div>
                                                <div className="product-card-body">
                                                    <h6>Chiali Groupe</h6>

                                                    <h4 >  {product.nom} </h4>

                                                    <div className="price" > </div>
                                                </div>

                                            </div>
                                        </Link>
                                    </div>

                                ))}
                            </div>
                        </div>

                        <div className="carousel-item active" data-interval="5000">
                            <Link to={"/productsG"}> <h3 className="text-primary">SEGMENT GRAND PUBLIC</h3></Link>
                            <div className="row  d-flex  justify-content-center">
                                {this.state.productsG.data && this.state.productsG.data.results.slice(0, 3).map((product, index) => (
                                    <div className="col-sm-12 col-md-4 mt-4" key={index}>
                                        <Link to={"productsG"}>
                                            <div className="product-card shadow-sm">
                                                {product.NEW ? <div className="tag">Nouveau</div> : ''}

                                                <div className="d-flex align-items-center justify-content-center">
                                                    <div className="card-img-actions">
                                                        <img src={product.imageproducts.length ? product.imageproducts[0].image : "../dist/img/noimage.png"} className="card-img img-fluid" /> </div>
                                                </div>
                                                <div className="product-card-body">
                                                    <h6>Chiali Groupe</h6>

                                                    <h4 >  {product.nom} </h4>

                                                    <div className="price" > </div>
                                                </div>

                                            </div>
                                        </Link>
                                    </div>

                                ))}
                            </div>


                        </div>
                    </div>



                </div>
                {/* ============================ */}
            </div>




        );
    }
}


export default Agricole;
