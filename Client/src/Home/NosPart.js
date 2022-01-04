import Footer from "./Footer"

import Header from "./Header"
import { Link } from "react-router-dom"
const NosPart = () => {
    return (

        <>
            <Header></Header>
            <div className="actions"><div className="container" ><Link to="/">Accueil</Link> \ Nos Partenaires </div></div>

            <div className="container my-5">
                <div className="text-center p-5 text-secondary  "> Notre alliance avec des partenaires de renommée mondiale nous a permis de développer des synergies
                    <br />
                    gagnantes dans le but de vous offrir le meilleur service possible ainsi que de meilleurs produits qu'ils soient</div>
                <div className="row">
                    <div className="col-3 p-4">
                        <img alt="" className="logo-footer"
                            src="../dist/img/nawafid-logo.jpg" alt="logo-footer" height="100px" width="180px" />

                    </div>

                    <div className="col-3 p-4">
                        <img alt="" className="logo-footer"
                            src="../dist/img/nawafid-logo.jpg" alt="logo-footer" height="100px" width="180px" />

                    </div>
                    <div className="col-3 p-4">
                        <img alt="" className="logo-footer"
                            src="../dist/img/nawafid-logo.jpg" alt="logo-footer" height="100px" width="180px" />

                    </div>
                    <div className="col-3 p-4">
                        <img alt="" className="logo-footer"
                            src="../dist/img/nawafid-logo.jpg" alt="logo-footer" height="100px" width="180px" />

                    </div>
                    <div className="col-3 p-4">
                        <img alt="" className="logo-footer"
                            src="../dist/img/nawafid-logo.jpg" alt="logo-footer" height="100px" width="180px" />

                    </div>
                </div>



            </div>


            <Footer></Footer>
        </>
    );
}

export default NosPart








