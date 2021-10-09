import React from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { History } from "history";
import { isAuthenticated, signOut } from "../auth/helper";

interface NavBarPropsType extends RouteComponentProps {}

const currentTab = (history: History, path: string) => {
  if (history.location.pathname === path) {
    return {
      color: "rgba(var(--bs-success-rgb)",
    };
  }
  return {
    color: "#ffffff",
  };
};

const NavBar: React.FC<NavBarPropsType> = ({ history }) => {
  return (
    <nav>
      <ul className="nav bg-dark">
        <li className="nav-item">
          <Link to="/" style={currentTab(history, "/")} className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/cart"
            style={currentTab(history, "/cart")}
            className="nav-link"
          >
            Cart
          </Link>
        </li>
        {isAuthenticated() && (isAuthenticated() as JWT).user.role === 0 && (
          <li className="nav-item">
            <Link
              to="/user/dashboard"
              style={currentTab(history, "/user/dashboard")}
              className="nav-link"
            >
              Dashboard
            </Link>
          </li>
        )}
        {isAuthenticated() && (isAuthenticated() as JWT).user.role === 1 && (
          <li className="nav-item">
            <Link
              to="/admin/dashboard"
              style={currentTab(history, "/admin/dashboard")}
              className="nav-link"
            >
              A. Dashboard
            </Link>
          </li>
        )}
        {!isAuthenticated() && (
          <>
            <li className="nav-item">
              <Link
                to="/signup"
                style={currentTab(history, "/signup")}
                className="nav-link"
              >
                Sign up
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/signin"
                style={currentTab(history, "/signin")}
                className="nav-link"
              >
                Sign in
              </Link>
            </li>
          </>
        )}
        {isAuthenticated() && (
          <li className="nav-item">
            <span
              className="nav-link text-warning"
              onClick={() => {
                signOut(() => {
                  history.push("/signin");
                });
              }}
            >
              Sign out
            </span>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default withRouter(NavBar);
