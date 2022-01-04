
import Footer from "../Home/Footer"
import Header from "../Home/Header";
import axios from "axios";
import ReactPaginate from 'react-paginate';
import { Link, withRouter } from "react-router-dom"
import React, { Component } from 'react';
class ProductsGp extends Component {
    domain = 'G';
    api = "http://localhost:8000/products/"
    state = {
        products: {
            offset: 0,
            perPage: 5,
            currentPage: 0,
            loading: false,
            data: null,
            error: false
        }
    }
    componentDidMount() {

        let config = {
            params: {
                domain: this.domain
            },
        }
        axios.get(this.api, config).then(res => {
            this.setState({
                products: {
                    loading: false,
                    data: res.data,
                    error: false
                }
            })

        }).catch(() => {
            this.setState({
                products: {
                    loading: false,
                    data: null,
                    error: true
                }
            })
        })
    }
    handlePageClick(e) {

        const config = {
            params: {
                page: e.selected + 1
            },
        }
        axios.get(this.api, config).then(res => {
            this.setState({
                products: {
                    loading: false,
                    data: res.data,
                    error: false
                }
            })

        }).catch(() => {
            this.setState({
                products: {
                    loading: false,
                    data: null,
                    error: true
                }
            })
        })
        console.log(`active page is ${e.selected}`);
    }
    cat() {
        switch (this.domain) {

            case "N": return "NAWAFID";
            case "G": return "GRAND PUBLIC SEGMENT";
            case "A": return "AGRICOLE";
            default: return ""
        }
    }
    render() {


        let content = null

        if (this.state.products.error) content = <p>il n'y a pas de produits </p>
        if (this.state.products.loading) content = (
            <div className="d-flex justify-content-center">
                <div className="spinner-border  text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>)
        return (
            <>
                <Header></Header>
                <div className="min-height">
                    <div className="actions "><div className="container"><Link to="/" >Accueil</Link>  \ <Link to={"/products" + this.domain} >Produits  {this.cat()} </Link></div> </div>
                    <div className="container">
                        {content}
                        <div className="row d-flex  justify-content-center ">
                            {this.state.products.data && this.state.products.data.results.map((product, index) => (
                                <div className="col-sm-12 col-md-3 mt-3" key={index}>
                                    <Link to={"/product/" + product.id}>
                                        <div className="product-card">
                                            <div className="d-flex align-items-center justify-content-center">
                                                <div className="card-img-actions">
                                                    <img src={product.imageproducts.length ? product.imageproducts[0].image : "../dist/img/noimage.png"} className="card-img img-fluid" width="96" height="350" alt="" /> </div>
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
                        <div className="d-flex justify-content-center">
                            <ReactPaginate
                                previousLabel={"<"}
                                nextLabel={">"}
                                breakLabel={"..."}
                                breakClassName={"break-me"}
                                pageCount={1}
                                marginPagesDisplayed={1}
                                pageRangeDisplayed={2}
                                onPageChange={this.handlePageClick}
                                containerClassName={"pagination"}
                                subContainerClassName={"pages pagination"}
                                activeClassName={"active"} />
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </ >
        );
    }
}

export default withRouter(ProductsGp);
