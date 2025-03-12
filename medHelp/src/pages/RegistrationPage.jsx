import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  User,
  Lock,
  Phone,
  MapPin,
  Heart,
  Users,
  EyeOff,
  Eye,
} from "lucide-react";
import { useUserStore } from "../stores/userStore";
import Swal from "sweetalert2";

const RegistrationPage = () => {
  const { createUser, loading } = useUserStore();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser(formData);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "User registered successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-7xl shadow-lg rounded-lg overflow-hidden">
        {/* Left Section - Form */}
        <div className="hidden md:block w-1/2 relative bg-gradient-to-r from-blue-50 to-blue-100">
          <img
            src="https://i.ibb.co.com/ZRDmrbwh/medhelp.jpg"
            alt="Registration Illustration"
            className="h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-50 via-transparent to-blue-100 opacity-60" />
        </div>

        {/* Right Section - Image */}
        <div className="w-full md:w-1/2 bg-white p-8">
          <h2 className="text-3xl font-semibold text-center mb-6">
            medHelp Registration
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block mb-2">First Name</label>
                <div className="flex items-center border p-2 rounded-md">
                  <User size={20} className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="w-1/2">
                <label className="block mb-2">Last Name</label>
                <div className="flex items-center border p-2 rounded-md">
                  <User size={20} className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block mb-2">Email</label>
                <div className="flex items-center border p-2 rounded-md">
                  <User size={20} className="text-gray-400 mr-2" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="w-1/2">
                <label className="block mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-md focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-md focus:outline-none"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="w-1/2">
                <label className="block mb-2">Phone</label>
                <div className="flex items-center border p-2 rounded-md">
                  <Phone size={20} className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            <label className="block mb-2">Address</label>
            <div className="flex items-center border p-2 rounded-md">
              <MapPin size={20} className="text-gray-400 mr-2" />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full focus:outline-none"
                required
              />
            </div>

            <label className="block mb-2">Password</label>
            <div className="flex items-center border p-2 rounded-md">
              <Lock size={20} className="text-gray-400 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff size={20} className="text-gray-400" />
                ) : (
                  <Eye size={20} className="text-gray-400" />
                )}
              </button>
            </div>

            <label className="block mb-2">Register as</label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: "patient" })}
                className={`flex-1 p-4 border rounded-md flex flex-col items-center ${
                  formData.role === "patient"
                    ? "border-blue-500 bg-blue-100"
                    : ""
                }`}
              >
                <Heart size={40} /> Patient
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: "volunteer" })}
                className={`flex-1 p-4 border rounded-md flex flex-col items-center ${
                  formData.role === "volunteer"
                    ? "border-blue-500 bg-blue-100"
                    : ""
                }`}
              >
                <Users size={40} /> Volunteer
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-500"
            >
              <span>{loading ? "Register User..." : "Register"}</span>
            </button>
            <div className="text-center mt-4">
              <span className="text-gray-600">Already have an account? </span>
              <Link
                to="/login"
                className="text-blue-600 hover:underline font-medium"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
