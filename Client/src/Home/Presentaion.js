import Footer from "./Footer"
import Header from "./Header"
import { Link } from "react-router-dom"

const Presentation = () => {
    return (

        <>
            <Link></Link>
            <Header></Header>
            <div id="actions" className="actions"><div className="container" ><Link to="/">Accueil</Link> \ Presentation </div></div>
            <div className="container my-5 presentation">
                <h3>Présentation de CHIALI TRADING </h3>

                <p>
                    Fondée en 2017, CHIALI TRADING filiale du GROUPE CHIALI, active dans la
                    commercialisation des produits du Groupe et d’autres importés d’Italie, de
                    France et d’Allemagne dans le domaine de la Plomberie et Système
                    d’Irrigation.
                    <br />
                    Elle conçoit et fournit aussi des solutions pour la Menuiserie PVC avec sa
                    marque NAWAFID.
                </p>
                <p>
                    La société CHIALI TRADING compte, aujourd’hui, plus de 100 collaborateurs
                    directs et plus de 1000 clients répartis sur le territoire national.
                </p>
                <p>
                    La Spa CHIALI TRADING s’engage dans le renforcement du réseau de
                    distribution avec un objectif principal : la couverture du marché Algérien.

                </p>
                <p>
                    Fort de la qualité de ses différents produits, CHIALI TRADING offre des solutions
                    Complètes et de Qualité dans les domaines :
                </p>
                <div className="d-flex justify-content-center m-5">
                    <iframe src="https://www.youtube.com/embed/1b8BPM44HRw?t=2" width="750" height="500" ></iframe>
                </div>
                <h3>Chauffage- Sanitaire - Evacuation :</h3>
                <ul>
                    <li>Tube PEHD</li>
                    <li>Tube PVC-U Fileté</li>
                    <li>Tube PVC-U Ecoulement</li>
                    <li>Tube multicouche & Accessoires</li>
                    <li>Chaudières, Radiateurs et Sèches serviettes</li>
                    <li>Cumulus</li>
                    <li>Pièces de Rechange Chaudières</li>
                    <li>Vannes sphériques</li>
                    <li>Pompes & Circulateurs</li>
                </ul>
                <h3>Système d’Irrigation :</h3>
                <ul>
                    <li>Accessoires PP</li>
                    <li>Système d’Irrigation Goutte à Goutte avec PEBD et/ou Gaine plate</li>
                    <li>Système d’Irrigation par Aspersion en PEHD</li>
                    <li>Conduites d’amenées</li>
                    <li>Accessoires PP</li>
                    <li>Géomembrane en PEHD</li>
                </ul>
                <h3>Menuiserie PVC NAWAFID</h3>

                <ul>
                    <li>Fenêtre</li>
                    <li>Porte & Porte-fenêtre</li>
                    <li>Volet roulant</li>
                    <li>Moustiquaire</li>
                    <li>Vitrage</li>
                </ul>
                <p>
                    <strong>CHIALI TRADING</strong> opère notamment dans les études techniques et
                    l’accompagnement de ses clients sur le terrain à travers des équipes
                    qualifiées et présentes à tout moment, et dispose de grandes plateformes de
                    stockage et des moyens logistiques afin de faciliter l’approvisionnement de
                    ses distributeurs et revendeurs.
                </p>
            </div>

            <Footer></Footer>
        </>
    );
}

export default Presentation