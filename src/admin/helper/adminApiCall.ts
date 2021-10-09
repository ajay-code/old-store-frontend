import { API } from "../../backend";

/**
 *
 * Category Calls
 *
 */

// create a category
export const createCategory = (
  userId: string,
  token: string,
  category: any
) => {
  return fetch(`${API}/categories/${userId}`, {
    method: "POST",
    headers: {
      Accept: "Application/json",
      "Content-Type": "Application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

// get all categories
export const getAllCategories = () => {
  return fetch(`${API}/categories`)
    .then((res) => res.json())
    .catch(console.log);
};

// get a category
export const getCategory = (categoryId: string) => {
  return fetch(`${API}/categories/${categoryId}`)
    .then((res) => res.json())
    .catch(console.log);
};

// delete category
export const deleteCategory = (
  categoryId: string,
  userId: string,
  token: string
) => {
  return fetch(`${API}/categories/${categoryId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "Application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch(console.log);
};

// update category
export const updateCategory = (
  categoryId: string,
  userId: string,
  token: string,
  category: { name: string }
) => {
  return fetch(`${API}/categories/${categoryId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "Application/json",
      "Content-Type": "Application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((res) => res.json())
    .catch(console.log);
};

/**
 *
 * Product Calls
 *
 */

// get All Products
export const getAllProducts = () => {
  return fetch(`${API}/products`)
    .then((res) => res.json())
    .catch(console.log);
};

// create a Product
export const createProduct = (
  userId: string,
  token: string,
  product: FormData
) => {
  return fetch(`${API}/products/${userId}`, {
    method: "POST",
    headers: {
      Accept: "Application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((res) => res.json())
    .catch(console.log);
};

// get a product
export const getProduct = (productId: string) => {
  return fetch(`${API}/products/${productId}`)
    .then((res) => res.json())
    .catch(console.log);
};

// update a product
export const updateProduct = (
  productId: string,
  userId: string,
  token: string,
  product: FormData
) => {
  return fetch(`${API}/products/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "Application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((res) => res.json())
    .catch(console.log);
};

// delete a product
export const deleteProduct = (
  productId: string,
  userId: string,
  token: string
) => {
  return fetch(`${API}/products/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "Application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch(console.log);
};
