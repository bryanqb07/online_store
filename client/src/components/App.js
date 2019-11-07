import React from "react";
import { Route, Switch } from "react-router-dom";
import ProductsIndex from "./products/ProductsIndex";
import Login from './Login';

const App = () => (
  <div>
    <h1>Online Store</h1>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={ProductsIndex} />
    </Switch>
  </div>
)
export default App;
