// import { useEffect, useState } from "react";
// import { getMyProposals } from "../services/proposalService";

// function FreelancerProposals() {
//   const [proposals, setProposals] = useState([]);

//   useEffect(() => {
//     getMyProposals()
//       .then((res) => {
//         console.log("FREELANCER PROPOSALS:", res.data);
//         setProposals(res.data);
//       })
//       .catch((err) => {
//         console.error("Error loading freelancer proposals", err);
//       });
//   }, []);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>My Proposals</h2>

//       {proposals.length === 0 && <p>No proposals found</p>}

//       {proposals.map((p) => (
//         <div
//           key={p.id}
//           style={{
//             border: "1px solid #ccc",
//             margin: "10px",
//             padding: "10px",
//           }}
//         >
//           <p><strong>Project:</strong> {p.project_title}</p>
//           <p><strong>Bid:</strong> ₹{p.bid_amount}</p>
//           <p><strong>Status:</strong> {p.status}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default FreelancerProposals;

// before styling latest

// import { useEffect, useState } from "react";
// import { getMyProposals } from "../services/proposalService";
// import "../styles/proposals.css"; // ✅ ADD THIS

// function FreelancerProposals() {
//   const [proposals, setProposals] = useState([]);

//   useEffect(() => {
//     getMyProposals()
//       .then((res) => {
//         console.log("FREELANCER PROPOSALS:", res.data);
//         setProposals(res.data);
//       })
//       .catch((err) => {
//         console.error("Error loading freelancer proposals", err);
//       });
//   }, []);

//   return (
//     <div className="page-wrapper">
//       <h2 className="page-title">My Proposals</h2>

//       {proposals.length === 0 && <p>No proposals found</p>}

//       {proposals.map((p) => (
//         <div key={p.id} className="proposal-card">
//           <p className="proposal-row">
//             <span className="label">Project:</span> {p.project_title}
//           </p>

//           <p className="proposal-row">
//             <span className="label">Bid:</span> ₹{p.bid_amount}
//           </p>

//           <p className="proposal-row">
//             <span className="label">Status:</span>{" "}
//             <span className={`status ${p.status}`}>
//               {p.status}
//             </span>
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default FreelancerProposals;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyProposals } from "../services/proposalService";
import "./FreelancerProposals.css";

function FreelancerProposals() {
  const [proposals, setProposals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMyProposals()
      .then((res) => setProposals(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="my-proposals-page">
      {/* Header */}
      <div className="my-proposals-header">
        <button className="btn back-btn" onClick={() => navigate("/projects")}>
          ← Back to Projects
        </button>

        <h2>My Proposals</h2>

        <button className="btn logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Proposal Cards */}
      {proposals.map((proposal) => (
        <div key={proposal.id} className="my-proposal-card">
          {/* Project column */}
          <div className="proposal-col project-col">
            <span>Project:</span> {proposal.project_title}
          </div>

          {/* Bid column */}
          <div className="proposal-col bid-col">
            <span>Bid:</span> ₹{proposal.bid_amount}
          </div>

          {/* Status column */}
          <div className={`proposal-col status ${proposal.status}`}>
            {proposal.status}
          </div>
        </div>
      ))}
    </div>
  );
}

export default FreelancerProposals;
