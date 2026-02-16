import React, { useState } from "react";

export default function CartView({
  cartItems,
  onRemove,
  onBack,
  onCheckout,
  userBalance,
}) {
  const [phone, setPhone] = useState("");
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleSubmit = () => {
    if (!phone) {
      alert("Please enter a phone number.");
      return;
    }
    onCheckout(total, phone);
  };

  return (
    <div>
      <button
        className="btn btn-link text-decoration-none mb-3 p-0"
        onClick={onBack}
      >
        ← Continue Shopping
      </button>
      <h3 className="mb-4">My Cart</h3>

      {cartItems.length === 0 ? (
        <div className="alert alert-light border">Your cart is empty.</div>
      ) : (
        <div className="row">
          <div className="col-lg-8 mb-4">
            <ul className="list-group shadow-sm">
              {cartItems.map((item, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span className="text-truncate" style={{ maxWidth: "70%" }}>
                    {item.title}
                  </span>
                  <div className="d-flex align-items-center">
                    <span className="me-3 fw-bold">
                      ${item.price.toFixed(2)}
                    </span>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => onRemove(index)}
                    >
                      X
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-lg-4">
            <div className="bg-light p-4 rounded shadow-sm border">
              <h5>Summary</h5>
              <div className="d-flex justify-content-between my-3">
                <span>Grand Total:</span>
                <span className="fw-bold fs-5 text-dark">
                  ${total.toFixed(2)}
                </span>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold">
                  Contact Phone Number
                </label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="+2547..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <button
                className={`btn w-100 fw-bold ${userBalance >= total ? "btn-success" : "btn-secondary disabled"}`}
                onClick={handleSubmit}
                disabled={!phone || cartItems.length === 0}
              >
                {userBalance >= total
                  ? "Complete Purchase"
                  : "Insufficient Balance"}
              </button>
              {userBalance < total && (
                <small className="text-danger d-block mt-2 text-center">
                  You need ${(total - userBalance).toFixed(2)} more.
                </small>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
