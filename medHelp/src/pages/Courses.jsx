import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { Button, Card } from "antd";
import { Clock } from "lucide-react";
import { getUserFromToken } from "../utils/auth";
import Swal from "sweetalert2";

const Courses = () => {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get("/courses");
      // console.log(data);

      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <p className="text-center text-3xl font-semibold">Loading courses...</p>
    );
  }

  const user = getUserFromToken();

  // console.log(user);

  const onEnroll = async (course) => {
    if (user.role === "volunteer") {
      const data = {
        courseId: course.courseId,
        voluteerId: user.id,
      };
      await axiosClient.post("/courses/enrollment", data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Course enroll successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        title: "You have to be a volunteer.",
        icon: "warning",
        text: "Contact Us to register as volunteer.",
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="flex justify-center p-8 lg:p-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* <img src="/Under construction-pana.png" /> */}
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
            <h1 className="text-3xl font-semibold">{course.courseName}</h1>
            <div className="border-y-2 my-8">
              <h1 className="text-md font-semibold">Trainer Info:</h1>
              <ul></ul>
              <p>
                <span className="font-semibold">Name:</span>{" "}
                {course.trainerName}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {course.trainerEmail}
              </p>
            </div>
            <div className="">
              <p className="flex justify-start items-center gap-2 font-bold text-lg">
                <Clock />
                Duration: {course.duration} months
              </p>
            </div>
            <div className="mt-4 flex justify-center">
              <Button type="primary" onClick={() => onEnroll(course)}>
                Enroll Me
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Courses;
