import React, { useEffect, useState } from "react";
import ImageHelper from "./helper/ImageHelper";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import { useHistory } from "react-router-dom";

type CardPropsType = {
  product: Product;
  addToCart?: boolean;
  removeFromCart?: boolean;
  setReload?: Function;
};
const Card: React.FC<CardPropsType> = ({
  product,
  addToCart = true,
  removeFromCart = false,
  setReload = (f: any) => f,
}) => {
  const {
    name = "Default Name",
    description = "Default Description",
    price = "DEFAULT",
  } = product;

  const [redirect, setRedirect] = useState(false);
  const history = useHistory();

  const addToLocalCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const removeFromLocalCart = () => {
    if (product._id) {
      removeItemFromCart(product._id);
      setReload((prev: any) => !prev);
    }
  };

  useEffect(() => {
    const getRedirect = (redirect: boolean) => {
      if (redirect) {
        return history.push("/cart");
      }
    };
    getRedirect(redirect);
  }, [redirect, history]);

  const showAddToCart = (addToCart: boolean) => {
    return (
      addToCart && (
        <button
          onClick={addToLocalCart}
          className="btn btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart: boolean) => {
    return (
      removeFromCart && (
        <button
          onClick={removeFromLocalCart}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove from Cart
        </button>
      )
    );
  };

  return (
    <div className="card text-white bg-dark border border-info">
      <div className="card-header lead text-center">{name}</div>
      <div className="card-body">
        <div className="rounded border border-success p-2">
          <ImageHelper product={product} />
        </div>
        <p className="lead bg-success fw-normal px-1 text-truncate">
          {description}
        </p>
        <div className="btn btn-sm btn-success rounded px-4 mb-2">
          $ {price}
        </div>
        <div className="d-grid">
          {showAddToCart(addToCart)}
          {showRemoveFromCart(removeFromCart)}
        </div>
      </div>
    </div>
  );
};

export default Card;
