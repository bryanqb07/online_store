import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthRoute from '../util/route_util';
import ProductsIndex from "./products/ProductsIndex";
import Login from './Login';
import Nav from './Nav';
import Registration from "./Registration";
import ProductDetail from './products/ProductDetail'
import CreateProduct from "./CreateProduct";
import Cart from "./cart/Cart";
import CategoriesIndex from "./categories/CategoriesIndex";
import CategoryDetail from "./categories/CategoryDetail";
import Home from "./categories/Home";
import CreateCategory from "./categories/CreateCategory";

const App = () => (
  <div>
    <h1>Online Store</h1>
    <Nav />
    <Switch>
      <AuthRoute exact path="/login" component={Login} routeType={"auth"} />
      <AuthRoute exact path="/register" component={Registration} routeType={"auth"} />
      <Route exact path="/" component={Home} />
      <Route exact path="/products/:id" component={ProductDetail} />
      <AuthRoute exact path="/staff/products/new" component={CreateProduct} routeType={"protected"} />
      <AuthRoute exact path="/staff/categories/new" component={CreateCategory} routeType={"protected"} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/categories" component={CategoriesIndex} />
      <Route exact path="/categories/:id" component={CategoryDetail} />
    </Switch>
  </div>
)
export default App;
