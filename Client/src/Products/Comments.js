import React, { Component } from 'react'
import Moment from 'moment';
import { Link } from 'react-router-dom';

import Login from '../Home/Login'
import Register from '../Home/Register'


class Comments extends Component {

    state = {

        modalShow: false,
        modalShowLogin: false,
        modalShowRegister: false,
        comment: null,
        reply: null,
        shownReply: null
    }


    setModalShowLogin = show => {
        this.setState({ modalShowLogin: show })

    }
    setModalShowRegister = show => {
        this.setState({ modalShowRegister: show })
        console.log(this.state.modalShow)
    }
    getreplys(id) {
        return this.props.comments.filter(comment => comment.parent === id).map(comment => (
            <div className="media geser " key={comment.id} >
                <div className="media-left p-3">
                    <img className="img-circle img-sm" src="../dist/img/avatar.png" />
                </div>
                <div className="media-body">
                    <h4 className="media-heading comment-username">   {comment.user.username}</h4>
                    <span className="text-muted">{Moment(comment.posted).format("YYYY-MMM-D")}</span>
                    <p className="comment-p">
                        {comment.content}<br />
                    </p>
                </div>
            </div>))

    }
    componentDidMount() {

    }
    onSubmit = (e) => {
        e.preventDefault();

        this.props.postComment({ content: this.state.comment, parent: this.state.shownReply })

        this.setState({ shownReply: null })

    };
    onChange = (e) => {
        this.setState({ comment: e.target.value })
    };

    reply = (id) => {
        this.setState({
            shownReply: id
        })
    }
    render() {
        const isAuthenticated = this.props.auth
        const authLinks = (
            <div className="card-footer" >

                <form onSubmit={this.onSubmit}>
                    <div className="img-push">
                        <div className="comment-form">
                            <input onChange={this.onChange} name="comment" type="text" className="form-control p-4 my-4" placeholder={this.state.shownReply == null ? "publier un commentaire" : "réponse"} />
                            <button type="submit" ><i className="far fa-comment"></i></button>
                        </div>
                    </div>
                </form>
            </div>

        );



        const guestLinks = (

            <>
                cliquer
                <button className="btn-auth-comment" onClick={() => this.setModalShowRegister(true)}>
                    S'inscrire
                </button>

                or
                &nbsp;&nbsp;
                <button className="btn-auth-comment" onClick={() => this.setModalShowLogin(true)}>
                    se connecter
                </button>
                pour poste un commentaire

            </>

        );
        if (this.props.comments)
            return (

                <div className="m-5">
                    <Login
                        show={this.state.modalShowLogin}
                        onHide={() => this.setModalShowLogin(false)}
                    />
                    <Register
                        show={this.state.modalShowRegister}
                        onHide={() => this.setModalShowRegister(false)}
                    />
                    <h3><u>Commentaires :</u> </h3>
                    <div className="card-comments">
                        {this.props.comments.map((comment, index) => (
                            <>
                                {!comment.parent &&
                                    < div className="media" key={comment.id} >
                                        <div className="media-left p-3">
                                            <img className="img-circle img-sm" src="../dist/img/avatar.png" />
                                        </div>
                                        <div className="media-body">
                                            <h4 className="media-heading comment-username">  {comment.user.username}</h4>
                                            <span className="text-muted">{Moment(comment.posted).format("YYYY-MMM-D")}</span>
                                            <p className="comment-p">
                                                {comment.content}<br />
                                                <button className="reply" onClick={() => this.reply(comment.id)}>  <i className="fa fa-reply"> répondre</i></button>
                                            </p>
                                            {this.state.shownReply === comment.id ? authLinks : ""}
                                        </div>
                                    </div>
                                }

                                {this.getreplys(comment.id)}



                            </>
                        ))}

                    </div>

                    {/* <div className="media geser ">
                        <div className="media-left p-3">
                            <img className="img-circle img-md" src="../dist/img/avatar.png" />
                        </div>
                        <div className="media-body">
                            <h4 className="media-heading comment-username">Fahmi Arif</h4>
                            <span className="text-muted">2567888</span>
                            <p className="comment-p">
                                kalo bisa ya ndak usah gan biar cepet<br />
                                <button className="reply"> <i className="fa fa-reply"></i> reply</button>
                            </p>
                        </div>
                    </div> */}

                    {isAuthenticated ? authLinks : guestLinks}

                </div >
            );
        else return <h1></h1>
    }
}

export default Comments;