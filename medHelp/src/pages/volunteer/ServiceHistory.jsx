import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { Card, message, Table } from "antd";

const ServiceHistory = () => {
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);

  // Fetch running services (consolidated function)
  const fetchServiceHistory = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get("/help/services/history");
      // console.log("API response:", response.data);

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
    fetchServiceHistory();
  }, []);

  //console.log(services);

  const columns = [
    {
      title: "Service ID",
      dataIndex: "id",
      key: "service_id",
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
  ];

  return (
    <div className="">
      {" "}
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

export default ServiceHistory;
