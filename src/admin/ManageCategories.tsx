import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { deleteCategory, getAllCategories } from "./helper/adminApiCall";
type CategoryType = {
  _id: string;
  name: string;
};
const ManageCategories: React.FC = () => {
  const [categories, setCategories] = useState([]);
  const { user, token } = isAuthenticated() as JWT;

  const removeCategory = (categoryId: string) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  const preload = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const categoryRow = ({ name, _id }: CategoryType, index: number) => (
    <div className="row text-center mb-2" key={index}>
      <div className="col-4">
        <h3 className="text-white text-start">{name}</h3>
      </div>
      <div className="col-4">
        <Link
          className="btn btn-success"
          to={`/admin/categories/update/${_id}`}
        >
          <span className="">Update</span>
        </Link>
      </div>
      <div className="col-4">
        <button
          onClick={() => {
            removeCategory(_id);
          }}
          className="btn btn-danger"
        >
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <Base title="Welcome admin" description="Manage categories here">
      <Link className="btn btn-info mb-3" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <h2 className="mb-4">All categories:</h2>

      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">
            Total {categories.length} categories
          </h2>
          {categories.map((category, index) =>
            categoryRow(category as CategoryType, index)
          )}
        </div>
      </div>
    </Base>
  );
};

export default ManageCategories;
