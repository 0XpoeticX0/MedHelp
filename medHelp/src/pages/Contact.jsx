import { useForm } from "react-hook-form";
import { Loader2, Send } from "lucide-react";
import axiosClient from "../api/axiosClient";
import Swal from "sweetalert2";
import { useState } from "react";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      // console.log("Form Data:", data);
      setLoading(true);
      await axiosClient.post("/auth/send-email", data);

      // ✅ Success Alert
      Swal.fire({
        icon: "success",
        title: "Message Sent",
        text: "Your message has been successfully sent!",
        timer: 3000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Email send error:", error);
      Swal.fire({
        icon: "error",
        title: "Sending Failed",
        text:
          error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 flex flex-col md:flex-row items-center justify-center gap-10">
      {/* Image Section */}
      <div className="w-full md:w-1/2">
        <img
          src="/Contact-us.png"
          alt="Contact Us"
          className="w-full max-w-md mx-auto"
        />
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 max-w-md">
        <h2 className="text-3xl font-bold text-purple-600 mb-6 text-center">
          Contact Us
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: "Name is required" })}
              className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium mb-1">Subject</label>
            <input
              type="text"
              placeholder="Enter subject"
              {...register("subject", { required: "Subject is required" })}
              className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.subject && (
              <p className="text-red-500 text-xs mt-1">
                {errors.subject.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              rows={4}
              placeholder="Type your message"
              {...register("message", { required: "Message is required" })}
              className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            disabled={loading}
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-purple-700 transition"
          >
            {loading ? (
              <>
                <Loader2 />
                Sending Message...
              </>
            ) : (
              <>
                <Send size={16} />
                Send Message
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
