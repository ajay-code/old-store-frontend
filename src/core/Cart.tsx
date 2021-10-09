import React, { useEffect, useState } from "react";
import Base from "./Base";
import Card from "./Card";
import { getCart } from "./helper/cartHelper";
import PaymentB from "./PaymentB";

const Cart: React.FC = () => {
  const [products, setProducts] = useState<CartItem[]>([]);
  const [reload, setReload] = useState(false);

  const loadProducts = (products: CartItem[]) => (
    <div>
      <h1>this is the section to load products</h1>
      {products.map((product, index) => {
        return (
          <Card
            key={index}
            product={product}
            addToCart={false}
            removeFromCart
            setReload={setReload}
          />
        );
      })}
    </div>
  );

  useEffect(() => {
    setProducts(getCart());
  }, [reload]);

  return (
    <Base title="Cart Page" description="Ready to Checkout">
      <div className="row row-cols-2 text-center">
        <div className="col">
          {products.length > 0 ? (
            loadProducts(products)
          ) : (
            <h3>No products in cart</h3>
          )}
        </div>
        <div className="col mt-4">
          <PaymentB products={products} setReload={setReload} />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
