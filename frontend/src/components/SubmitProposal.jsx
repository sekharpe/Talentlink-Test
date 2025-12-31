// import { useState } from "react";
// import api from "../api/axios";

// function SubmitProposal({ projectId }) {
//   const [coverLetter, setCoverLetter] = useState("");
//   const [bidAmount, setBidAmount] = useState("");
//   const [estimatedDays, setEstimatedDays] = useState("");

//   const handleSubmit = () => {
//     api
//       .post("proposals/create/", {
//         project: projectId,
//         cover_letter: coverLetter,
//         bid_amount: bidAmount,
//         estimated_days: estimatedDays,
//       })
//       .then(() => {
//         alert("Proposal submitted successfully");
//         setCoverLetter("");
//         setBidAmount("");
//         setEstimatedDays("");
//       })
//       .catch((err) => {
//         console.error("Proposal error", err);
//         alert("Error submitting proposal");
//       });
//   };

//   return (
//     <div style={{ marginTop: "30px" }}>
//       <h3>Submit Proposal</h3>

//       <textarea
//         placeholder="Cover Letter"
//         value={coverLetter}
//         onChange={(e) => setCoverLetter(e.target.value)}
//       />

//       <br />

//       <input
//         type="number"
//         placeholder="Bid Amount"
//         value={bidAmount}
//         onChange={(e) => setBidAmount(e.target.value)}
//       />

//       <br />

//       <input
//         type="number"
//         placeholder="Estimated Days"
//         value={estimatedDays}
//         onChange={(e) => setEstimatedDays(e.target.value)}
//       />

//       <br />

//       <button onClick={handleSubmit}>Submit Proposal</button>
//     </div>
//   );
// }

// export default SubmitProposal;
import { useState } from "react";
import api from "../api/axios";

function SubmitProposal({ projectId }) {
  const [coverLetter, setCoverLetter] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [estimatedDays, setEstimatedDays] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // ⬅️ required for form, no logic change

    api
      .post("proposals/create/", {
        project: projectId,
        cover_letter: coverLetter,
        bid_amount: bidAmount,
        estimated_days: estimatedDays,
      })
      .then(() => {
        alert("Proposal submitted successfully");
        setCoverLetter("");
        setBidAmount("");
        setEstimatedDays("");
      })
      .catch((err) => {
        console.error("Proposal error", err);
        alert("Error submitting proposal");
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "30px" }}>
      <h3>Submit Proposal</h3>

      <textarea
        placeholder="Cover Letter"
        value={coverLetter}
        onChange={(e) => setCoverLetter(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Bid Amount"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Estimated Days"
        value={estimatedDays}
        onChange={(e) => setEstimatedDays(e.target.value)}
        required
      />

      <button type="submit">Submit Proposal</button>
    </form>
  );
}

export default SubmitProposal;

