// import React, { useState, useEffect } from "react";
// import {
//     withGoogleMap,
//     withScriptjs,
//     GoogleMap,
//     Marker,
//     InfoWindow
// } from "react-google-maps";
// import * as parkData from "./data/skateboard-parks.json";


// function Map() {
//     const [selectedPark, setSelectedPark] = useState(null);

//     useEffect(() => {
//         const listener = e => {
//             if (e.key === "Escape") {
//                 setSelectedPark(null);
//             }
//         };
//         window.addEventListener("keydown", listener);

//         return () => {
//             window.removeEventListener("keydown", listener);
//         };
//     }, []);

//     return (
//         <GoogleMap
//             defaultZoom={10}
//             defaultCenter={{ lat: 45.4211, lng: -75.6903 }}

//         >
//             {parkData.features.map(park => (
//                 <Marker
//                     key={park.properties.PARK_ID}
//                     position={{
//                         lat: park.geometry.coordinates[1],
//                         lng: park.geometry.coordinates[0]
//                     }}
//                     onClick={() => {
//                         setSelectedPark(park);
//                     }}

//                 />
//             ))}

//             {selectedPark && (
//                 <InfoWindow
//                     onCloseClick={() => {
//                         setSelectedPark(null);
//                     }}
//                     position={{
//                         lat: selectedPark.geometry.coordinates[1],
//                         lng: selectedPark.geometry.coordinates[0]
//                     }}
//                 >
//                     <div>
//                         <h2>{selectedPark.properties.NAME}</h2>
//                         <p>{selectedPark.properties.DESCRIPTIO}</p>
//                     </div>
//                 </InfoWindow>
//             )}
//         </GoogleMap>
//     );
// }

// const MapWrapped = withScriptjs(withGoogleMap(Map));

// export default function Maps() {
//     return (
//         <div style={{ width: "100vw", height: "100vh" }}>
//             <MapWrapped
//                 googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAJRrsCC9QGD3xVI_0rUT6R_gGNy5wBNh0`}
//                 loadingElement={<div style={{ height: `100%` }} />}
//                 containerElement={<div style={{ height: `100%` }} />}
//                 mapElement={<div style={{ height: `100%` }} />}
//             />
//         </div>
//     );
// }


import React, { Component } from 'react'

import Header from './Home/Header';
import Footer from './Home/Footer';
class Maps extends Component {
    state = {
        map: "A"
    }
    componentDidMount() {

    }
    chaneMap(category) {
        this.setState({
            map: category
        })
    }
    render() {
        return (<>
            <Header></Header>
            <div className="maps-list text-center min-height">
                <div className="d-flex justify-content-around">
                    <button onClick={() => this.chaneMap("A")}>Agricole</button>
                    <button onClick={() => this.chaneMap("G")}>Nawafid</button>
                    <button onClick={() => this.chaneMap("N")}>Gp segment</button>

                </div>
                <div className="map">
                    {this.state.map == "A" ?
                        <iframe src="https://www.google.com/maps/d/u/0/embed?mid=17n-N32eKIgFLtUzozy7-KK1NoZoCkMNF" width="100%" height="800px"></iframe> :
                        this.state.map == "N" ? <iframe src="https://www.google.com/maps/d/u/0/embed?mid=1P8epnGrss-_00Oe5gYpBXnaR5cILcQ_r" width="100%" height="480"></iframe> :
                            this.state.map == "G" ? <iframe src="https://www.google.com/maps/d/u/0/embed?mid=1P8epnGrss-_00Oe5gYpBXnaR5cILcQ_r" width="100%" height="480"></iframe> : ''
                    }
                </div>


            </div >
            <Footer></Footer>
        </>
        )
    }
}
export default Maps;