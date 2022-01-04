import Footer from "./Footer"
import Header from "./Header"
import { Link } from "react-router-dom"

const PresentationHome = () => {
    return (

        <>
            <div className="pres-home" >
                <div className="container-fluid my-5 text-center pres-home ">
                    <div className=" my-5"><h2>Qui Nous Sommes? </h2></div>

                    <p>
                        Fondée en 2017, CHIALI TRADING filiale du GROUPE CHIALI, active dans la
                        commercialisation des produits du Groupe et d’autres importés d’Italie, de
                        France et d’Allemagne dans le domaine de la Plomberie et Système
                        d’Irrigation.
                        <br />
                        Elle conçoit et fournit aussi des solutions pour la Menuiserie PVC avec sa
                        marque NAWAFID.
                    </p>
                    <Link to="/presentation">Voir plus ...</Link>
                </div>
            </div>
        </>
    );
}

export default PresentationHome