import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ApplyJob from "./pages/ApplyJob";
import Applications from "./pages/Applications";
import RecruterLogin from "./components/RecruterLogin";
import { AppContext } from "./context/AppContext";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import ManageJobs from "./pages/ManageJobs";
import ViewApplications from "./pages/ViewApplications";
import "quill/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";
import Unauthorized from "./components/Unauthorized";
const App = () => {
  const { showRecruterLogin, companyToken } = useContext(AppContext);

  return (
    <div>
      {showRecruterLogin && <RecruterLogin />}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        <Route path="/applications" element={<Applications />} />

        <Route path="/dashboard" element={<Dashboard />}>
          <Route
            path="add-job"
            element={companyToken ? <AddJob /> : <Unauthorized />}
          />
          <Route
            path="manage-jobs"
            element={companyToken ? <ManageJobs /> : <Unauthorized />}
          />
          <Route
            path="View-applications"
            element={companyToken ? <ViewApplications /> : <Unauthorized />}
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
