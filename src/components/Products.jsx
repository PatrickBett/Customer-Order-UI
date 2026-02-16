import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Products({ onAddToCart }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products?limit=20")
      .then((res) => setItems(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <div className="text-center my-5">Loading Products...</div>;

  return (
    <div className="row g-3">
      {items.map((product) => (
        <div key={product.id} className="col-md-4 col-sm-4">
          <div className="card h-100 p-2 shadow-sm border-0">
            <img
              src={product.image}
              alt={product.title}
              style={{ height: "120px", objectFit: "contain" }}
              className="mb-2"
            />
            <div className="card-body p-1 d-flex flex-column">
              <h6 className="card-title text-truncate small fw-bold">
                {product.title}
              </h6>
              <p className="text-success fw-bold mt-auto mb-2">
                ${product.price.toFixed(2)}
              </p>
              <button
                className="btn btn-outline-primary btn-sm w-100"
                onClick={() => onAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
