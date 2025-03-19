import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  InputNumber,
  Select,
} from "antd";
import { Edit, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import axiosClient from "../../api/axiosClient";

const ManageCourse = () => {
  const [courses, setCourses] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [form] = Form.useForm();

  // Fetch Courses
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

  // Fetch Trainers
  const fetchTrainers = async () => {
    try {
      const { data } = await axiosClient.get("/trainers");
      setTrainers(data);
    } catch (error) {
      console.error("Error fetching trainers:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchTrainers();
  }, []);

  // Open Modal for Editing
  const handleEdit = (course) => {
    setEditingCourse(course);
    form.setFieldsValue({
      ...course,
      startDate: dayjs(course.startDate),
    });
    setModalVisible(true);
  };

  // Delete Course
  const handleDelete = async (courseId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosClient.delete(`/courses/${courseId}`);
          Swal.fire("Deleted!", "Course has been deleted.", "success");
          fetchCourses();
          // eslint-disable-next-line no-unused-vars
        } catch (error) {
          Swal.fire("Error!", "Failed to delete course.", "error");
        }
      }
    });
  };

  // Handle Form Submission (Update Course)
  const handleFormSubmit = async (values) => {
    try {
      await axiosClient.put(`/courses/${editingCourse.courseId}`, {
        ...values,
        startDate: values.startDate.format("YYYY-MM-DD"),
      });
      Swal.fire("Success!", "Course updated successfully.", "success");
      setModalVisible(false);
      fetchCourses();
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      Swal.fire("Error!", "Failed to update course.", "error");
    }
  };

  // Table Columns
  const columns = [
    { title: "Course Name", dataIndex: "courseName", key: "courseName" },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (date) => (date ? new Date(date).toLocaleDateString() : "N/A"), // Simplified
    },
    { title: "Duration (months)", dataIndex: "duration", key: "duration" },
    { title: "Trainer", dataIndex: "trainerName", key: "trainerName" },
    { title: "Trainer Email", dataIndex: "trainerEmail", key: "trainerEmail" },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="flex gap-2">
          <Button icon={<Edit />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            icon={<Trash2 />}
            danger
            onClick={() => handleDelete(record.courseId)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Courses Management</h2>
      <Table
        columns={columns}
        dataSource={courses}
        rowKey="courseId"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      {/* Edit Course Modal */}
      <Modal
        title="Edit Course"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            name="courseName"
            label="Course Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[{ required: true }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="duration"
            label="Duration (Days)"
            rules={[{ required: true }]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            name="trainerId"
            label="Trainer"
            rules={[{ required: true }]}
          >
            <Select>
              {trainers.map((trainer) => (
                <Select.Option key={trainer.id} value={trainer.id}>
                  {trainer.fullname}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Update Course
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageCourse;
