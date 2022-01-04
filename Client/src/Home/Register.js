import logo from '../images/chiali-logo.jpg'

import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../actions/auth';
import { createMessage } from '../actions/messages';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Modal } from 'react-bootstrap';
import * as Yup from 'yup';
export class Register extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        password2: '',
    };

    static propTypes = {
        register: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
    };



    render() {




        return (
            <>
                <Modal
                    {...this.props}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >

                    <Modal.Header closeButton >

                    </Modal.Header>

                    <Formik
                        initialValues={{
                            username: '',
                            email: '',
                            password: '',
                            confirmPassword: ''
                        }}
                        validationSchema={Yup.object().shape({
                            username: Yup.string()
                                .required("Nom d'utilisateur est obligatoire"),
                            email: Yup.string()
                                .email('Email is invalid')
                                .required('Email est obligatoire'),
                            password: Yup.string()
                                .min(6, 'Password must be at least 6 characters')
                                .required('le mot de pass est obligatoire'),
                            confirmPassword: Yup.string()
                                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                                .required('Confirmer le mot de passe est nécessaire')
                        })}
                        onSubmit={(fields, { setSubmitting }) => {
                            this.props.register(fields);

                            if (this.props.isAuthenticated) {
                                this.props.onHide()
                                console.log("hide")
                            }
                            else {
                                setSubmitting(false)
                            }
                        }}
                        render={({ errors, status, isSubmitting, touched }) => (
                            <Form>

                                <div className="card-header text-center">
                                    <img src={logo} style={{ width: "140px" }} />
                                </div>
                                <div className="card-body">
                                    <div className="input-group mb-3">
                                        <Field name="username" type="text" placeholder="Nom d'utilsateur" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-user"></span>
                                            </div>
                                        </div>
                                        <ErrorMessage name="username" component="div" className="invalid-feedback" />
                                    </div>

                                    <div className="input-group mb-3">
                                        <Field name="email" type="text" placeholder="email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />

                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-envelope"></span>
                                            </div>
                                        </div>
                                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="input-group mb-3">
                                        <Field name="password" type="password" placeholder="mot de passe" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />

                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-lock"></span>
                                            </div>
                                        </div>
                                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                    </div>
                                    <div class="input-group mb-3">
                                        <Field type="password"
                                            name="confirmPassword"
                                            placeholder="Confirmer le mot de passe"
                                            className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')}

                                        />
                                        <div class="input-group-append">
                                            <div class="input-group-text">
                                                <span class="fas fa-lock"></span>
                                            </div>
                                        </div>
                                        <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                                    </div>
                                    {this.props.message ? <div>{this.props.message.msg.non_field_errors}</div> : ""}
                                    <div class="row d-flex justify-content-end">
                                        <div class="col-4">
                                            <button type="submit" disabled={isSubmitting} class="btn btn-primary btn-block"> S'inscrire </button>
                                        </div>
                                        <p>
                                            Vous avez déjà un compte? <Link to="/login">Se connecter</Link>
                                        </p>
                                    </div>


                                </div>

                            </Form>
                        )}
                    />




                </Modal>
            </>


        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, createMessage })(Register);