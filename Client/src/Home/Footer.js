import { Link } from 'react-router-dom';
import logo from '../images/chiali-logo.jpg';

import "../styles.css"
function Footer() {


  return (
    <footer className="mt-5">
      <div className="footer ">

        <div className="row p-3">
          <div className="col-md-3 col-lg-3 d-flex justify-content-center">
            <div>
              <img className="logo-footer"
                src={logo} alt="logo-footer" height="100px" alt="" width="250px" />
              <div className=" social-links  mt-4">


                <a href="#" >
                  <i className="fab fa-facebook "></i> </a>
                <a href="#" >
                  <i className="fab fa-twitter "></i>
                </a>
                <a href="#" >
                  <i className="fab fa-linkedin "></i>
                </a>
                <a href="#" >
                  <i className="fab fa-instagram "></i>
                </a>

              </div>
            </div>
          </div>
          <div className="col-md-3 col-lg-3">
            <h3>Contacts</h3>
            <p><i className="fa fa-map-marker"></i> Voie A Zone Industrielle B.P 160 sidi-bel Abbes</p>
            <p><i className="fa fa-phone"></i> Tel: 213 12 68 34 54</p>
            <p><i className="fa fa-phone"></i> fax: 213 12 68 34 54</p>
            <p><i className="fa fa-envelope"></i> Email: <a href="mailto:traiding@chiali-groupe.com">traiding@chiali-groupe.com</a></p>

          </div>
          <div className="col-md-3 col-lg-3 ">

            <h3>Information</h3>
            <Link to="/mot-de-dg"><p><i className="fa fa-angle-right"></i> Mot de la DG</p></Link>
            <Link to="/catalogs"><p><i className="fa fa-angle-right"></i> Catalogues et Guides</p></Link>
            <p><i className="fa fa-angle-right"></i>contacter nous <a href="mailto:traiding@chiali-groupe.com">traiding@chiali-groupe.com</a></p>
            <Link to="/points-des-vents"> <p><i className="fa fa-angle-right"></i> Les point de vente</p></Link>

          </div>
          <div className="col-md-3 col-lg-3  d-flex justify-content-center">
            <div >
              <img alt="" className="logo-footer"
                src="../dist/img/nawafid-logo.jpg" alt="logo-footer" height="100px" width="180px" />

              <div className=" social-links  mt-4 ">

                <a href="#" >
                  <i className="fab fa-facebook "></i> </a>
                <a href="#" >
                  <i className="fab fa-twitter "></i>
                </a>
                <a href="#" >
                  <i className="fab fa-linkedin "></i>
                </a>
                <a href="#" >
                  <i className="fab fa-instagram "></i>
                </a>

              </div>
            </div>
          </div>


        </div>

      </div>

    </footer>
  );
}

export default Footer;
