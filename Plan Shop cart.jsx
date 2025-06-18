// File: App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Landing from "./pages/Landing";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;


// File: components/Navbar.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/cart">Cart ({totalItems})</Link>
    </nav>
  );
};

export default Navbar;


// File: context/CartContext.jsx
import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, amount) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(item.quantity + amount, 1) } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};


// File: pages/Landing.jsx
import React from "react";
import { Link } from "react-router-dom";

const Landing = () => (
  <div>
    <h1>Welcome to Paradise Nursery</h1>
    <Link to="/products">
      <button>Browse Plants</button>
    </Link>
  </div>
);

export default Landing;


// File: pages/Products.jsx
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import plants from "../data/plants";

const Products = () => {
  const { addToCart } = useContext(CartContext);

  return (
    <div>
      <h2>Aromatic Plants</h2>
      <div className="section">
        {plants.filter(p => p.category === "aromatic").map((plant) => (
          <div key={plant.id} className="card">
            <img src={plant.image} alt={plant.name} />
            <h3>{plant.name}</h3>
            <p>{plant.description}</p>
            <p>${plant.price}</p>
            <button onClick={() => addToCart(plant)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <h2>Medicinal Plants</h2>
      <div className="section">
        {plants.filter(p => p.category === "medicinal").map((plant) => (
          <div key={plant.id} className="card">
            <img src={plant.image} alt={plant.name} />
            <h3>{plant.name}</h3>
            <p>{plant.description}</p>
            <p>${plant.price}</p>
            <button onClick={() => addToCart(plant)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;


// File: pages/Cart.jsx
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useContext(CartContext);
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <h1>Your Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>Unit Price: ${item.price}</p>
              <p>Total: ${item.price * item.quantity}</p>
              <button onClick={() => updateQuantity(item.id, 1)}>+</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, -1)}>-</button>
              <button onClick={() => removeFromCart(item.id)}>Delete</button>
            </div>
          ))}
          <h3>Grand Total: ${total.toFixed(2)}</h3>
          <Link to="/products"><button>Continue Shopping</button></Link>
          <button onClick={() => alert("Proceeding to checkout...")}>Checkout</button>
        </>
      )}
    </div>
  );
};

export default Cart;


// File: data/plants.js
const plants = [
  {
    id: 1,
    name: "Lavender",
    description: "Aromatic and relaxing.",
    price: 10,
    category: "aromatic",
    image: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    name: "Basil",
    description: "Great for cooking and health.",
    price: 8,
    category: "medicinal",
    image: "https://via.placeholder.com/150"
  }
  // Add more plants as needed
];

export default plants;


// File: index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./context/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);
