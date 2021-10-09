import React, { useState } from "react";
import { signIn, isAuthenticated, authenticate } from "../auth/helper";
import { Redirect, useLocation } from "react-router-dom";
import Base from "../core/Base";

const SignIn: React.FC = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated() as JWT;
  const location = useLocation();

  const handleChange =
    (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [name]: e.target.value });
    };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });
    signIn({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            loading: false,
          });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              error: "",
              didRedirect: true,
            });
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadingMessage = () => {
    return <div className="alert alert-info">Loading...</div>;
  };

  const errorMessage = () => {
    return <div className="alert alert-danger">{error}</div>;
  };

  const performRedirect = () => {
    // TODO: redirection
    if (didRedirect) {
      let { from } = (location.state as any) || { from: { pathname: "/" } };

      if (user && user.role === 1) {
        if (from.pathname !== "/") {
          return <Redirect to={from.pathname} />;
        }
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to={from.pathname} />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4 text-left">
          <form onSubmit={onSubmit}>
            {loading && loadingMessage()}
            {error && errorMessage()}
            <div className="mb-3">
              <label className="form-label text-light">Email</label>
              <input
                type="text"
                className="form-control"
                name="email"
                value={email}
                onChange={handleChange("email")}
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-light">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={handleChange("password")}
              />
            </div>
            <div className="d-grid mt-3">
              <button type="submit" className="btn btn-success btn-block">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  return (
    <Base title="SignIn Page" description="A page for user to sign in!">
      {signInForm()}
      {performRedirect()}
    </Base>
  );
};

export default SignIn;
