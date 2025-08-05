import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { Button, Card, message, Space, Table } from "antd";
import Swal from "sweetalert2";
import { getUserFromToken } from "../../utils/auth";
import { Link } from "react-router";

const RunningServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = getUserFromToken();

  // Fetch running services (consolidated function)
  const fetchRunningServices = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get("/help/get-running-services");
      console.log("API response:", response.data);

      // Assuming response.data is an array or has a structured format
      if (Array.isArray(response.data)) {
        setServices(response.data);
      } else if (response.data?.success && Array.isArray(response.data.data)) {
        setServices(response.data.data);
      } else {
        setServices([]);
        message.warning("No running services found");
      }
    } catch (error) {
      console.error("Error fetching running services:", error);
      setServices([]);
      message.error(
        error.response?.data?.message || "Failed to fetch running services"
      );
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch on mount
  useEffect(() => {
    fetchRunningServices();
  }, []);

  // Handle completing a service
  const handleComplete = async (record) => {
    try {
      setLoading(true); // Show loading while completing
      await axiosClient.put("/help/complete-help", {
        helpId: record.id,
        volunteerId: user.id,
      });

      Swal.fire({
        icon: "success",
        title: "Help request completed!",
        text: `You have completed help request from ${record.patient_id}.`,
      });

      // Refresh services after completion
      await fetchRunningServices();
    } catch (error) {
      console.error("Error completing help request:", error);
      Swal.fire({
        icon: "error",
        title: "Oops... Something went wrong!",
        text: error.response?.data?.message || "Failed to complete request",
      });
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Service ID",
      dataIndex: "id",
      key: "service_id",
      render: (text, record) => (
        <Link to={`/dashboard/volunteer/navigation-page/${record.id}`}>
          <p className="text-black hover:text-blue-500 hover:underline">
            {record.id || record.patient_id}
          </p>
        </Link>
      ),
    },
    {
      title: "Patient ID",
      dataIndex: "patient_id",
      key: "patient_id",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Button
            onClick={() => handleComplete(record)}
            type="primary"
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            Complete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      <Card
        style={{
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h3 className="text-lg font-semibold mb-4">My Running Services</h3>
        <Table
          loading={loading}
          dataSource={services}
          columns={columns}
          rowKey={(record) => record.id || record.patient_id} // Use id if available, else patient_id
          pagination={{ pageSize: 10 }} // Optional: limit rows per page
        />
      </Card>
    </div>
  );
};

export default RunningServices;
