// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getProjectProposals } from "../services/proposalService";

// const ClientProjectProposals = () => {
//   const { projectId } = useParams(); // get project id from URL
//   const [proposals, setProposals] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getProjectProposals(projectId)
//       .then((res) => {
//         setProposals(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, [projectId]);

//   if (loading) return <p>Loading proposals...</p>;

//   return (
//     <div className="container">
//       <h2>Proposals</h2>

//       {proposals.length === 0 ? (
//         <p>No proposals submitted yet.</p>
//       ) : (
//         proposals.map((proposal) => (
//           <div key={proposal.id} className="card">
//             <p><strong>Freelancer:</strong> {proposal.freelancer_name}</p>
//             <p><strong>Cover Letter:</strong> {proposal.cover_letter}</p>
//             <p><strong>Bid Amount:</strong> ₹{proposal.bid_amount}</p>
//             <p><strong>Estimated Days:</strong> {proposal.estimated_days}</p>
//             <p><strong>Status:</strong> {proposal.status}</p>
//             <hr />
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default ClientProjectProposals;

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import {
//   getProjectProposals,
//   updateProposalStatus,
// } from "../services/proposalService";


// function ClientProjectProposals() {
//   const { projectId } = useParams();
//   const [proposals, setProposals] = useState([]);

//   useEffect(() => {
//     getProjectProposals(projectId)
//       .then((res) => {
//         console.log("CLIENT PROPOSALS:", res.data);
//         setProposals(res.data);
//       })
//       .catch((err) => {
//         console.error("Error loading proposals", err);
//       });
//   }, [projectId]);

//   // ✅ NEW: Accept / Reject handler
//   const handleStatusChange = (proposalId, status) => {
//     updateProposalStatus(proposalId, status)
//       .then(() => getProjectProposals(projectId))
//       .then((res) => setProposals(res.data))
//       .catch((err) => {
//         console.error("Status update error", err);
//         alert("Failed to update proposal status");
//       });
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Project Proposals</h2>

//       {proposals.length === 0 && <p>No proposals found</p>}

//       {proposals.map((p) => (
//         <div
//           key={p.id}
//           style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
//         >
//           <p><strong>Freelancer:</strong> {p.freelancer_name}</p>
//           <p><strong>Bid:</strong> ₹{p.bid_amount}</p>
//           <p><strong>Status:</strong> {p.status}</p>

//           {/* ✅ NEW: Buttons only for pending */}
//           {p.status === "pending" && (
//             <div>
//               <button
//                 onClick={() => handleStatusChange(p.id, "accepted")}
//                 style={{ marginRight: "10px" }}
//               >
//                 Accept
//               </button>

//               <button
//                 onClick={() => handleStatusChange(p.id, "rejected")}
//               >
//                 Reject
//               </button>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ClientProjectProposals;

// last one

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import {
//   getProjectProposals,
//   updateProposalStatus,
// } from "../services/proposalService";
// import "../styles/proposals.css"; // ✅ ADD THIS

// function ClientProjectProposals() {
//   const { projectId } = useParams();
//   const [proposals, setProposals] = useState([]);

//   useEffect(() => {
//     getProjectProposals(projectId)
//       .then((res) => {
//         console.log("CLIENT PROPOSALS:", res.data);
//         setProposals(res.data);
//       })
//       .catch((err) => {
//         console.error("Error loading proposals", err);
//       });
//   }, [projectId]);

//   const handleStatusChange = (proposalId, status) => {
//     updateProposalStatus(proposalId, status)
//       .then(() => getProjectProposals(projectId))
//       .then((res) => setProposals(res.data))
//       .catch(() => alert("Failed to update proposal status"));
//   };

//   return (
//     <div className="proposals-page">
//       <h2 className="page-title">Project Proposals</h2>

//       {proposals.length === 0 && <p>No proposals found</p>}

//       {proposals.map((p) => (
//         <div key={p.id} className="proposal-card">
//           <p><strong>Freelancer:</strong> {p.freelancer_name}</p>
//           <p><strong>Bid:</strong> ₹{p.bid_amount}</p>

//           <span className={`status-badge ${p.status}`}>
//             {p.status}
//           </span>

//           {p.status === "pending" && (
//             <div className="action-buttons">
//               <button
//                 className="btn accept"
//                 onClick={() => handleStatusChange(p.id, "accepted")}
//               >
//                 Accept
//               </button>

//               <button
//                 className="btn reject"
//                 onClick={() => handleStatusChange(p.id, "rejected")}
//               >
//                 Reject
//               </button>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ClientProjectProposals;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProjectProposals,
  updateProposalStatus,
} from "../services/proposalService";
import "./ClientProjectProposals.css";

function ClientProjectProposals() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    getProjectProposals(projectId)
      .then((res) => setProposals(res.data))
      .catch((err) => console.error(err));
  }, [projectId]);

  const handleStatusUpdate = (proposalId, status) => {
    updateProposalStatus(proposalId, status).then(() => {
      setProposals((prev) =>
        prev.map((p) =>
          p.id === proposalId ? { ...p, status } : p
        )
      );
    });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="proposals-page">
      {/* Header */}
      <div className="proposals-header">
        <button className="btn back-btn" onClick={() => navigate("/projects")}>
          ← Back to Projects
        </button>

        <h2>Project Proposals</h2>

        <button className="btn logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Proposals */}
      {proposals.map((proposal) => (
        <div key={proposal.id} className="proposal-card">
          <div className="proposal-info">
            <p>
              <span>Freelancer:</span> {proposal.freelancer_name}
            </p>
            <p>
              <span>Bid:</span> ₹{proposal.bid_amount}
            </p>
            <p className={`status ${proposal.status}`}>
              {proposal.status}
            </p>
          </div>

          {proposal.status === "pending" && (
            <div className="action-buttons">
              <button
                className="btn accept-btn"
                onClick={() =>
                  handleStatusUpdate(proposal.id, "accepted")
                }
              >
                Accept
              </button>

              <button
                className="btn reject-btn"
                onClick={() =>
                  handleStatusUpdate(proposal.id, "rejected")
                }
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ClientProjectProposals;


