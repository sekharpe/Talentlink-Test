// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";

// function ProjectFeed() {
//   const [projects, setProjects] = useState([]);
//   const navigate = useNavigate();

//   // ✅ GET ROLE
//   const role = localStorage.getItem("role");

//   useEffect(() => {
//     api
//       .get("projects/")
//       .then((res) => {
//         console.log(res.data);
//         setProjects(res.data);
//       })
//       .catch((err) => {
//         console.error("Error loading projects", err);
//       });
//   }, []);

//   return (
//     <div className="page-container">
//       <div className="card">
//         <h2>Available Projects</h2>

//         {/* ✅ CLIENT ONLY: CREATE PROJECT BUTTON */}
//         {role === "client" && (
//           <button
//             style={{ marginBottom: "20px" }}
//             onClick={() => navigate("/client/projects/create")}
//           >
//             Create Project
//           </button>
//         )}

//         {projects.length === 0 ? (
//           <p>No projects found</p>
//         ) : (
//           projects.map((project) => (
//             <div key={project.id} style={{ marginBottom: "20px" }}>
//               <h3>{project.title}</h3>
//               <p>{project.description}</p>
//               <p>
//                 <strong>Budget:</strong> ₹{project.budget}
//               </p>

//               {/* ✅ FREELANCER VIEW */}
//               {role === "freelancer" && (
//                 <button
//                   onClick={() => navigate(`/projects/${project.id}`)}
//                 >
//                   View Project
//                 </button>
//               )}

//               {/* ✅ CLIENT VIEW */}
//               {role === "client" && (
//                 <button
//                   onClick={() =>
//                     navigate(`/client/projects/${project.id}/proposals`)
//                   }
//                 >
//                   View Proposals
//                 </button>
//               )}

//               <hr />
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default ProjectFeed;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function ProjectFeed() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  // ✅ GET ROLE
  const role = localStorage.getItem("role");

  useEffect(() => {
    const endpoint =
      role === "client" ? "projects/my/" : "projects/";

    api
      .get(endpoint)
      .then((res) => {
        console.log(res.data);
        setProjects(res.data);
      })
      .catch((err) => {
        console.error("Error loading projects", err);
      });
  }, [role]);

  return (
    <div className="page-container">
      <div className="card">
        <h2>Available Projects</h2>

        {/* ✅ CLIENT ONLY: CREATE PROJECT BUTTON */}
        {role === "client" && (
          <button
            style={{ marginBottom: "20px" }}
            onClick={() => navigate("/client/projects/create")}
          >
            Create Project
          </button>
        )}

        {/* ✅ FREELANCER ONLY: MY PROPOSALS BUTTON */}
        {role === "freelancer" && (
          <button
            style={{ marginBottom: "20px" }}
            onClick={() => navigate("/freelancer/proposals")}
          >
            My Proposals
          </button>
        )}

        {projects.length === 0 ? (
          <p>No projects found</p>
        ) : (
          projects.map((project) => (
            <div key={project.id} style={{ marginBottom: "20px" }}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p>
                <strong>Budget:</strong> ₹{project.budget}
              </p>

              {/* ✅ FREELANCER VIEW */}
              {role === "freelancer" && (
                <button
                  onClick={() => navigate(`/projects/${project.id}`)}
                >
                  View Project
                </button>
              )}

              {/* ✅ CLIENT VIEW */}
              {role === "client" && (
                <button
                  onClick={() =>
                    navigate(`/client/projects/${project.id}/proposals`)
                  }
                >
                  View Proposals
                </button>
              )}

              <hr />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProjectFeed;
