import { useEffect, useState } from "react";
import { Form, Input, Select, DatePicker, InputNumber, Button } from "antd";
import { Loader2, CheckCircle } from "lucide-react";
import Swal from "sweetalert2";
import axiosClient from "../../api/axiosClient";

const { Option } = Select;

const CourseForm = () => {
  const [form] = Form.useForm();
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Trainers
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const { data } = await axiosClient.get("/trainers");
        setTrainers(data);
      } catch (error) {
        console.error("Error fetching trainers:", error);
      }
    };
    fetchTrainers();
  }, []);

  // Handle Form Submission
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await axiosClient.post("/courses", {
        courseName: values.courseName,
        courseImg: values.courseImg,
        trainer: values.trainer,
        startDate: values.startDate.format("YYYY-MM-DD"),
        duration: values.duration,
      });

      Swal.fire({
        icon: "success",
        title: "Course Created!",
        text: "The course has been successfully added.",
        timer: 2000,
        showConfirmButton: false,
      });

      form.resetFields();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to create course.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 lg:max-h-screen lg:max-w-7xl lg:mt-16 mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <CheckCircle className="text-green-600" />
        Add Course
      </h2>

      <div className="md:flex items-center h-[25rem]">
        <div className="md:w-1/2">
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              name="courseName"
              label="Course Name"
              rules={[{ required: true, message: "Please enter course name" }]}
            >
              <Input placeholder="Enter course name" />
            </Form.Item>

            <Form.Item
              name="courseImg"
              label="Course Image Url"
              rules={[
                { required: true, message: "Please enter course image url" },
              ]}
            >
              <Input placeholder="Enter url" />
            </Form.Item>

            <Form.Item
              name="trainer"
              label="Trainer"
              rules={[{ required: true, message: "Please select a trainer" }]}
            >
              <Select placeholder="Select trainer">
                {trainers.map((trainer) => (
                  <Option key={trainer.id} value={trainer.id}>
                    {trainer.fullname}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <div className="flex gap-5 justify-between">
              <Form.Item
                name="startDate"
                label="Start Date"
                className="w-full"
                rules={[
                  { required: true, message: "Please select a start date" },
                ]}
              >
                <DatePicker className="w-full" />
              </Form.Item>

              <Form.Item
                name="duration"
                label="Duration (months)"
                className="w-full"
                rules={[
                  { required: true, message: "Enter duration in months" },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  min={1}
                  placeholder="Enter duration"
                />
              </Form.Item>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                icon={
                  loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <CheckCircle />
                  )
                }
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Course"}
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="md:w-1/2">
          <img src="/Add files-pana.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default CourseForm;
