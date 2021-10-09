import React, { useEffect, useState } from "react";
import { cartEmpty } from "./helper/cartHelper";
import { createOrder } from "./helper/orderHelper";
import { getPaymentToken, processPayment } from "./helper/paymentHelper";
import { isAuthenticated } from "./../auth/helper";
import DropIn from "braintree-web-drop-in-react";

interface IPaymentB {
  products: CartItem[];
  setReload?: Function;
}
const PaymentB: React.FC<IPaymentB> = ({
  products,
  setReload = (f: any) => f,
}) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {} as any,
  });

  const { user, token } = isAuthenticated() as JWT;

  const getToken = (userId: string, token: string) => {
    return getPaymentToken(userId, token);
  };

  useEffect(() => {
    if (!(products.length > 0)) {
      return;
    }
    getToken(user._id, token).then((info) => {
      if (info.error) {
        setInfo((prev) => ({ ...prev, error: info.error }));
      } else {
        const clientToken = info.clientToken;
        setInfo((prev) => ({ ...prev, clientToken }));
      }
    });
  }, [products]);

  const onPurchase = () => {
    setInfo((prev) => ({ ...prev, loading: true }));
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data: any) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount(),
      };
      processPayment(user._id, token, paymentData)
        .then((res) => {
          if (res.error) {
            setInfo((prev) => ({
              ...prev,
              success: res.success,
              loading: false,
              error: "Payment Failed",
            }));
            console.log(res.error);
          } else {
            setInfo((prev) => ({
              ...prev,
              success: res.success,
              loading: false,
            }));
            console.log("PAYMENT SUCCESS", res);
            const orderData = {
              products,
              transaction_id: res.transaction.id,
              amount: res.transaction.amount,
            };
            createOrder(user._id, token, orderData);
            cartEmpty(() => console.log("Empty Cart?"));
            setReload((prev: boolean) => !prev);
          }
        })
        .catch((err) => {
          setInfo((prev) => ({ ...prev, success: false, loading: false }));
          console.log("PAYMENT FAILED", err);
        });
    });
  };

  const getAmount = () => {
    return products.reduce(
      (result, item) => result + item.price * item.count,
      0
    );
  };
  const showDropIn = () => (
    <div>
      {info.clientToken !== null && products.length > 0 ? (
        <div>
          <DropIn
            options={{ authorization: info.clientToken }}
            onInstance={(instance) => (info.instance = instance)}
          />
          <div className="d-grid">
            <button className="btn btn-success" onClick={onPurchase}>
              Buy
            </button>
          </div>
        </div>
      ) : (
        <h3>Please log in or add products to cart.</h3>
      )}
    </div>
  );

  return (
    <div>
      <h3>Your bill is ${getAmount()}</h3>
      {showDropIn()}
    </div>
  );
};

export default PaymentB;
