import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { createProduct, getAllCategories } from "./helper/adminApiCall";
import { isAuthenticated } from "../auth/helper/index";

type CategoryType = { _id: string; name: string };

const AddProduct: React.FC = () => {
  const { user, token } = isAuthenticated() as JWT;

  const [values, setValues] = useState({
    photo: "",
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    stock: "",
    loading: false,
    error: "",
    createdProduct: "",
    getRedirect: false,
    formData: new FormData(),
  });

  const preload = useCallback(() => {
    getAllCategories().then((data) => {
      if (data.error) {
        setValues((prevValues) => ({ ...prevValues, error: data.error }));
      } else {
        setValues((prevValues) => ({ ...prevValues, categories: data }));
      }
    });
  }, []);

  useEffect(() => {
    preload();
  }, [preload]);

  const {
    name,
    description,
    price,
    categories,
    stock,
    error,
    createdProduct,
    formData,
  } = values;

  const handleChange =
    (name: string) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      let value;
      if (name === "photo") {
        let target = e.target as HTMLInputElement;
        value = target.files ? target.files[0] : "";
      } else {
        value = e.target.value;
      }
      formData.set(name, value);
      setValues({ ...values, [name]: value });
    };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });

    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          photo: "",
          name: "",
          description: "",
          price: "",
          category: "",
          stock: "",
          loading: false,
          createdProduct: data.name,
          error: "",
        });
      }
    });
  };

  const createProductForm = () => (
    <form onSubmit={onSubmit}>
      <span>Post Photo</span>
      <div className="mb-3">
        <input
          type="file"
          name="photo"
          accept="image"
          placeholder="choose a file"
          className="form-control"
          onChange={handleChange("photo")}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="Name"
          onChange={handleChange("name")}
          value={name}
        />
      </div>

      <div className="mb-3">
        <textarea
          className="form-control"
          name="description"
          placeholder="Description"
          onChange={handleChange("description")}
          value={description}
        />
      </div>
      <div className="mb-3">
        <input
          type="number"
          className="form-control"
          name="price"
          placeholder="Price"
          onChange={handleChange("price")}
          value={price}
        />
      </div>
      <div className="mb-3">
        <select
          name="category"
          className="form-control"
          placeholder="Category"
          onChange={handleChange("category")}
        >
          <option value="">Select Category</option>
          {(categories as CategoryType[]).map((category, index) => (
            <option value={category._id} key={index}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          className="form-control"
          onChange={handleChange("stock")}
          value={stock}
        />
      </div>
      <button type="submit" className="btn btn-outline-info mb-3">
        Create Product
      </button>
    </form>
  );

  return (
    <Base
      title="Add Product"
      description="Welcome to product creation section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {error && <div className="alert alert-danger mt-3">{error}</div>}
          {createdProduct && (
            <div className="alert alert-success mt-3">
              {createdProduct} created successfully
            </div>
          )}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
