import React, { useEffect, useState } from "react";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreApiCall";

const Home: React.FC = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  }, []);

  return (
    <Base title="Home Page">
      <div className="row row-cols-4">
        {products.map((product, index) => (
          <div className="col" key={index}>
            <Card product={product} />
          </div>
        ))}
      </div>
    </Base>
  );
};

export default Home;
