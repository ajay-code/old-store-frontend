import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { deleteProduct, getAllProducts } from "./helper/adminApiCall";

type ProductType = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: {
    name: string;
    _id: string;
  };
  stock: number;
  sold: number;
};

const ManageProducts: React.FC = () => {
  const [products, setProducts] = useState([]);
  const { user, token } = isAuthenticated() as JWT;

  const removeProduct = (productId: string) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  const preload = () => {
    getAllProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const productRow = ({ name, _id }: ProductType, index: number) => (
    <div className="row text-center mb-2" key={index}>
      <div className="col-4">
        <h3 className="text-white text-start">{name}</h3>
      </div>
      <div className="col-4">
        <Link className="btn btn-success" to={`/admin/products/update/${_id}`}>
          <span className="">Update</span>
        </Link>
      </div>
      <div className="col-4">
        <button
          onClick={() => {
            removeProduct(_id);
          }}
          className="btn btn-danger"
        >
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <Base title="Welcome admin" description="Manage products here">
      <Link className="btn btn-info mb-3" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <h2 className="mb-4">All products:</h2>

      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">
            Total {products.length} products
          </h2>
          {products.map((product, index) =>
            productRow(product as ProductType, index)
          )}
        </div>
      </div>
    </Base>
  );
};

export default ManageProducts;
