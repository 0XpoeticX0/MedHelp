import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import { Pencil, Trash } from "lucide-react";
import axiosClient from "../../api/axiosClient";
import Swal from "sweetalert2";

const TrainersList = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState(null);
  const [form] = Form.useForm();

  // Fetch trainers
  const fetchTrainers = async () => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get("/trainers");
      setTrainers(data);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      message.error("Failed to fetch trainers");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  // Open edit modal
  const handleEdit = (trainer) => {
    setEditingTrainer(trainer);
    form.setFieldsValue(trainer);
    setIsModalOpen(true);
  };

  // Update trainer
  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();

      await axiosClient.put(`/trainers/${editingTrainer.id}`, values);

      Swal.fire({
        icon: "success",
        title: "Trainer updated successfully",
        timer: 1500,
      });

      fetchTrainers();
      setIsModalOpen(false);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      message.error("Failed to update trainer");
    }
  };

  // Delete trainer
  const handleDelete = async (id) => {
    try {
      await axiosClient.delete(`/trainers/${id}`);
      Swal.fire({
        icon: "success",
        title: "Trainer deleted successfully",
        timer: 1500,
      });
      fetchTrainers();
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      message.error("Failed to delete trainer");
    }
  };

  // Table columns
  const columns = [
    { title: "Full Name", dataIndex: "fullname", key: "fullname" },
    { title: "Age", dataIndex: "age", key: "age" },
    {
      title: "Qualifications",
      dataIndex: "qualifications",
      key: "qualifications",
    },
    { title: "Blood Type", dataIndex: "bloodType", key: "bloodType" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Actions",
      key: "actions",
      render: (_, trainer) => (
        <>
          <Button
            icon={<Pencil size={16} />}
            onClick={() => handleEdit(trainer)}
            style={{ marginRight: 8 }}
          />
          <Button
            icon={<Trash size={16} />}
            danger
            onClick={() => handleDelete(trainer.id)}
          />
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Table
        dataSource={trainers}
        columns={columns}
        rowKey="id"
        loading={loading}
      />

      {/* Edit Trainer Modal */}
      <Modal
        title="Edit Trainer"
        open={isModalOpen}
        onOk={handleUpdate}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="fullname"
            label="Full Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="age" label="Age" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="qualifications"
            label="Qualifications"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="bloodType" label="Blood Type">
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ type: "email", required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TrainersList;
