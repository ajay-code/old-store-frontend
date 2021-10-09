export const addItemToCart = (newItem: Product, next: Function) => {
  let cart: CartItem[] = [];
  let inCart = false;
  if (typeof window !== "undefined") {
    // load cart
    let cartData = localStorage.getItem("cart");
    if (cartData) {
      cart = JSON.parse(cartData);
    }

    // increment count if item already in cart
    cart = cart.map((item) => {
      if (item._id === newItem._id) {
        inCart = true;
        return {
          ...item,
          count: item.count + 1,
        };
      }
      return item;
    });

    // add to cart if item not in cart
    if (!inCart) {
      cart.push({
        ...newItem,
        count: 1,
      });
    }

    // save to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    next();
  }
};

export const getCart = () => {
  if (typeof window !== "undefined") {
    let cartData = localStorage.getItem("cart");
    if (cartData) {
      return JSON.parse(cartData);
    } else {
      return [];
    }
  }
};

export const removeItemFromCart = (productId: string) => {
  let cart: CartItem[] = [];

  if (typeof window !== "undefined") {
    let cartData = localStorage.getItem("cart");
    if (cartData) {
      cart = JSON.parse(cartData);

      cart = cart.filter((item) => item._id !== productId);

      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
};

export const cartEmpty = (next: Function) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("cart");
    next();
  }
};
