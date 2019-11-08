import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthRoute from '../util/route_util';
import ProductsIndex from "./products/ProductsIndex";
import Login from './Login';
import Nav from './Nav';
import Registration from "./Registration";

const App = () => (
  <div>
    <h1>Online Store</h1>
    <Nav />
    <Switch>
      <AuthRoute exact path="/login" component={Login} routeType={"auth"} />
      <AuthRoute exact path="/register" component={Registration} routeType={"auth"} />
      <Route exact path="/" component={ProductsIndex} />
    </Switch>
  </div>
)
export default App;
