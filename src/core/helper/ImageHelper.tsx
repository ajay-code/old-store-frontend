import React from "react";
import { API } from "../../backend";

type ImageHelperType = {
  product: Product;
};
const ImageHelper: React.FC<ImageHelperType> = ({ product }) => {
  const imageUrl = product._id
    ? `${API}/products/photo/${product._id}`
    : "https://via.placeholder.com/1280x720.png";
  return (
    <img
      src={imageUrl}
      alt="plain white t shirt"
      style={{ maxHeight: "100%", maxWidth: "100%" }}
      className="mb-3 rounded"
    />
  );
};

export default ImageHelper;
