import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { User, Lock, Phone, MapPin, EyeOff, Eye, Hospital } from "lucide-react";
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
    role: "patient",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(formData);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "User registered successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/login");
    } catch (err) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: err.message || "User registration failed",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="h-[calc(100vh-7px)] flex items-center justify-center bg-gray-100">
      <div className="flex max-w-7xl shadow-2xl overflow-hidden gap-5">
        {/* Left Section - Form */}
        <div className="hidden md:block w-1/2">
          <img
            src="/Sign up-amico.png"
            alt="Registration Illustration"
            className="h-full"
          />
        </div>

        {/* Right Section - Image */}
        <div className="w-full md:w-1/2 bg-white p-8">
          <div className="flex text-blue-600 justify-center items-center my-8 gap-3">
            <Hospital />
            <h2 className="text-3xl font-semibold text-center">
              Med Help Registration
            </h2>
          </div>

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
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
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
