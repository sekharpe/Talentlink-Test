// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import "./Dashboard.css";

// function StatCard({ title, value }) {
//   return (
//     <div className="stat-card">
//       <h4>{title}</h4>
//       <p>{value}</p>
//     </div>
//   );
// }

// function Dashboard() {
//   const role = localStorage.getItem("role");
//   const userId = localStorage.getItem("user_id");

//   const [name, setName] = useState("");
//   const [stats, setStats] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await api.get("/users/profile/");
//         setName(
//           res.data.name ||
//           res.data.username ||
//           res.data.email ||
//           "User"
//         );
//       } catch (error) {
//         console.error("Profile fetch failed");
//         setName("User");
//       }
//     };

//     const fetchDashboardData = async () => {
//       try {
//         if (role === "client") {
//           const projectsRes = await api.get("/projects/");
//           const contractsRes = await api.get("/contracts/my/");

//           const projectsRaw =
//             projectsRes.data?.results ||
//             projectsRes.data?.data ||
//             projectsRes.data ||
//             [];

//           const myProjects = projectsRaw.filter(
//             p =>
//               String(p.client) === String(userId) ||
//               String(p.user) === String(userId) ||
//               String(p.owner) === String(userId)
//           );

//           const contracts =
//             contractsRes.data?.results ||
//             contractsRes.data?.data ||
//             contractsRes.data ||
//             [];

//           setStats({
//             totalProjects: myProjects.length,
//             activeContracts: contracts.filter(
//               c =>
//                 c.status === "active" ||
//                 c.status === "ongoing" ||
//                 c.status === "in_progress"
//             ).length,
//             completedProjects: contracts.filter(
//               c => c.status === "completed"
//             ).length,
//           });
//         }

//         if (role === "freelancer") {
//           const proposalsRes = await api.get("/proposals/my-proposals");
//           const contractsRes = await api.get("/contracts/freelancer");

//           const proposals =
//             proposalsRes.data?.results ||
//             proposalsRes.data?.data ||
//             proposalsRes.data ||
//             [];

//           const contracts =
//             contractsRes.data?.results ||
//             contractsRes.data?.data ||
//             contractsRes.data ||
//             [];

//           setStats({
//             proposalsSent: proposals.length,
//             activeContracts: contracts.filter(
//               c =>
//                 c.status === "active" ||
//                 c.status === "ongoing" ||
//                 c.status === "in_progress"
//             ).length,
//             completedProjects: contracts.filter(
//               c => c.status === "completed"
//             ).length,
//           });
//         }
//       } catch (error) {
//         console.error(
//           "Dashboard fetch error:",
//           error.response?.data || error.message
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//     fetchDashboardData();
//   }, [role, userId]);

//   if (loading) return <p>Loading dashboard...</p>;

//   return (
//     <div className="dashboard-container">
//       <h2>Dashboard</h2>

//       {/* USER INFO */}
//       <div className="user-info">
//         <p className="user-name">👤 {name}</p>
//         <p className="user-role">🎭 Role: {role}</p>
//       </div>

//       {/* CLIENT DASHBOARD */}
//       {role === "client" && (
//         <>
//           <h3>Client Dashboard</h3>
//           <div className="stats-grid">
//             <StatCard
//               title="Total Projects Posted"
//               value={stats.totalProjects || 0}
//             />
//             <StatCard
//               title="Active Contracts"
//               value={stats.activeContracts || 0}
//             />
//             <StatCard
//               title="Completed Projects"
//               value={stats.completedProjects || 0}
//             />
//           </div>
//         </>
//       )}

//       {/* FREELANCER DASHBOARD */}
//       {role === "freelancer" && (
//         <>
//           <h3>Freelancer Dashboard</h3>
//           <div className="stats-grid">
//             <StatCard
//               title="Proposals Sent"
//               value={stats.proposalsSent || 0}
//             />
//             <StatCard
//               title="Active Contracts"
//               value={stats.activeContracts || 0}
//             />
//             <StatCard
//               title="Completed Projects"
//               value={stats.completedProjects || 0}
//             />
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Dashboard;

import { useEffect, useState } from "react";
import api from "../api/axios";
import "./Dashboard.css";

function StatCard({ title, value }) {
  return (
    <div className="stat-card">
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  );
}

function Dashboard() {
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("user_id");

  const [name, setName] = useState("");
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/users/profile/");
        setName(
          res.data.name ||
          res.data.username ||
          res.data.email ||
          "User"
        );
      } catch {
        setName("User");
      }
    };

    const fetchDashboardData = async () => {
      try {
        if (role === "client") {
          const projectsRes = await api.get("/projects/my/");
          const contractsRes = await api.get("/contracts/my/");

          const projects =
            projectsRes.data?.results || projectsRes.data || [];
          const contracts =
            contractsRes.data?.results || contractsRes.data || [];

          setStats({
            totalProjects: projects.length,
            activeContracts: contracts.filter(
              c =>
                c.status === "active" ||
                c.status === "ongoing" ||
                c.status === "in_progress"
            ).length,
            completedProjects: contracts.filter(
              c => c.status === "completed"
            ).length,
          });
        }

        if (role === "freelancer") {
          const proposalsRes = await api.get("/proposals/my/");
          const contractsRes = await api.get("/contracts/my/");

          const proposals =
            proposalsRes.data?.results || proposalsRes.data || [];
          const contracts =
            contractsRes.data?.results || contractsRes.data || [];

          setStats({
            proposalsSent: proposals.length,
            activeContracts: contracts.filter(
              c =>
                c.status === "active" ||
                c.status === "ongoing" ||
                c.status === "in_progress"
            ).length,
            completedProjects: contracts.filter(
              c => c.status === "completed"
            ).length,
          });
        }
      } catch (error) {
        console.error("Dashboard fetch error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    fetchDashboardData();
  }, [role, userId]);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="dashboard-container">
      {/* ================= WELCOME BANNER ================= */}
      <div className="welcome-banner">
        <h1>
          Welcome back, <span>{name}</span>!
        </h1>
        <p>
          {role === "freelancer"
            ? "Apply to projects, build your reputation, and grow your career."
            : "Post projects, manage freelancers, and track progress easily."}
        </p>
        <span className={`welcome-role ${role}`}>
          {role?.toUpperCase()}
        </span>
      </div>

      
      {/* ================= DASHBOARD STATS ================= */}
      {role === "client" && (
        <>
          <h3>Client Dashboard</h3>
          <div className="stats-grid">
            <StatCard
              title="Total Projects Posted"
              value={stats.totalProjects || 0}
            />
            <StatCard
              title="Active Contracts"
              value={stats.activeContracts || 0}
            />
            <StatCard
              title="Completed Projects"
              value={stats.completedProjects || 0}
            />
          </div>
        </>
      )}

      {role === "freelancer" && (
        <>
          <h3>Freelancer Dashboard</h3>
          <div className="stats-grid">
            <StatCard
              title="Proposals Sent"
              value={stats.proposalsSent || 0}
            />
            <StatCard
              title="Active Contracts"
              value={stats.activeContracts || 0}
            />
            <StatCard
              title="Completed Projects"
              value={stats.completedProjects || 0}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;

