import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import UserDashBoard from './user/UserDashBoard'
import AdminDashBoard from './user/AdminDashBoard'

import AdminRoute from './auth/helper/AdminRoutes'
import PrivateRoute from './auth/helper/PrivateRoutes'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
