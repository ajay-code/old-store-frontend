import React, { useCallback, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Base from "../core/Base";
import {
  updateProduct,
  getAllCategories,
  getProduct,
} from "./helper/adminApiCall";
import { isAuthenticated } from "../auth/helper/index";

type CategoryType = { _id: string; name: string };

const UpdateProduct: React.FC<any> = ({ match }) => {
  const { user, token } = isAuthenticated() as JWT;
  const history = useHistory();
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
    updatedProduct: "",
    getRedirect: false,
    formData: new FormData(),
  });

  const preload = useCallback(async (productId: string) => {
    await getProduct(productId).then((data) => {
      if (data.error) {
        setValues((prevValue) => ({ ...prevValue, error: data.error }));
      } else {
        setValues((prevValues) => ({
          ...prevValues,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category,
          stock: data.stock,
        }));
      }
    });
  }, []);

  const loadCategories = useCallback(() => {
    return getAllCategories().then((data) => {
      if (data.error) {
        setValues((prevValue) => ({ ...prevValue, error: data.error }));
      } else {
        setValues((prevValue) => ({ ...prevValue, categories: data }));
      }
    });
  }, []);

  useEffect(() => {
    const { categories } = values;
    if (categories.length === 0) {
      loadCategories();
    }
  }, [values, loadCategories]);

  useEffect(() => {
    preload(match.params.productId);
  }, [preload, match.params.productId]);

  useEffect(() => {
    const getRedirect = values.getRedirect;
    setTimeout(() => {
      console.log("redirecting", getRedirect);
      if (getRedirect) {
        history.push("/admin/dashboard");
      }
    }, 2000);
  }, [values.getRedirect, history]);

  const {
    name,
    description,
    price,
    category,
    categories,
    stock,
    error,
    updatedProduct,
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

    updateProduct(match.params.productId, user._id, token, formData).then(
      (data) => {
        if (data.error) {
          setValues((prevValues) => ({
            ...values,
            error: data.error,
            loading: false,
          }));
        } else {
          setValues((prevValues) => ({
            ...prevValues,
            loading: false,
            updatedProduct: data.name,
            error: "",
            getRedirect: true,
          }));
        }
      }
    );
  };

  const updateProductForm = () => (
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
          value={category}
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
        Update Product
      </button>
    </form>
  );

  return (
    <Base
      title="Update Product"
      description="Welcome to product creation section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {error && <div className="alert alert-danger mt-3">{error}</div>}
          {updatedProduct && (
            <div className="alert alert-success mt-3">
              {updatedProduct} updated successfully
            </div>
          )}
          {updateProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateProduct;
