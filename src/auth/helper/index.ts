import { API } from "../../backend";

type UserType = {
  name?: string;
  email: string;
  password: string;
};

export const signUp = (user: UserType) => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "Application/json",
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const signIn = (user: UserType) => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "Application/json",
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const authenticate = (data: any, next: Function) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signOut = (next: Function) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();
    return fetch(`${API}/signout`, {
      method: "GET",
    })
      .then((res) => console.log("signout success"))
      .catch((err) => console.log(err));
  }
};

export const isAuthenticated = (): JWT | false => {
  if (typeof window === "undefined") {
    return false;
  }

  let jwt = localStorage.getItem("jwt");
  if (jwt) {
    return JSON.parse(jwt);
  } else {
    return false;
  }
};
