import { API } from "../../backend";

export const getPaymentToken = (userId: string, token: string) => {
  return fetch(`${API}//payment/get-token/${userId}`, {
    method: "GET",
    headers: {
      Accept: "Application/json",
      "Content-Type": "Application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch(console.log);
};

export const processPayment = (
  userId: string,
  token: string,
  paymentInfo: any
) => {
  return fetch(`${API}/payment/braintree/${userId}`, {
    method: "POST",
    headers: {
      Accept: "Application/json",
      "Content-Type": "Application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(paymentInfo),
  })
    .then((res) => res.json())
    .catch(console.log);
};
