


import React, { Component } from 'react';
import Header from '../Home/Header';
import Moment from 'moment';
import Footer from '../Home/Footer';
import { connect } from 'react-redux'
import "../styles.css"
import { Link } from 'react-router-dom'
import { removeItem, addQuantity, subtractQuantity, changeQuantity } from '../actions/cartActions'
import { Modal } from 'react-bootstrap';
import axios from "axios"
class Cart extends Component {
    state = {
        modalShow: false,
        orderid: null,
        okorder: null,
        product: null,
        order: null,
    }
    setModalShow = show => {
        this.setState({ modalShow: show })
        this.setState({ okorder: null })
    }

    postOrder = () => {
        var ordred = ''
        this.props.items.addedItems.map(item => {

            ordred = ordred + item.name + '  x  ' + item.quantity + ' | '
        })
        var date = Moment().format("YYYY-MMM-DD")
        console.log(date)
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.auth.token}`,
            },
        };
        const body = {
            "date": date,
            "items": ordred,
            "total": this.props.items.total
        };
        axios.post('http://localhost:8000/orders/', body, config)
            .then((res) => {
                // this.setState({
                //     orderid: res.data.id
                // })
                // this.props.items.addedItems.map(item => {

                //     this.getProdut(item.id)
                //     const bod = {
                //         "order": [...this.state.order, this.state.orderid],
                //     };
                //     console.log(bod)
                //     axios.patch('http://localhost:8000/products/' + item.id + '/', bod)
                //         .then((res) => {
                //             this.setModalShow(false)
                //         })
                //         .catch((err) => {

                //         });


                // })
                this.setState({ okorder: 'ok' })
                this.setModalShow(false)

            })


            .catch((err) => {

            });


    }


    getProdut(id) {
        let api = "http://localhost:8000/products/" + id + "/"
        let arr = null
        axios.get(api).then(res => {
            this.setState({
                order: res.data.order
            })
        }).catch(() => {
            return null
        })
    }







    handleRemove = (id) => {
        console.log(id)
        this.props.removeItem(id)
    }
    //to add the quantity
    handleAddQuantity = (id) => {
        this.props.addQuantity(id);
    }
    //to substruct from the quantity
    handleSubtractQuantity = (id) => {
        this.props.subtractQuantity(id);
    }
    changeQuantity = (id, value) => {
        this.props.changeQuantity(id, value);

    }
    onChange = (id, e) => {

        this.props.changeQuantity(id, e.target.value);
    };
    order = () => {
        if (this.props.items.total == 0)
            alert("Votre panier ne contient aucun article. Vous devez spécifier les quantités.");
        else {
            this.setModalShow(true)
            // alert("are you sure making order with total =" + this.props.items.total + "\n check your cart before sending an order");
            // window.open("http://www.facebook.com", '_blank');
        }



    };
    render() {

        let addedItems = this.props.items.addedItems.length ?
            (
                this.props.items.addedItems.map(item => {
                    return (


                        <div className="row shadow-sm">


                            <div className="col-md-5 col-lg-5 col-sm-12">
                                <div className="d-flex  align-items-center p-2 bg-white mt-4 px-3 rounded">

                                    <div className="mr-1"><img className="rounded" src={item.src.length ? item.src[0].image : "../dist/img/noimage.png"} width="70" /></div>
                                    <div className="d-flex flex-column text-center align-items-center product-deta"><span className="font-weight-bold">{item.name}</span></div>
                                </div>
                            </div>
                            <div className="d-flex   align-items-center col-md-2 col-lg-2 col-sm-12">
                                <div className="p-2 bg-white mt-4 px-3">
                                    {item.price + " DA"}
                                </div>
                            </div>

                            <div className="d-flex   align-items-center col-md-2 col-lg-2 col-sm-12">
                                <div className="p-2 bg-white mt-4 px-3 qty">
                                    <button onClick={() => this.handleAddQuantity(item.id)}><i className="fa fa-plus m-1" ></i></button>      <input style={{ width: "80px" }} className={item.error ? "error" : ""} type="number" min="1" name="quantity" value={item.quantity} onChange={(e) => this.onChange(item.id, e)} ></input> <button onClick={() => this.handleSubtractQuantity(item.id)}><i className="fa fa-minus m-1" ></i></button>
                                </div>
                            </div>
                            <div className=" d-flex align-items-center justify-content-center remove col-md-3 col-lg-3  col-sm-12">
                                <div className="p-2 bg-white mt-4 px-3">

                                    <h5 className="text-grey d-inline-block">{item.price * item.quantity} DA</h5><button className=" d-inline-block" onClick={() => this.handleRemove(item.id)}><i className="fa fa-trash mb-1 text-danger" ></i></button>
                                </div>
                            </div>



                        </div >



                    )
                })
            ) :

            (
                <div class="container-fluid mt-100">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-header">
                                    <h5>Panier</h5>
                                </div>
                                <div class="card-body cart">
                                    <div class="col-sm-12 empty-cart-cls text-center"> <img src="https://i.imgur.com/dCdflKN.png" width="130" height="130" class="img-fluid mb-4 mr-3" />
                                        <h3><strong>Votre panier est vide</strong></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )

        return (
            <>
                <Modal
                    show={this.state.modalShow}
                    onHide={() => this.setModalShow(false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton >

                    </Modal.Header>
                    <div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>price</th>
                                    <th>qty</th>
                                    <th>Total price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.items.addedItems.map(item => (
                                    <tr>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.price * item.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>

                                <tr>
                                    <td></td>
                                    <td><h3>Total=</h3></td>
                                    <td><h3>{this.props.items.total}</h3></td>
                                    <td><button onClick={this.postOrder} className="btn btn-primary">passer une commande</button></td>
                                </tr>
                            </tfoot>
                        </table>


                    </div>
                </Modal>
                <Header />
                <div class="actions"><div><Link to="/" >Accueil</Link></div></div>

                <div className="min-height">
                    <div className="container">

                        <div className="p-2">
                            <h4>Panier d'achats</h4>
                            <div className="d-flex flex-row align-items-center pull-right"></div>
                        </div>
                        {addedItems}
                    </div>
                    {this.props.items.total != 0 && <div class=" my-5 d-flex justify-content-center"><div> <div className="d-inline-block"><h3>Total : {this.props.items.total}</h3></div>   <div className=" d-inline-block bg-white rounded"><button onClick={this.order} className="pay-button" type="button">passer une commande</button></div></div></div>}
                    {/* {this.state.okorder ? " votre commande a été enregistrée" : "no"}  */}

                </div>
                <Footer />
            </>
        );
    }
}


const mapStateToProps = (state) => ({
    items: state.cart,
    auth: state.auth,
    // items: state.items
});
const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: (id) => { dispatch(removeItem(id)) },
        addQuantity: (id) => { dispatch(addQuantity(id)) },
        subtractQuantity: (id) => { dispatch(subtractQuantity(id)) },
        changeQuantity: (id, value) => { dispatch(changeQuantity(id, value)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)