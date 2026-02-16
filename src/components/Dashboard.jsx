import React, { useEffect, useState } from "react";
import api from "../api";
import Products from "./Products";
import CartView from "./CartView";
import OrdersView from "./OrdersView";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [view, setView] = useState("products"); // Toggles between 'products' and 'cart'

  // Fetch User Data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/current_user/");
        setUser(res.data);
        console.log("Fetched user data:", res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Add to Cart Logic
  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  // Remove from Cart Logic
  const removeFromCart = (indexToRemove) => {
    setCart((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  // Checkout Logic (The logic you requested)
  // Inside Dashboard.jsx
  const handleCheckout = async (totalAmount, phoneNumber) => {
    if (user.account_balance < totalAmount) {
      alert(`Insufficient balance!`);
      return;
    }

    try {
      const response = await api.post("/api/orders/", {
        customer: user.id,
        items: cart.map((item) => ({
          product_title: item.title,
          price: item.price,
          quantity: 1, // Explicitly sets the quantity
        })),
        total_price: totalAmount,
        phone_number: phoneNumber,
      });

      if (response.status === 201) {
        alert("Purchase Successful!");
        setCart([]);
        setView("products");
        const updatedUser = await api.get("/api/current_user/");
        setUser(updatedUser.data);
      }
    } catch (err) {
      // debugging line to see backend error details
      console.error("Backend Error Details:", err.response?.data);
      alert("Transaction failed. Check console for details.");
    }
  };

  const handleLogout = async () => {
    try {
      // Point this to YOUR custom API endpoint, not /oidc/
      await api.post("/api/logout/");

      // Redirect to your landing page after successful logout
      window.location.href = "https://customerorder.netlify.app";
    } catch (err) {
      console.error("Logout failed:", err);
      // If it fails (e.g., session already expired), send them home anyway
      window.location.href = "https://customerorder.netlify.app";
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!user) return null;

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      {/* HEADER */}
      <header
        className="navbar navbar-dark sticky-top p-3 shadow"
        style={{ backgroundColor: "#bfe7f0" }}
      >
        <div className="container d-flex justify-content-between align-items-center">
          <h2
            onClick={() => setView("products")}
            style={{ cursor: "pointer", marginBottom: 0 }}
          >
            Marketplace
          </h2>

          <div>
            <button
              className="btn btn-primary btn-sm me-2"
              onClick={() => setView("orders")} // Change this from 'cart' to 'orders'
            >
              My Orders
            </button>
            <button
              className="btn btn-primary btn-sm me-2"
              onClick={() => setView("cart")}
            >
              Cart ({cart.length})
            </button>

            <button
              className="btn btn-outline-danger btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* MAIN BODY */}
      <main className="container mt-4 pb-5">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 mb-4">
            <div className="card shadow-sm p-3 border-0">
              <div className="text-center">
                <img
                  src={user.profile_picture || "https://via.placeholder.com/80"}
                  className="rounded-circle mb-2"
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  alt="user"
                />
                <h6>
                  {user.first_name} {user.last_name}
                </h6>
                <p className="text-muted small mb-0">{user.email}</p>
              </div>
              <hr />
              <p className="mb-1">
                <strong>Balance:</strong> ${user.account_balance.toFixed(2)}
              </p>
              <p className="small text-muted">User Code: {user.code}</p>
            </div>
          </div>

          {/* Dynamic View Area */}
          {/* Dynamic View Area */}
          <div className="col-md-9">
            <div className="card shadow-sm p-4 border-0">
              {/* CONDITIONAL RENDERING LOGIC */}

              {view === "products" && (
                <>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="mb-0">Available Products</h4>
                  </div>
                  <Products onAddToCart={addToCart} />
                </>
              )}

              {view === "cart" && (
                <CartView
                  cartItems={cart}
                  onRemove={removeFromCart}
                  onBack={() => setView("products")}
                  onCheckout={handleCheckout}
                  userBalance={user.account_balance}
                />
              )}

              {view === "orders" && (
                <OrdersView onBack={() => setView("products")} />
              )}

              {/* EMPTY STATE (Safety Check) */}
              {!["products", "cart", "orders"].includes(view) && (
                <div className="text-center py-5">
                  <p className="text-muted">View not found.</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => setView("products")}
                  >
                    Return Home
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
