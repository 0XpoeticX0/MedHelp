import { useEffect, useState } from "react";
import { Card, List, Typography, Spin, message, Tag, Button } from "antd";
import axiosClient from "../../api/axiosClient";
import {
  BookOpen,
  CalendarDays,
  Clock4,
  Download,
  UserRound,
} from "lucide-react";
import generateCertificate from "../../utils/generateCertificate";

const { Title, Text } = Typography;

const Certificate = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEnrolledCourses = async () => {
    try {
      const response = await axiosClient.get(
        "/courses/volunteer/getCirtifiedCourse"
      );
      setCourses(response.data);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      message.error("Failed to fetch enrolled courses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  // console.log("Enrolled Courses:", courses);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="text-blue-600 w-6 h-6" />
        <Title level={2} className="!text-blue-600 !mb-0">
          Available Cirtificates
        </Title>
      </div>

      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <Spin size="large" />
        </div>
      ) : courses.length === 0 ? (
        <Text type="secondary">You have not enrolled in any courses yet.</Text>
      ) : (
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={courses}
          renderItem={(course) => (
            <List.Item>
              <Card
                title={
                  <div className="flex items-center gap-2 text-cyan-700 font-semibold text-lg">
                    <BookOpen className="w-5 h-5" /> {course.courseName}
                  </div>
                }
                className="border border-blue-100 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <p className="flex items-center gap-2">
                  <UserRound className="text-purple-600 w-4 h-4" />
                  <Text strong>Trainer:</Text>
                  <Tag color="purple">{course.trainerName}</Tag>
                </p>
                <p className="flex items-center gap-2">
                  <CalendarDays className="text-green-600 w-4 h-4" />
                  <Text strong>
                    Start Date{" "}
                    <span className="text-gray-400 text-sm font-[300]">
                      (mm/dd/yy)
                    </span>
                    :
                  </Text>
                  <Tag color="green">
                    {new Date(course.startDate).toLocaleDateString()}
                  </Tag>
                </p>
                <p className="flex items-center gap-2">
                  <Clock4 className="text-blue-600 w-4 h-4" />
                  <Text strong>Duration:</Text>
                  <Tag color="blue">{course.duration} months</Tag>
                </p>
                <Button
                  icon={<Download />}
                  variant="outlined"
                  type="primary"
                  onClick={() => generateCertificate(course)}
                >
                  Download Certificate
                </Button>
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default Certificate;
