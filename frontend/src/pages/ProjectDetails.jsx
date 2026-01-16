// // import { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import api from "../api/axios";
// // import SubmitProposal from "../components/SubmitProposal";

// // function ProjectDetails() {
// //   const { id } = useParams();
// //   const [project, setProject] = useState(null);

// //   useEffect(() => {
// //     api
// //       .get(`projects/${id}/`)
// //       .then((res) => setProject(res.data))
// //       .catch((err) => console.error("Error loading project", err));
// //   }, [id]);

// //   if (!project) return <p>Loading project...</p>;

// //   return (
// //     <div style={{ padding: "20px" }}>
// //       <h2>{project.title}</h2>
// //       <p>{project.description}</p>
// //       <p>
// //         <strong>Budget:</strong> ₹{project.budget}
// //       </p>

// //       <SubmitProposal projectId={project.id} />
// //     </div>
// //   );
// // }

// // export default ProjectDetails;



// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../api/axios";
// import SubmitProposal from "../components/SubmitProposal";

// function ProjectDetails() {
//   const { id } = useParams();
//   const [project, setProject] = useState(null);

//   useEffect(() => {
//     api
//       .get(`projects/${id}/`)
//       .then((res) => setProject(res.data))
//       .catch((err) => console.error("Error loading project", err));
//   }, [id]);

//   if (!project) return <p>Loading project...</p>;

//   return (
//     <div className="page-container">
//       <div className="card">
//         <h2>{project.title}</h2>

//         <p>{project.description}</p>
//         <p>
//           <strong>Budget:</strong> ₹{project.budget}
//         </p>

//         <SubmitProposal projectId={project.id} />
//       </div>
//     </div>
//   );
// }

// export default ProjectDetails;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

function ProjectDetails() {
  const { id } = useParams(); // project id
  const role = localStorage.getItem("role");

  const [project, setProject] = useState(null);

  // Proposal form state
  const [coverLetter, setCoverLetter] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [estimatedDays, setEstimatedDays] = useState("");
  const [message, setMessage] = useState("");

  // Fetch project details
  useEffect(() => {
    api.get(`projects/${id}/`)
      .then((res) => {
        setProject(res.data);
      })
      .catch((err) => {
        console.error("Error loading project", err);
      });
  }, [id]);

  // Submit proposal (FREELANCER ONLY)
  const handleSubmitProposal = async (e) => {
    e.preventDefault();

    try {
      await api.post("proposals/create/", {
        project: id,
        cover_letter: coverLetter,
        bid_amount: bidAmount,
        estimated_days: estimatedDays,
      });

      setMessage("✅ Proposal submitted successfully");
      setCoverLetter("");
      setBidAmount("");
      setEstimatedDays("");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to submit proposal");
    }
  };

  if (!project) return <p>Loading...</p>;

  return (
    <div className="page-container">
      <div className="card">
        {/* PROJECT DETAILS */}
        <h2>{project.title}</h2>
        <p>{project.description}</p>
        <p><strong>Budget:</strong> ₹{project.budget}</p>

        <hr />

        {/* FREELANCER PROPOSAL FORM */}
        {role === "freelancer" && (
          <>
            <h3>Submit Your Proposal</h3>

            {message && <p>{message}</p>}

            <form onSubmit={handleSubmitProposal}>
              <textarea
                placeholder="Cover Letter"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                required
                style={{ width: "100%", height: "100px", marginBottom: "10px" }}
              />

              <input
                type="number"
                placeholder="Bid Amount (₹)"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                required
                style={{ width: "100%", marginBottom: "10px" }}
              />

              <input
                type="number"
                placeholder="Estimated Days"
                value={estimatedDays}
                onChange={(e) => setEstimatedDays(e.target.value)}
                required
                style={{ width: "100%", marginBottom: "10px" }}
              />

              <button type="submit">Submit Proposal</button>
            </form>
          </>
        )}

        {/* CLIENT MESSAGE */}
        {role === "client" && (
          <p style={{ marginTop: "20px", color: "gray" }}>
            Freelancers can submit proposals for this project.
          </p>
        )}
      </div>
    </div>
  );
}

export default ProjectDetails;
