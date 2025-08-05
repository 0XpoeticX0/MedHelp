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
import Certificate from "./pages/volunteer/Certificate.jsx";
import History from "./pages/patient/History.jsx";
import HomePage from "./pages/HomePage.jsx";
import Services from "./pages/Services.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import NavigationPage from "./pages/volunteer/NavigationPage.jsx";
import RunningServices from "./pages/volunteer/RunningServices.jsx";
import ServiceHistory from "./pages/volunteer/ServiceHistory.jsx";
import WaitingRoom from "./pages/patient/WaitingRoom.jsx";
import AddVolunteer from "./pages/admin/AddVolunteer.jsx";
import Courses from "./pages/volunteer/Courses.jsx";
import MyCourses from "./pages/volunteer/MyCourses.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="services" element={<Services />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="waiting-room" element={<WaitingRoom />} />
      </Route>
      <Route element={<ProtectedRoute role="admin" />}>
        <Route path="/dashboard/admin" element={<Dashboard />}>
          <Route path="profile" element={<AdminProfile />} />
          <Route path="add-trainer" element={<AddTrainers />} />
          <Route path="all-trainers" element={<ManageTrainer />} />
          <Route path="add-volunteer" element={<AddVolunteer />} />
          <Route path="manage-volunteers" element={<ManageVolunteer />} />
          <Route path="manage-patients" element={<ManagePatient />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="all-courses" element={<ManageCourse />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoute role="volunteer" />}>
        <Route path="/dashboard/volunteer" element={<Dashboard />}>
          <Route path="profile" element={<VolunteerProfile />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="all-courses" element={<Courses />} />
          <Route path="running-services" element={<RunningServices />} />
          <Route path="service-history" element={<ServiceHistory />} />
          <Route path="navigation-page/:helpId" element={<NavigationPage />} />
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
