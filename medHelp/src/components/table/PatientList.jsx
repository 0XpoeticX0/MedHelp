import { useEffect, useState } from "react";
import { Table, Input, Spin, message, Button, Popconfirm } from "antd";
import { Search, Ban, Trash2 } from "lucide-react";
import axiosClient from "../../api/axiosClient.js";

const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const { data } = await axiosClient.get("/users?role=patient");
      setPatients(data);
      setFilteredPatients(data);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      message.error("Failed to fetch patients");
    } finally {
      setLoading(false);
    }
  };

  // Search filter
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = patients.filter(
      (patient) =>
        patient.firstName.toLowerCase().includes(value) ||
        patient.lastName.toLowerCase().includes(value) ||
        patient.email.toLowerCase().includes(value)
    );
    setFilteredPatients(filtered);
  };

  // Toggle Block/Unblock
  const handleBlockToggle = async (id, isBlocked) => {
    try {
      const updatedStatus = !isBlocked;
      await axiosClient.patch(`/users/toggleStatus/${id}`, {
        isBlocked: updatedStatus,
      });
      message.success(
        updatedStatus
          ? "Patient blocked successfully"
          : "Patient unblocked successfully"
      );

      // Update local state
      setPatients((prev) =>
        prev.map((patient) =>
          patient.id === id ? { ...patient, isBlocked: updatedStatus } : patient
        )
      );
      setFilteredPatients((prev) =>
        prev.map((patient) =>
          patient.id === id ? { ...patient, isBlocked: updatedStatus } : patient
        )
      );
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      message.error("Failed to update patient status");
    }
  };

  // Delete patient
  const handleDelete = async (id) => {
    try {
      await axiosClient.delete(`/users/delete/${id}`);
      message.success("Patient deleted successfully");

      // Update local state
      setPatients((prev) => prev.filter((patient) => patient.id !== id));
      setFilteredPatients((prev) =>
        prev.filter((patient) => patient.id !== id)
      );
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      message.error("Failed to delete patient");
    }
  };

  // Ant Design Table columns
  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Status",
      dataIndex: "isBlocked",
      key: "isBlocked",
      render: (isBlocked) => (isBlocked ? "Blocked" : "Active"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            type="default"
            onClick={() => handleBlockToggle(record.id, record.isBlocked)}
            icon={<Ban size={18} />}
            danger={record.isBlocked}
          >
            {record.isBlocked ? "Unblock" : "Block"}
          </Button>

          <Popconfirm
            title="Are you sure to delete this patient?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger icon={<Trash2 size={18} />}>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Patients List</h2>

      {/* Search Input */}
      <div className="flex mb-4">
        <Input
          prefix={<Search />}
          placeholder="Search patients..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full"
        />
      </div>

      {/* Data Table */}
      {loading ? (
        <Spin size="large" className="flex justify-center items-center" />
      ) : (
        <Table
          columns={columns}
          dataSource={filteredPatients}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          bordered
        />
      )}
    </div>
  );
};

export default PatientsList;
