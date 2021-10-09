import { API } from "../../backend";

export const getProducts = () => {
  return fetch(`${API}/products`)
    .then((res) => res.json())
    .catch(console.log);
};
