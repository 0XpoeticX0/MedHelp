import { Form, Input, Button } from "antd";
import {
  User,
  Mail,
  Phone,
  Home,
  GraduationCap,
  Droplet,
  Calendar,
} from "lucide-react";
import axiosClient from "../../api/axiosClient";
import Swal from "sweetalert2";

const AddTrainerForm = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await axiosClient.post("/trainers", values);
      // console.log(response);

      Swal.fire({
        icon: "success",
        title: "Trainer added successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      form.resetFields(); // Reset form after successful submission
    } catch (error) {
      console.error(
        "Add Trainer Error:",
        error.response?.data || error.message
      );
      Swal.fire({
        icon: "error",
        title: "Failed to add trainer",
        text: error.response?.data?.message || error.message,
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">Add Trainer</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="space-y-4"
      >
        <Form.Item
          name="fullname"
          label="Full Name"
          rules={[{ required: true, message: "Please enter full name" }]}
        >
          <Input prefix={<User size={18} />} placeholder="Enter full name" />
        </Form.Item>

        <Form.Item
          name="age"
          label="Age"
          rules={[{ required: true, message: "Please enter age" }]}
        >
          <Input
            prefix={<Calendar size={18} />}
            type="number"
            placeholder="Enter age"
          />
        </Form.Item>

        <Form.Item
          name="qualifications"
          label="Qualifications"
          rules={[{ required: true, message: "Please enter qualifications" }]}
        >
          <Input
            prefix={<GraduationCap size={18} />}
            placeholder="Enter qualifications"
          />
        </Form.Item>

        <Form.Item
          name="bloodType"
          label="Blood Type"
          rules={[{ required: true, message: "Please enter blood type" }]}
        >
          <Input
            prefix={<Droplet size={18} />}
            placeholder="Enter blood type"
          />
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: "Please enter address" }]}
        >
          <Input prefix={<Home size={18} />} placeholder="Enter address" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter email" },
            { type: "email", message: "Enter a valid email" },
          ]}
        >
          <Input
            prefix={<Mail size={18} />}
            type="email"
            placeholder="Enter email"
          />
        </Form.Item>

        <Form.Item
          name="phoneNo"
          label="Phone Number"
          rules={[{ required: true, message: "Please enter phone number" }]}
        >
          <Input
            prefix={<Phone size={18} />}
            type="tel"
            placeholder="Enter phone number"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-blue-600"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddTrainerForm;
