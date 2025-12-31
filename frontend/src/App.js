// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import AuthPage from "./pages/AuthPage";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import ProjectFeed from "./pages/ProjectFeed";
// import ProjectDetails from "./pages/ProjectDetails";


// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Auth pages */}
//         <Route path="/" element={<AuthPage />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* Main app */}
//         <Route path="/projects" element={<ProjectFeed />} />
//         <Route path="/projects/:id" element={<ProjectDetails />} />

//       </Routes>
//     </Router>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AuthPage from "./pages/AuthPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProjectFeed from "./pages/ProjectFeed";
import ProjectDetails from "./pages/ProjectDetails";

import ClientProjectProposals from "./pages/ClientProjectProposals";
import FreelancerProposals from "./pages/FreelancerProposals";
import CreateProject from "./pages/CreateProject";


function App() {
  return (
    <Router>
      <Routes>
        {/* Home */}
        <Route path="/" element={<AuthPage />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Projects */}
        <Route path="/projects" element={<ProjectFeed />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />

        {/* Client */}
        <Route
          path="/client/projects/:projectId/proposals"
          element={<ClientProjectProposals />}
        />

        {/* Freelancer */}
        <Route
          path="/freelancer/proposals"
          element={<FreelancerProposals />}
        />
        <Route path="/client/projects/create" element={<CreateProject />} />

      </Routes>
    </Router>
  );
}

export default App;

