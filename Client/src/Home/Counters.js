import Footer from "./Footer"
import Header from "./Header"
import { Link } from "react-router-dom"
import CountUp from 'react-countup';

const Presentation = () => {
    return (

        <>
            <div className="container counters ">
                <div className="row counters">
                    <div className="col-sm-12 col-md-4 col-lg-4  counter ">
                        <div><i className="fa fa-user"></i></div>
                        <div><i className="fa fa-plus"></i>&nbsp;
                            <CountUp
                                start={30}
                                end={500}
                                duration={30}
                            />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-4  counter">
                        <div><i className="fa fa-shopping-cart"></i></div>
                        <div><i className="fa fa-plus"></i>
                        &nbsp;
                            <CountUp
                                start={80}
                                end={300}
                                duration={30}
                            />
                        </div>

                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-4 counter">
                        <div><i className="fa fa-bell"></i></div>
                        <div><i className="fa fa-plus"></i>
                        &nbsp;
                            <CountUp
                                start={3}
                                end={100}
                                duration={20} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Presentation