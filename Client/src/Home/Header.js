
import { Link } from 'react-router-dom';
import logo from '../images/chiali-logo.jpg'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

export class Header extends Component {
  handleChange = (e) => {
    this.props.i18n.changeLanguage(e.target.value);
  }
  render() {
    const { t } = this.props

    return (<>
      <div className="header sticky">
        <div className="info-bar  d-none d-md-block  w-100 text-right pt-1 ">
          <div className="container d-flex justify-content-between">
            <div><i className="fa fa-map-marker"></i><span> Voie A Zone Industrielle B.P 160 sidi-bel Abbes</span> |</div>
            <div><i className="fa fa-phone"></i><span>Tel : 022 213 55 46 44 88 </span>|</div>
            <div><i className="fa fa-phone"></i><span>fax : 022 213 55 46 44 88 </span>|</div>
            <div><i className="fa fa-envelope"></i><span>traiding@chiali-groupe.com</span> </div>
            {/* <div> <select onChange={this.handleChange} name="lang">
              <option value="fr" >français</option>
              <option value="ar" >العربية</option>|&nbsp; {t("changerLaLange")} &nbsp;
            </select></div> */}
          </div>
        </div>
        <div className="container">
          <nav className="navbar navbar-expand-lg  navbar-light">

            <div className="flip-container">
              <Link to="/">
                <div className="flipper">
                  <div className="front">
                    <img src="../dist/img/nawafid-logo.jpg" alt="logo-footer" height="60px" width="120px" />
                  </div>
                  <div className="back">
                    <img src={logo} alt="logo-footer" height="60px" alt="" width="120px" />    </div>
                  <div className="clear"></div>
                </div>
              </Link>
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <div className="drop_down">
                    <button className="dropbtn">
                      <img alt="" className="img-circle img-sm" src="../dist/img/chiali-icons.jpg" /> Chiali Trading</button>
                    <div className="dropdown-content">
                      <Link to="/presentation">Presentation </Link>
                      <Link to="/mot-de-dg">Mot de La diréction géneral</Link>
                      {/* <Link to="/#eventsd">Actualités et evénements</Link> */}
                    </div>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="drop_down">
                    <button className="dropbtn">
                      <img alt="" className="img-circle img-sm" src="../dist/img/chiali-icons.jpg" /> Nos produits</button>
                    <div className="dropdown-content">
                      <Link to="/productsA">AGRICOLE</Link>
                      <Link to="/productsG">SEGMENT GRAND PUBLIC</Link>
                      <Link to="/productsN">NAWAFID</Link>
                    </div>
                  </div>
                </li>
                <li className="nav-item header-link">
                  <Link to="/points-des-vents">
                    <img className="img-circle img-sm" src="../dist/img/chiali-icons.jpg" />
                    &nbsp; Nos points de vente
                  </Link>
                </li>
                <li className="nav-item header-link ">
                  <Link to="/catalogs">
                    <img alt="" className="img-circle img-sm" src="../dist/img/chiali-icons.jpg" />
                    &nbsp; Support
                  </Link>
                </li>
                <li className="nav-item header-link ">
                  <Link to="/nos_partenaires">
                    <img alt="" className="img-circle img-sm" src="../dist/img/chiali-icons.jpg" />
                    &nbsp; Nos Partenaires
                  </Link>

                </li>
                <li className="nav-item header-link ">
                  <Link to="/cart">
                    <i style={{ color: "#dc3545", fontSize: 20 }} className=" fa fa-cart-plus"></i> {t("cart")} <span className="badge badge-danger">{this.props.items.addedItems.length ? this.props.items.addedItems.length : ""}</span>
                  </Link>


                </li>
              </ul>
            </div>
          </nav>



        </div>
      </div >
    </>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.cart,
});

export default withTranslation()(connect(mapStateToProps)(Header));