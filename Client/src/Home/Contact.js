import Footer from "./Footer"
import Header from "./Header"
import { Link } from "react-router-dom"

const Contact = () => {
    return (

        <>
            <Header></Header>
            <div className="contact container-fluid d-flex justify-content-center">
                <div className=" contact-form ">
                    <div className="contact-image">
                        <img src="https://image.ibb.co/kUagtU/rocket_contact.png" alt="rocket_contact" />
                    </div>
                    <form>
                        <h3>Envoyez-nous un message</h3>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input type="text" name="txtName" className="form-control" placeholder="Your Name *" />
                                </div>
                                <div className="form-group">
                                    <input type="text" name="txtEmail" className="form-control" placeholder="Your Email *" />
                                </div>
                                <div className="form-group">
                                    <input type="text" name="txtPhone" className="form-control" placeholder="Your Phone Number *" />
                                </div>
                                <div className="form-group">
                                    <input type="submit" name="btnSubmit" className="btnContact" value="Send Message" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <textarea name="txtMsg" className="form-control" placeholder="Your Message *" rows="6" style={{ width: "100", height: "150" }}></textarea>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Footer></Footer>
        </>
    );
}

export default Contact