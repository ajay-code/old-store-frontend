interface Product {
  _id?: string;
  [key: string]: any;
}

interface CartItem extends Product {
  count: number;
}

interface JWT {
  user: { name: string; email: string; _id: string; role: number };
  token: string;
}
