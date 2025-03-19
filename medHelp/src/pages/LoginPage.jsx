import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router";
import axiosClient from "../api/axiosClient";
import Swal from "sweetalert2";
import { Hospital } from "lucide-react";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await axiosClient.post("/auth/login", values);

      // console.log(response.data.success);

      if (response?.data.data.success) {
        const { accessToken } = response.data.data;

        // ✅ Store token in local storage
        localStorage.setItem("accessToken", accessToken);

        // ✅ Show success message
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login successful",
          showConfirmButton: false,
          timer: 1500,
        });

        // ✅ Redirect to home page
        navigate("/");
      } else {
        message.error(response.data.message || "Login failed");
        Swal.fire({
          position: "center",
          icon: "error",
          title: response.data.data.message || "Login failed",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      message.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex items-center w-full max-w-5xl shadow-lg rounded-lg overflow-hidden">
        {/* Left Section - Login Form */}
        <div className="w-full md:w-1/2 bg-gray-100 p-8">
          <div className="flex text-blue-600 justify-center items-center my-8 gap-3">
            <Hospital />
            <h2 className="text-3xl font-semibold text-center">
              Med Help Login
            </h2>
          </div>

          <Form layout="vertical" onFinish={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Email is required" },
                {
                  type: "email",
                  message: "Invalid email format",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Email"
                size="large"
              />
            </Form.Item>

            {/* Password Input */}
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Password is required" },
                {
                  min: 6,
                  message: "Password must be at least 6 characters",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                size="large"
              />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={loading}
              >
                Log In
              </Button>
            </Form.Item>

            <div className="text-center mt-4">
              <span className="text-gray-600">
                Don&apos;t have an account?{" "}
              </span>
              <Link
                to="/register"
                className="text-blue-600 hover:underline font-medium"
              >
                Create account
              </Link>
            </div>
          </Form>
        </div>

        {/* Right Section - Illustration */}
        <div className="hidden md:block w-1/2 bg-blue-50">
          <img
            src="/Computer login-bro.png"
            alt="medHelp Login Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
