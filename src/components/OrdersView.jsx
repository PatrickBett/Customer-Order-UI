// import React, { useEffect, useState } from "react";
// import api from "../api";

// export default function OrdersView({ onBack }) {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await api.get("/api/orders/");
//         setOrders(res.data);
//         console.log("Fetched orders:", res.data);
//       } catch (err) {
//         console.error("Error fetching orders:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   return (
//     <div className="container mt-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <div>
//           <h4 className="mb-0">Order History</h4>
//           <p className="text-muted small">View and manage your previous purchases</p>
//         </div>
//         <button className="btn btn-outline-primary btn-sm" onClick={onBack}>
//           <i className="bi bi-arrow-left"></i> Back to Shop
//         </button>
//       </div>

//       {loading ? (
//         <div className="text-center py-5">
//           <div className="spinner-border text-primary" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//           <p className="mt-2 text-muted">Retrieving your orders...</p>
//         </div>
//       ) : orders.length === 0 ? (
//         <div className="text-center py-5 border rounded bg-light">
//           <p className="text-muted mb-0">You haven't placed any orders yet.</p>
//         </div>
//       ) : (
//         <div className="table-responsive shadow-sm rounded">
//           <table className="table table-hover align-middle mb-0">
//             <thead className="table-dark">
//               <tr>
//                 <th style={{ width: "100px" }}>Order ID</th>
//                 <th>Date</th>
//                 <th>Items Purchased</th>
//                 <th>Total Price</th>
//                 <th>Phone Contact</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order) => (
//                 <tr key={order.id}>
//                   <td className="fw-bold text-primary">#{order.id}</td>
//                   <td>
//                     {new Date(order.order_time).toLocaleDateString(undefined, {
//                       year: 'numeric',
//                       month: 'short',
//                       day: 'numeric'
//                     })}
//                   </td>
//                   <td>
//                     {order.items && order.items.length > 0 ? (
//                       <div className="d-flex flex-wrap gap-1">
//                         {order.items.map((item, idx) => (
//                           <span 
//                             key={idx} 
//                             className="badge bg-info text-dark border shadow-sm"
//                             title={`Price: $${item.price}`}
//                           >
//                             {item.quantity}x {item.product_title}
//                           </span>
//                         ))}
//                       </div>
//                     ) : (
//                       <span className="text-muted italic small">No items details found</span>
//                     )}
//                   </td>
//                   <td className="fw-bold text-success">
//                     ${parseFloat(order.total_price).toFixed(2)}
//                   </td>
//                   <td>
//                     <span className="text-muted">
//                       <i className="bi bi-telephone-fill me-1 small"></i>
//                       {order.phone_number}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
      
//       <div className="mt-3 text-end">
//         <small className="text-muted">
//           Showing {orders.length} total orders
//         </small>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import api from "../api";

export default function OrdersView({ onBack }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/api/orders/");
        setOrders(res.data);
        console.log("Fetched orders:", res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="mb-0">Order History</h4>
          <p className="text-muted small">
            View and manage your previous purchases
          </p>
        </div>
        <button className="btn btn-outline-primary btn-sm" onClick={onBack}>
          <i className="bi bi-arrow-left"></i> Back to Shop
        </button>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted">Retrieving your orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-5 border rounded bg-light">
          <p className="text-muted mb-0">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th style={{ width: "100px" }}>Order ID</th>
                <th>Date</th>
                <th>Items Purchased</th>
                <th>Total Price</th>
                <th>Phone Contact</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="fw-bold text-primary">#{order.id}</td>
                  <td>
                    {new Date(order.order_time).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td>
                    {order.items && order.items.length > 0 ? (
                      <div className="d-flex flex-wrap gap-1">
                        {order.items.map((item, idx) => (
                          <span
                            key={idx}
                            className="badge bg-info text-dark border shadow-sm"
                            title={`Price: $${item.price}`}
                          >
                            {item.quantity}x {item.product_title}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-muted italic small">
                        No items details found
                      </span>
                    )}
                  </td>
                  <td className="fw-bold text-success">
                    ${parseFloat(order.total_price).toFixed(2)}
                  </td>
                  <td>
                    <span className="text-muted">
                      <i className="bi bi-telephone-fill me-1 small"></i>
                      {order.phone_number}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-3 text-end">
        <small className="text-muted">
          Showing {orders.length} total orders
        </small>
      </div>
    </div>
  );
}
