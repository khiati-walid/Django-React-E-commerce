import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from './Home'

import "./styles.css"


import ProductView from "./Products/ProductView"


import Login1 from "./Home/Login"
import Register from "./Home/Register"
import store from './store';
import { Provider } from 'react-redux';

import { loadUser } from './actions/auth';

import Cart from "./Products/Cart"
import { useTranslation } from 'react-i18next';
import Maps from "./Maps"
import EventDetails from "./Home/EventDetails"
import PdfViewer from "./Home/PdfViewer"
import AllCatalogs from "./Home/AllCatalogs"
import Motdeladg from "./Home/MotdeLadg"
import Presentation from "./Home/Presentaion"
import NosPart from "./Home/NosPart"
import Contact from "./Home/Contact"
import ScrollToTop from "./ScrollToTop"
import ProductsAgricole from "./Products/ProductsAgricole"
import ProductsGp from "./Products/ProductsGp"
import ProductsNawafid from "./Products/ProductsNawafid"

function App() {

  const { t, i18n } = useTranslation();
  store.dispatch(loadUser());

  return (
    < div className={i18n.language == "ar" ? "rtl" : ""}>
      <Provider store={store}>
        <Router>

          <ScrollToTop />
          <Switch>
            <Route exact path="/" >
              <Home />
            </Route>
            <Route exact path="/productsG" >
              <ProductsGp />
            </Route>
            <Route exact path="/productsA" >
              <ProductsAgricole />
            </Route>
            <Route exact path="/productsN" >
              <ProductsNawafid />
            </Route>
            <Route exact path="/presentation" >
              <Presentation />
            </Route>
            <Route exact path="/product/:id" >
              <ProductView />
            </Route>

            <Route exact path="/events/:id" >
              <EventDetails />
            </Route>
            <Route exact path="/login" >
              <Login1 />
            </Route>
            <Route exact path="/register" >
              <Register />
            </Route>
            <Route exact path="/cart" >
              <Cart />
            </Route>
            <Route exact path="/contactus" >
              <Contact />
            </Route>
            <Route exact path="/view/:link" >
              <PdfViewer />
            </Route>
            <Route exact path="/catalogs" >
              <AllCatalogs />
            </Route>
            <Route exact path="/points-des-vents" >
              <Maps />
            </Route>
            <Route exact path="/mot-de-dg" >
              <Motdeladg />
            </Route>
            <Route exact path="/nos_partenaires">
              <NosPart></NosPart>
            </Route>
          </Switch> </Router >

      </Provider>
    </div >
  );
}

export default App;