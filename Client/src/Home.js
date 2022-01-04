import Header from './Home/Header'
import Slider from './Home/Slider'
import Agricole from './Home/Agricole'
import Aos from 'aos'
import "./aos.css"
import { Link } from "react-router-dom"
import Footer from './Home/Footer'
import Events from './Home/Events'
import "./styles.css"
import Catalog from './Home/Catalog'
import Counters from './Home/Counters'
import { useState, useEffect } from "react"
import { relativeTimeRounding } from 'moment'
import PresentationHome from './Home/PresentationHome'

function Home() {
  const [visible, setVisible] = useState(false)
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 800) {
      setVisible(true)

    }
    else if (scrolled <= 300) {
      setVisible(false)
    }
  };

  useEffect(() => {
    Aos.init({ duration: "1000" })
  }, [])
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };
  const scrollTobottom = () => {
    window.scrollTo({
      top: 10000,
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };
  window.addEventListener('scroll', toggleVisible);
  return (

    <div className="min-height">

      <Header />
      <Slider />
      <div className="floating-btn" >
        <button onClick={scrollTobottom} className="scroll-btntop">
          <i className="fa  fa-angle-down"></i>
        </button>
        <Agricole />
        {/* <Catalog></Catalog> */}

        <div className="pres-home" >
          <div className="container-fluid my-5 text-center pres-home ">
            <div className="my-5"><h2>Qui Nous Sommes? </h2></div>
            <div className="row">
              <div data-aos="fade-left" data-aos-offset="300" className="col-md-6 col-sm-12 col-lg-6">
                <p>
                  Fondée en 2017, CHIALI TRADING filiale du GROUPE CHIALI, active dans la
                  commercialisation des produits du Groupe et d’autres importés d’Italie, de
                  France et d’Allemagne dans le domaine de la Plomberie et Système
                  d’Irrigation.
                  <br />
                  Elle conçoit et fournit aussi des solutions pour la Menuiserie PVC avec sa
                  marque NAWAFID.
                </p>
                <Link to="/presentation#actions">Voir plus ...</Link>
              </div>
              <div data-aos="fade-right" data-aos-offset="500" className="col-md-6 col-sm-12 col-lg-6">
                <img src="./dist/img/01.jpg" className="img-fluid rounded" />
              </div>
            </div>

          </div>
        </div>
        <div id="eventsd" data-aos="zoom-in" data-aos-duration="2000" data-aos-offset="200" >
          <Events />
        </div>
        {/* <Counters></Counters> */}
        <button onClick={scrollToTop}
          className="scroll-btnbottom">
          <i className="fa  fa-angle-up"></i>
        </button>
        <Footer />

      </div>
    </div >


  );
}

export default Home;
