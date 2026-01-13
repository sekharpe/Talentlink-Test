// import { useEffect, useState } from "react";
// import api from "../api/axios";// your axios instance

// function Notifications() {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     api.get("/notifications/")
//       .then(res => {
//         setNotifications(res.data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("Error fetching notifications", err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <p>Loading notifications...</p>;
//   }

//   return (
//     <div>
//       <h2>Notifications</h2>

//       {notifications.length === 0 && (
//         <p>No notifications</p>
//       )}

//       {notifications.map(n => (
//         <div
//           key={n.id}
//           style={{
//             border: "1px solid #ccc",
//             padding: "10px",
//             marginBottom: "8px",
//             backgroundColor: n.is_read ? "#f5f5f5" : "#e8f0fe"
//           }}
//         >
//           <p>{n.message}</p>
//           <small>{new Date(n.created_at).toLocaleString()}</small>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Notifications;

import { useEffect, useState } from "react";
import api from "../api/axios";
import "./Notifications.css";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/notifications/")
      .then(res => {
        setNotifications(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const markAsRead = (id) => {
    api.patch(`/notifications/${id}/read/`)
      .then(() => {
        setNotifications(prev =>
          prev.map(n =>
            n.id === id ? { ...n, is_read: true } : n
          )
        );
        window.dispatchEvent(new Event("notifications-updated"));
      });
  };

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading notifications...</p>;
  }

  return (
    <div className="notifications-container">
      <div className="notifications-title">Notifications</div>

      {notifications.length === 0 && (
        <div className="no-notifications">
          No notifications yet
        </div>
      )}

      {notifications.map(n => (
        <div
          key={n.id}
          className={`notification-card ${n.is_read ? "read" : "unread"}`}
          onClick={() => !n.is_read && markAsRead(n.id)}
        >
          <div className="notification-message">
            {n.message}
          </div>
          <div className="notification-time">
            {new Date(n.created_at).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Notifications;

