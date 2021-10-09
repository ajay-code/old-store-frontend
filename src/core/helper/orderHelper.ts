import { API } from "../../backend";

export const createOrder = (
  userId: string,
  token: string,
  orderData: Object
) => {
  fetch(`${API}/orders/${userId}`, {
    method: "POST",
    headers: {
      Accept: "Application/json",
      "Content-Type": "Application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ order: orderData }),
  })
    .then((res) => res.json())
    .catch(console.log);
};
