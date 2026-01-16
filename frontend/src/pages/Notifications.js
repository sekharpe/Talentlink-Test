// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import "./Notifications.css";

// function Notifications() {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   const fetchNotifications = async () => {
//     try {
//       const res = await api.get("/notifications/");
//       setNotifications(res.data || []);
//     } catch (error) {
//       console.error("Failed to fetch notifications");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const markAsRead = async (id) => {
//     try {
//       await api.post(`/notifications/${id}/mark-read/`);

//       // Update UI instantly
//       setNotifications(prev =>
//         prev.map(n =>
//           n.id === id ? { ...n, is_read: true } : n
//         )
//       );

//       // Update navbar unread count
//       window.dispatchEvent(new Event("notifications-updated"));
//     } catch (error) {
//       console.error("Failed to mark notification as read");
//     }
//   };

//   const unread = notifications.filter(n => !n.is_read);
//   const read = notifications.filter(n => n.is_read);

//   if (loading) {
//     return <p className="notif-loading">Loading notifications...</p>;
//   }

//   return (
//     <div className="notifications-container">
//       <h2>Notifications</h2>

//       {/* ================= UNREAD ================= */}
//       <div className="notif-section">
//         <h3>Unread</h3>

//         {unread.length === 0 ? (
//           <p className="empty-text">No unread notifications 🎉</p>
//         ) : (
//           unread.map(n => (
//             <div key={n.id} className="notif-card unread">
//               <p>{n.message}</p>
//               <button onClick={() => markAsRead(n.id)}>
//                 Mark as read
//               </button>
//             </div>
//           ))
//         )}
//       </div>

//       {/* ================= READ ================= */}
//       <div className="notif-section">
//         <h3>Read</h3>

//         {read.length === 0 ? (
//           <p className="empty-text">No read notifications</p>
//         ) : (
//           read.map(n => (
//             <div key={n.id} className="notif-card read">
//               <p>{n.message}</p>
//             </div>
//           ))
//         )}
//       </div>
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
    fetchNotifications();
  }, []);

  // ================= FETCH =================
  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications/");
      setNotifications(res.data || []);
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    } finally {
      setLoading(false);
    }
  };

  // ================= MARK AS READ =================
  const markAsRead = async (id) => {
    try {
      // 🔥 MUST MATCH BACKEND URL
      await api.post(`/notifications/${id}/mark-read/`);

      // 🔥 Re-fetch from backend (source of truth)
      await fetchNotifications();

      // 🔥 Update navbar unread count
      window.dispatchEvent(new Event("notifications-updated"));
    } catch (error) {
      console.error("Failed to mark notification as read", error);
    }
  };

  // ================= FILTER =================
  const unread = notifications.filter(n => !n.is_read);
  const read = notifications.filter(n => n.is_read);

  if (loading) {
    return <p className="notif-loading">Loading notifications...</p>;
  }

  return (
    <div className="notifications-container">
      <h2>Notifications</h2>

      {/* ========== UNREAD ========== */}
      <div className="notif-section">
        <h3>Unread</h3>

        {unread.length === 0 ? (
          <p className="empty-text">No unread notifications 🎉</p>
        ) : (
          unread.map(n => (
            <div key={n.id} className="notif-card unread">
              <p>{n.message}</p>
              <button onClick={() => markAsRead(n.id)}>
                Mark as read
              </button>
            </div>
          ))
        )}
      </div>

      {/* ========== READ ========== */}
      <div className="notif-section">
        <h3>Read</h3>

        {read.length === 0 ? (
          <p className="empty-text">No read notifications</p>
        ) : (
          read.map(n => (
            <div key={n.id} className="notif-card read">
              <p>{n.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notifications;
