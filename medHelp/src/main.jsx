import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegistrationPage.jsx";
import Dashboard from "./layouts/Dashboard.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import AdminProfile from "./pages/admin/AdminProfile.jsx";
import VolunteerProfile from "./pages/volunteer/VolunteerProfile.jsx";
import PatientProfile from "./pages/patient/PatientProfile.jsx";
import AddTrainers from "./pages/admin/AddTrainers.jsx";
import ManageTrainer from "./pages/admin/ManageTrainer.jsx";
import ManageVolunteer from "./pages/admin/ManageVolunteer.jsx";
import ManagePatient from "./pages/admin/ManagePatient.jsx";
import AddCourse from "./pages/admin/AddCourse.jsx";
import ManageCourse from "./pages/admin/ManageCourse.jsx";
import Course from "./pages/volunteer/Course.jsx";
import Certificate from "./pages/volunteer/Certificate.jsx";
import History from "./pages/patient/History.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
      <Route element={<ProtectedRoute role="admin" />}>
        <Route path="/dashboard/admin" element={<Dashboard />}>
          <Route path="profile" element={<AdminProfile />} />
          <Route path="add-trainer" element={<AddTrainers />} />
          <Route path="all-trainers" element={<ManageTrainer />} />
          <Route path="manage-volunteers" element={<ManageVolunteer />} />
          <Route path="manage-patients" element={<ManagePatient />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="all-course" element={<ManageCourse />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoute role="volunteer" />}>
        <Route path="/dashboard/volunteer" element={<Dashboard />}>
          <Route path="profile" element={<VolunteerProfile />} />
          <Route path="courses" element={<Course />} />
          <Route path="certification" element={<Certificate />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoute role="patient" />}>
        <Route path="/dashboard/patient" element={<Dashboard />}>
          <Route path="profile" element={<PatientProfile />} />
          <Route path="history" element={<History />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
