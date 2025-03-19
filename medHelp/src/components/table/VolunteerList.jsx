import { useEffect, useState } from "react";
import { Table, Input, Spin, message, Button, Popconfirm } from "antd";
import { Search, Ban, Trash2 } from "lucide-react";
import axiosClient from "../../api/axiosClient.js";

const VolunteerList = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVolunteers, setFilteredVolunteers] = useState([]);

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const { data } = await axiosClient.get("/users?role=volunteer");
      setVolunteers(data);
      setFilteredVolunteers(data);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      message.error("Failed to fetch volunteers");
    } finally {
      setLoading(false);
    }
  };

  // Search filter
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = volunteers.filter(
      (volunteer) =>
        volunteer.firstName.toLowerCase().includes(value) ||
        volunteer.lastName.toLowerCase().includes(value) ||
        volunteer.email.toLowerCase().includes(value)
    );
    setFilteredVolunteers(filtered);
  };

  // Toggle Block/Unblock
  const handleBlockToggle = async (id, isBlocked) => {
    try {
      const updatedStatus = !isBlocked; // Toggle status
      await axiosClient.patch(`/users/toggleStatus/${id}`, {
        isBlocked: updatedStatus,
      });
      message.success(
        updatedStatus
          ? "User blocked successfully"
          : "User unblocked successfully"
      );

      // Update local state immediately
      setVolunteers((prev) =>
        prev.map((vol) =>
          vol.id === id ? { ...vol, isBlocked: updatedStatus } : vol
        )
      );
      setFilteredVolunteers((prev) =>
        prev.map((vol) =>
          vol.id === id ? { ...vol, isBlocked: updatedStatus } : vol
        )
      );
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      message.error("Failed to update user status");
    }
  };

  // Delete Volunteer
  const handleDelete = async (id) => {
    try {
      await axiosClient.delete(`/users/delete/${id}`);
      message.success("User deleted successfully");

      // Update local state immediately
      setVolunteers((prev) => prev.filter((vol) => vol.id !== id));
      setFilteredVolunteers((prev) => prev.filter((vol) => vol.id !== id));
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      message.error("Failed to delete user");
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
            title="Are you sure?"
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
      <h2 className="text-xl font-semibold mb-4">Volunteer List</h2>

      {/* Search Input */}
      <div className="flex mb-4">
        <Input
          prefix={<Search />}
          placeholder="Search volunteers..."
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
          dataSource={filteredVolunteers}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          bordered
        />
      )}
    </div>
  );
};

export default VolunteerList;
