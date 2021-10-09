import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "../auth/helper";
import Base from "../core/Base";

const SignUp: React.FC = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange =
    (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [name]: e.target.value });
    };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signUp({
      name,
      email,
      password,
    })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(() => console.log("Error in sign up"));
  };

  const successMessage = () => {
    return (
      <div className="alert alert-success">
        New account created successfully. Please{" "}
        <Link to="/signin">Login Here</Link>
      </div>
    );
  };

  const errorMessage = () => {
    return <div className="alert alert-danger">{error}</div>;
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4 text-left">
          <form onSubmit={onSubmit}>
            {success && successMessage()}
            {error && errorMessage()}
            <p className="invalid-feedback">{error}</p>
            <div className="mb-3">
              <label className="form-label text-light">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={name}
                onChange={handleChange("name")}
              />
            </div>
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
    <Base title="SignUp Page" description="A page for user to sign up!">
      {signUpForm()}
    </Base>
  );
};

export default SignUp;
