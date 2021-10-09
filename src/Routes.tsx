import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import "./styles.css";
import SignUp from "./user/SignUp";
import SignIn from "./user/SignIn";
import UserDashboard from "./user/UserDashboard";
import PrivateRoute from "./auth/helper/PrivateRoute";
import AdminRoute from "./auth/helper/AdminRoute";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import ManageCategories from "./admin/ManageCategories";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/UpdateCategory";
import Cart from "./core/Cart";

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/cart" exact component={Cart} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute
          path="/admin/create/category"
          exact
          component={AddCategory}
        />
        <AdminRoute
          path="/admin/categories"
          exact
          component={ManageCategories}
        />
        <AdminRoute
          path="/admin/categories/update/:categoryId"
          exact
          component={UpdateCategory}
        />
        <AdminRoute path="/admin/create/product" exact component={AddProduct} />
        <AdminRoute path="/admin/products" exact component={ManageProducts} />
        <AdminRoute
          path="/admin/products/update/:productId"
          exact
          component={UpdateProduct}
        />
      </Switch>
    </Router>
  );
};

export default Routes;
