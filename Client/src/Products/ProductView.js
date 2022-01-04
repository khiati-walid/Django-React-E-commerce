
import Header from '../Home/Header'
import Footer from '../Home/Footer'

import { Link, withRouter } from "react-router-dom"
import "../styles.css"
import Login from '../Home/Login'
import Comments from './Comments'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/auth';
import { addToCart } from '../actions/cartActions'
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Register from '../Home/Register'

class ProductView extends Component {
    id = this.props.match.params.id;
    state = {
        comments: null,
        product: {
            name: null,
            price: null,
            domain: null,
            description: null,
            new: false,
            src: [
            ],
        },
        rating: 0,
        modalShowLogin: false,
        modalShowRegister: false,
        index: 0,
        show: false
    }
    changeRating = (newRating, name) => {
        this.setState({
            rating: newRating
        })
    }


    myRef = React.createRef();

    setModalShowLogin = show => {
        this.setState({ modalShowLogin: show })

    }
    setModalShowRegister = show => {
        this.setState({ modalShowRegister: show })

    }

    handleTab = index => {
        this.setState({ index: index })
        const images = this.myRef.current.children;
        for (let i = 0; i < images.length; i++) {
            images[i].className = images[i].className.replace("product-image-thumb active", "product-image-thumb ");
        }
        images[index].className = "product-image-thumb active";
    };
    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired,
    };
    postCommnet = (comment) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.auth.token}`,
            },
        };
        const body = {
            "object_id": this.id,
            "content": comment.content,
            "parent": comment.parent,
        };
        axios.post('http://localhost:8000/comments/', body, config)
            .then((res) => {
                this.setState({
                    comments: this.state.comments.concat(res.data),
                });
                console.log(res.data)
            })
            .catch((err) => {

            });


    }
    handleClick = (product) => {

        this.props.addToCart(product);
    }
    getProdut(id) {

        let api = "http://localhost:8000/products/" + id + "/"
        axios.get(api).then(res => {

            this.setState({

                product: {
                    loading: false,
                    id: id,
                    name: res.data.nom,
                    price: res.data.price,
                    domain: res.data.domain,
                    description: res.data.description,
                    available: res.data.Available_en_stock,
                    Livraison: res.data.Livraison_disponible,
                    src: res.data.imageproducts,
                    error: false,

                    catalog: res.data.catalog,
                    new: res.data.NEW,
                },
                rating: res.data.Rating,
                comments: res.data.comments
            });


        }).catch(() => {

        })
    }


    componentDidMount() {

        this.getProdut(this.id)


    }
    componentDidlMount() {
        const { index } = this.state;
        if (this.state.product.src.length !== 0) {
            this.myRef.current.children[index].className = "product-image-thumb active";
        }
    }
    render() {
        function cat(domain) {
            switch (domain) {
                case "N": return "NAWAFID";
                case "G": return "GRAND PUBLIC SEGMENT";
                case "A": return "AGRICOLE";
                default: return ""
            }
        }


        // token={user.token}
        const { isAuthenticated, user } = this.props.auth;


        const authLinks = (
            <>
                <span className="navbar-text mr-3">
                    <i className="fa fa-user"></i>     <strong>{user ? `Bonjour ${user.username}` : ''}</strong>
                </span>
                <button onClick={this.props.logout} className="logout">
                    <i className="fa fa-sign-out-alt"></i> &nbsp;Logout
                </button>

            </>
        );

        const guestLinks = (

            <>
                <button className="btn-auth" onClick={() => this.setModalShowRegister(true)}>
                    s'inscrire
                </button>


                &nbsp;&nbsp;
                <button className="btn-auth" onClick={() => this.setModalShowLogin(true)}>
                    se connecter
                </button>


            </>

        );

        let existed_item = this.props.items.addedItems && this.props.items.addedItems.find(item => this.id === item.id)


        return (
            < div  >
                <Login
                    show={!isAuthenticated && this.state.modalShowLogin}
                    onHide={() => this.setModalShowLogin(false)}
                    message={!isAuthenticated && this.props.error}
                />
                <Register
                    show={!isAuthenticated && this.state.modalShowRegister}
                    onHide={() => this.setModalShowRegister(false)}
                    message={!isAuthenticated && this.props.error}
                />
                <Header></Header>
                <div className="actions  d-flex justify-content-between"><div><Link to="/" ></Link>  Accueil \ <Link to={"/products" + this.state.product.domain} >Produits {cat(this.state.product.domain)} </Link>  \ <Link to="#" >{this.state.product.name}  </Link> </div>
                    <div>{isAuthenticated ? authLinks : guestLinks}</div>
                </div>



                <div className=" row ">
                    <div className="row  col-lg-7 col-md-7 col-sm-12 " >

                        <div className="row col-2 product-image-thumbs " ref={this.myRef}>
                            {
                                this.state.product.src.length ? this.state.product.src.map((img, index) => (
                                    <div className="product-image-thumb" key={index}>  <img src={img.image} alt="" key={index}
                                        onClick={() => this.handleTab(index)}
                                    />
                                    </div>
                                )) :
                                    (<div className="product-image-thumb" >  <img src="../dist/img/noimage.png" alt=""
                                    />
                                    </div>)
                            }
                        </div>
                        <div className="col-10 product-image ">


                            {/* <InnerImageZoom src={this.state.src[this.state.index].image} ZoomSrc={this.state.src[this.state.index].image} /> */}
                            <TransformWrapper
                                defaultScale={1}

                            >
                                {({ zoomIn, zoomOut, resetTransform, setTransform }) => (
                                    <React.Fragment >
                                        <div className="tools">
                                            <button onClick={zoomIn}><i className="fa fa-search-plus"></i></button>
                                            <button onClick={zoomOut}><i className="fa fa-search-minus"></i></button>
                                            <button onClick={resetTransform}><i className="fa fa-compress-arrows-alt"></i></button>
                                        </div>
                                        <TransformComponent >
                                            <img src={this.state.product.src.length ? this.state.product.src[this.state.index].image : "../dist/img/noimage.png"} alt="image" />
                                        </TransformComponent>
                                    </React.Fragment>
                                )}
                            </TransformWrapper>




                        </div>


                    </div>

                    {/* +++++++ */}



                    <div className="col-lg-5 col-md-5 col-sm-12 product-details ">
                        {this.state.product.new && <div className="tag-view">Nouveau Produit</div>}
                        {/* <h3>Chiali Groupe</h3> */}

                        <h2 className="my-3">{this.state.product.name}</h2>
                        <h5>Description :</h5>
                        <p>{this.state.product.description}</p>
                        <h5>Prix :</h5> <b>{this.state.product.price} DA</b>
                        {this.state.product.available && <div className="text-success">    <i className="text-success fa fa-dot-circle"></i> &nbsp; Disponible dans le stock</div>}

                        {isAuthenticated ?
                            (<div className="p-5">{existed_item ? <Link to="/cart"><i className="fa fa-shopping-cart" style={{ color: "blue" }}></i> Aller au panier </Link>
                                : this.state.product.domain == "N" ? 'contacter nous pour les details de paiment' : <button className="acheter " style={{ color: "100%" }} onClick={() => { this.handleClick(this.state.product) }} ><i className="fa fa-shopping-cart"></i> Ajouter au Panier</button>}
                            </div>) :
                            (<div className="p-5">
                                <button className="acheter " style={{ color: "100%" }} onClick={() => { this.setModalShowLogin(true) }} ><i className="fa fa-shopping-cart"></i> Ajouter au Panier</button>
                            </div>)
                        }

                        {this.state.product.Livraison && <div className="text-success">    <i className="text-success fa fa-dot-circle"></i> &nbsp;Livraison_disponible</div>}
                    </div>


                </div>


                {/* <div id="desc" className="caract">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div>Caractéristiques</div>
                            <p>
                                Réf.: 209528<br />
                                Dimensions (cm): H83 x L214 x PR86<br />
                                Poids (kg): 48<br />

                            </p></div>
                        <div className="col-lg-6 col-md-6 col-sm-12">

                        </div>
                    </div>

                </div> */}
                <Comments id={this.id} comments={this.state.comments} postComment={this.postCommnet} auth={isAuthenticated} ></Comments>








                <Footer></Footer>

            </div >
        );
    }
}


const mapStateToProps = (state) => ({
    auth: state.auth,
    items: state.cart,
    error: state.errors,
});
const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (product) => {
            dispatch(addToCart(product))

        },
        logout: () => dispatch(logout())
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductView));







