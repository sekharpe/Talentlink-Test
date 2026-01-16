// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../api/axios";

// function Profile() {
//   const { userId } = useParams();

//   const [reviewsData, setReviewsData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const res = await api.get(`/reviews/user/${userId}/`);
//         setReviewsData(res.data);
//       } catch (err) {
//         console.error("Error fetching reviews", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReviews();
//   }, [userId]);

//   if (loading) return <p>Loading profile...</p>;

//   return (
//     <div style={{ maxWidth: "800px", margin: "0 auto" }}>
//       <h2>Profile</h2>

//       {/* ⭐ Rating */}
//       <h3>
//         ⭐ {reviewsData.average_rating} / 5
//         <span style={{ marginLeft: "10px", fontSize: "14px" }}>
//           ({reviewsData.total_reviews} reviews)
//         </span>
//       </h3>

//       {/* 💬 Reviews */}
//       <div style={{ marginTop: "20px" }}>
//         <h3>Reviews</h3>

//         {reviewsData.reviews.length === 0 ? (
//           <p>No reviews yet</p>
//         ) : (
//           reviewsData.reviews.map((review) => (
//             <div
//               key={review.id}
//               style={{
//                 border: "1px solid #ddd",
//                 padding: "10px",
//                 marginBottom: "10px",
//                 borderRadius: "6px",
//               }}
//             >
//               <strong>{review.reviewer_name}</strong>
//               <p>⭐ {review.rating}</p>
//               <p>{review.comment}</p>
//               <small>
//                 {new Date(review.created_at).toLocaleDateString()}
//               </small>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default Profile;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import "./Profile.css";

function Profile() {
  const { userId } = useParams();

  const [reviewsData, setReviewsData] = useState(null);
  const [loading, setLoading] = useState(true);

  // TEMP (later we fetch real user data)
  const [user, setUser] = useState({
    name: "User Name",
    email: "user@email.com",
    completedProjects: 0,
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const [reviewsRes, userRes] = await Promise.all([
          api.get(`/reviews/user/${userId}/`),
          api.get(`/users/user/${userId}/`)
        ]);

        setReviewsData(reviewsRes.data);

        setUser({
          name: userRes.data.name,
          email: userRes.data.email,
          completedProjects: userRes.data.projects_completed,
        });
      } catch (err) {
        console.error("Profile load error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]);

  if (loading) return <p className="loading">Loading profile...</p>;

  return (
    <div className="profile-container">
      {/* Profile Card */}
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2>{user.name}</h2>
            <p className="email">{user.email}</p>
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat">
            <h3>⭐ {reviewsData.average_rating}</h3>
            <p>Rating</p>
          </div>

          <div className="stat">
            <h3>{reviewsData.total_reviews}</h3>
            <p>Reviews</p>
          </div>

          <div className="stat">
            <h3>{user.completedProjects}</h3>
            <p>Projects Completed</p>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <h3>Reviews</h3>

        {reviewsData.reviews.length === 0 ? (
          <p className="no-reviews">No reviews yet</p>
        ) : (
          reviewsData.reviews.map((review) => (
            <div className="review-card" key={review.id}>
              <div className="review-header">
                <strong>{review.reviewer_name}</strong>
                <span>⭐ {review.rating}</span>
              </div>
              <p>{review.comment}</p>
              <small>
                {new Date(review.created_at).toLocaleDateString()}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Profile;
