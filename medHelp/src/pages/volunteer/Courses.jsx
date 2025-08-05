import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { BookOpen, Calendar1, Clock, User } from "lucide-react";
import { getUserFromToken } from "../../utils/auth";
import Swal from "sweetalert2";
import { Card } from "antd";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = getUserFromToken();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosClient.get("/courses");
        setCourses(response.data); // Assuming the response is an array of courses
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  //console.log("Courses:", courses);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading courses...</p>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <img src="/Under construction-pana.png" className="w-80 mx-auto" />
          <p className="mt-4 text-lg">No courses available yet.</p>
        </div>
      </div>
    );
  }

  const handleEnroll = async (courseId) => {
    if (!user) {
      return Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "You must be logged in to enroll in courses.",
      });
    }

    if (user.role !== "volunteer") {
      return Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "Only volunteers can enroll in courses.",
      });
    }

    try {
      await axiosClient.post("/courses/enrollments", {
        courseId,
      });

      Swal.fire({
        icon: "success",
        title: "Enrolled Successfully",
        text: "You have been successfully enrolled in the course.",
      });

      //console.log("Enrollment data:", data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Enrollment Failed",
        text: "Something went wrong! or you are already enrolled in this course.",
      });
      console.error("❌ Enrollment error:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 flex items-center justify-center gap-2">
          <BookOpen className="w-8 h-8 text-blue-600" />
          Available Courses
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card
              key={course.courseId}
              hoverable
              style={{ width: 300, border: "1px solid" }}
              cover={
                <img
                  alt={course.courseName}
                  src={course.courseImg || "/fallback.jpg"}
                  onError={(e) => (e.target.src = "/fallback.jpg")}
                  style={{ height: 160, objectFit: "cover" }}
                />
              }
            >
              <div
                key={course.courseId}
                className="transition-all duration-300 hover:-translate-y-1"
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  {course.courseName}
                </h3>

                <div className="space-y-3">
                  <p className="flex items-center gap-2 text-gray-600">
                    <User className="w-5 h-5 text-gray-500" />
                    <span>
                      <strong className="text-gray-700">Trainer:</strong>{" "}
                      {course.trainerName}
                    </span>
                  </p>

                  <p className="flex items-center gap-2 text-gray-600">
                    <Calendar1 className="w-5 h-5 text-gray-500" />
                    <span>
                      <strong className="text-gray-700">
                        Start{" "}
                        <span className="text-gray-400 text-sm font-[300]">
                          (mm/dd/yy)
                        </span>
                        :
                      </strong>{" "}
                      {new Date(course.startDate).toLocaleDateString()}
                    </span>
                  </p>

                  <p className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <span>
                      <strong className="text-gray-700">Duration:</strong>{" "}
                      {course.duration} months
                    </span>
                  </p>
                </div>

                <button
                  onClick={() => handleEnroll(course.courseId)}
                  className="mt-4 w-full bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                >
                  Enroll Now
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
