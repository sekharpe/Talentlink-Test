// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";

// function CreateProject() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [budget, setBudget] = useState("");
//   const [message, setMessage] = useState("");

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await api.post("projects/", {
//         title,
//         description,
//         budget,
//       });

//       setMessage("Project created successfully");
//       navigate("/projects");
//     } catch (err) {
//       setMessage("Error creating project");
//     }
//   };

//   return (
//     <div className="page-container">
//       <div className="card">
//         <h2>Create Project</h2>

//         {message && <p>{message}</p>}

//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Project Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />

//           <textarea
//             placeholder="Project Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />

//           <input
//             type="number"
//             placeholder="Budget"
//             value={budget}
//             onChange={(e) => setBudget(e.target.value)}
//             required
//           />

//           <button type="submit">Post Project</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default CreateProject;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function CreateProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [skillsList, setSkillsList] = useState([]);          // all skills from backend
  const [selectedSkills, setSelectedSkills] = useState([]); // selected skill IDs
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // ✅ FETCH SKILLS
  useEffect(() => {
    api.get("skills/")
      .then((res) => {
        setSkillsList(res.data);
      })
      .catch((err) => {
        console.error("Error loading skills", err);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("projects/", {
        title,
        description,
        budget,
        skills_required_ids: selectedSkills, // ✅ SEND IDS
      });

      setMessage("Project created successfully");
      navigate("/projects");
    } catch (err) {
      console.log("DJANGO ERROR 👉", err.response?.data);
      setMessage("Error creating project");
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h2>Create Project</h2>

        {message && <p>{message}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
          />

          {/* ✅ SKILLS CHECKBOXES */}
          <h4>Required Skills</h4>

          {skillsList.map((skill) => (
            <label key={skill.id} style={{ display: "block" }}>
              <input
                type="checkbox"
                value={skill.id}
                onChange={(e) => {
                  const id = Number(e.target.value);
                  setSelectedSkills((prev) =>
                    prev.includes(id)
                      ? prev.filter((s) => s !== id)
                      : [...prev, id]
                  );
                }}
              />
              {skill.name}
            </label>
          ))}

          <button type="submit" style={{ marginTop: "15px" }}>
            Post Project
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProject;


