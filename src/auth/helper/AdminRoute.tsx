import React from "react";

import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";

const AdminRoute: React.FC<any> = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location, ...props }) =>
        isAuthenticated() && (isAuthenticated() as JWT).user.role === 1 ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/signin", state: { from: location } }} />
        )
      }
    ></Route>
  );
};

export default AdminRoute;
