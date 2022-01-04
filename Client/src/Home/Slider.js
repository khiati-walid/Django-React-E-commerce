
import slide1 from "../images/01.JPG"
import slide2 from "../images/3.jpeg"
import slide3 from "../images/02.jpg"
function Slider() {

  return (
    <div id="slider" className="carousel slide carousel-fade slider" data-ride="carousel">
      {/* <div className="overlay"></div> */}
      <ul className="carousel-indicators">
        <li data-target="#slider" data-slide-to="0" className="active"></li>
        <li data-target="#slider" data-slide-to="1"></li>
        <li data-target="#slider" data-slide-to="2"></li>
      </ul>

      <div className="controls">

        <a href="#slider" role="button" data-slide="prev">
          <i className="fa fa-angle-left"></i>
        </a>


        <a href="#slider" role="button" data-slide="next">
          <i className="fa fa-angle-right"></i>
        </a>

      </div>


      <div className="carousel-inner">
        <div className="carousel-item active" data-interval="4000">
          <div className="p-5 text-center bg-image d-flex justify-content-center align-items-center  sliderImg "
            style={{
              backgroundImage: `url(${slide1})`
            }}
          >
            <div className="w-100" >
              <div className="overlay">
                <div className="heading typewriter">
                  <h1 className="mb-3">CHIALI TRAIDING</h1>
                  <h4 className="mb-3">Votre partenaire de solution fiables</h4>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-item" data-interval="2000">

          <div className="p-5 text-center bg-image d-flex justify-content-center align-items-center  sliderImg"
            style={{
              backgroundImage: `url(${slide2})`
            }}
          >
            <div className=" w-100">
              <div className="overlay  d-flex justify-content-center align-items-center h-100 ">
                <div className="text-white">
                  <h1 className="mb-3">Agricole</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-item" data-interval="1000">
          <div className="p-5 text-center bg-image d-flex justify-content-center align-items-center sliderImg "
            style={{
              backgroundImage: `url(${slide3})`
            }}
          >
            <div className="mask w-100">
              <div className=" overlay  d-flex justify-content-center align-items-center h-100 ">
                <div className="text-white">
                  <h1 className="mb-3">Chiali Nawfid</h1>
                  {/* <a className="btn btn-outline-light btn-lg" href="#!" role="button">Call to action</a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



    </div>
  );
}

export default Slider;
