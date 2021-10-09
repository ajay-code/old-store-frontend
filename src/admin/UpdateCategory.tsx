import React, { useCallback, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getCategory, updateCategory } from "./helper/adminApiCall";

const UpdateCategory: React.FC<any> = ({ match }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { user, token } = isAuthenticated() as JWT;
  const history = useHistory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    updateCategory(match.params.categoryId, user._id, token, { name })
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setSuccess(false);
        } else {
          setError("");
          setSuccess(true);
          setName("");
        }
      })
      .catch(console.log);
  };

  const preload = useCallback(() => {
    getCategory(match.params.categoryId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setName(data.name);
      }
    });
  }, [match.params.categoryId]);

  useEffect(() => {
    preload();
  }, [preload]);

  useEffect(() => {
    console.log("history changer");
    if (success) {
      setTimeout(() => history.push("/admin/dashboard"), 3000);
    }
  }, [success, history]);

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-info btn-sm mb-3" to="/admin/dashboard">
        Dashboard
      </Link>
    </div>
  );

  const categoryForm = () => (
    <form onSubmit={onSubmit}>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {success && (
        <div className="alert alert-success mt-3">
          Category Successfully Updated
        </div>
      )}

      <div className="mb-3">
        <p className="lead fw-normal">Enter the category</p>

        <input
          type="text"
          className="form-control my-3"
          autoFocus
          required
          placeholder="For ex. Summer"
          value={name}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-outline-info ">
          Update Category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Create Category here"
      description="Add a new category for new t-shirts"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded mx-1">
        <div className="col-md-8 offset-md-2">
          {categoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
