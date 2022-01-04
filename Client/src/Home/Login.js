import logo from '../images/chiali-logo.jpg'

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/auth';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { Modal } from 'react-bootstrap';
export class Register extends Component {


    render() {
        // we will update local component state and force component to rerender 
        // with new data.
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
                            password: '',
                        }}
                        validationSchema={Yup.object().shape({
                            username: Yup.string()
                                .required('le Nom est obligatoire'),

                            password: Yup.string()
                                .min(6, 'Le mot de passe doit comporter au moins 6 caractères')
                                .required('Le mot de passe est obligatoire'),
                        })}
                        onSubmit={(fields, { setSubmitting }) => {
                            this.props.login(fields.username, fields.password)
                            setSubmitting(false)
                        }}>
                        {({ errors, status, isSubmitting, touched }) => (
                            <Form>

                                <div className="card-header text-center">
                                    <img src={logo} style={{ width: "140px" }} />

                                </div>
                                <div className="card-body">

                                    <div className="input-group mb-3">
                                        <Field name="username" type="text" placeholder="Nom d'utilisateur" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-user"></span>
                                            </div>
                                        </div>
                                        <ErrorMessage name="username" component="div" className="invalid-feedback" />
                                    </div>


                                    <div className="input-group mb-3">
                                        <Field name="password" type="password" placeholder="Mot de pass" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />

                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-lock"></span>
                                            </div>
                                        </div>
                                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                    </div>

                                    {this.props.message ? <div>{this.props.message.msg.non_field_errors}</div> : ""}

                                    <div className="row d-flex justify-content-end">
                                        <div className="col-4">
                                            <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-block">Se connecter</button>
                                        </div>
                                        <p>
                                            Vous avez déjà un compte? <Link to="/login">Se connecter</Link>
                                        </p>
                                    </div>


                                </div>
                            </Form>
                        )}
                    </Formik>




                </Modal>
            </>

        );
    }
}
const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, { login })(Register);