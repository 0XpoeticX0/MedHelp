import ProfileCard from "../../components/card/ProfileCard";
import {
  Card,
  Col,
  Row,
  Statistic,
  Avatar,
  Button,
  message,
  Tag,
  Table,
  Space,
} from "antd";
import { Clock, Heart, Users } from "lucide-react";
import axiosClient from "../../api/axiosClient";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { SyncOutlined } from "@ant-design/icons";
import { getUserFromToken } from "../../utils/auth";
import { useNavigate } from "react-router";

const VolunteerProfile = () => {
  const [isAvailable, setIsAvailable] = useState(); // current availability status of the volunteer
  const [seekHelp, setSeekHelp] = useState([]); // list of people seeking help
  const user = getUserFromToken();
  const navigate = useNavigate();

  /**
   * Handles volunteer availability updates by getting the user's location
   * and sending it to the server.
   */
  const handleProvideService = (value) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const res = await axiosClient.post("/users/availability", {
              isAvailable: value,
              latitude,
              longitude,
            });

            if (res.status === 200) {
              setIsAvailable(value);
              Swal.fire({
                position: "center",
                icon: "success",
                title: res.data.message,
              });
            } else {
              message.error("Failed to update availability.");
            }
          } catch (err) {
            console.error(err);
            message.error("Error sending location.");
          }
        },
        (error) => {
          console.error("Location error:", error);
          message.error("Could not get your location. Please enable GPS.");
        }
      );
    } else {
      message.error("Geolocation not supported by your browser.");
    }
  };

  /**
   * Fetch the volunteer's current availability status on mount
   * or when `isAvailable` is updated.
   */
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await axiosClient.get("/users/availability");
        setIsAvailable(response.data.is_available);
      } catch (error) {
        console.error("Error fetching availability:", error);
      }
    };

    fetchAvailability();
  }, [isAvailable]);

  /**
   * Fetch list of help requests for this volunteer on component mount.
   */
  useEffect(() => {
    const fetchSeekHelp = async () => {
      try {
        const response = await axiosClient.get("/help/help-for-volunteer");

        if (response.data?.success) {
          setSeekHelp(response.data.data || []);
        } else {
          console.warn("Failed to fetch help requests:", response.data.message);
          setSeekHelp([]);
          message.error(
            response.data.message || "Failed to fetch help requests"
          );
        }
      } catch (error) {
        console.error("Error fetching help requests:", error);
        setSeekHelp([]);
        message.error("An error occurred while fetching help requests");
      }
    };

    fetchSeekHelp();
  }, []);

  // Update handleAccept to refresh the list
  const handleAccept = async (record) => {
    try {
      const response = await axiosClient.put("/help/update-help-status", {
        helpId: record.id,
        volunteerId: user.id,
      });

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Help request accepted!",
          text: `You have accepted help request from ${record.patient_id}.`,
        });
      }
      navigate(`/dashboard/volunteer/navigation-page/${record.id}`);
    } catch (error) {
      console.error("Error accepting help request:", error);
      Swal.fire({
        icon: "error",
        title: "Oops... Something went wrong!",
      });
    }
  };

  // Table columns for displaying people who need help
  const columns = [
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
            disabled={isAvailable === "inService"}
            onClick={() => {
              handleAccept(record);
              // TODO: Implement actual accept logic
            }}
            type="primary"
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            Accept
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="mx-auto container py-8 px-4">
      <Row gutter={[16, 16]}>
        {/* Welcome Card */}
        <Col xs={24} md={8}>
          <Card
            style={{
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              height: "100%",
              background: "linear-gradient(135deg, #f6ffed 0%, #e6f4ea 100%)",
            }}
          >
            <div className="flex flex-col items-center gap-4 text-center">
              <Avatar
                size={64}
                icon={<Heart color="#52c41a" />}
                style={{ backgroundColor: "rgba(82, 196, 26, 0.1)" }}
              />
              <div>
                <h2 className="text-xl font-semibold mb-2 text-green-700">
                  You’re a Superhero, Volunteer!
                </h2>
                <p className="text-gray-700 text-sm leading-relaxed">
                  &quot;Hey there, world-changer! Every smile you create, every
                  hand you lift, and every moment you give makes our community
                  shine brighter...&quot;
                </p>
              </div>
              <div>
                {isAvailable === "notAvailable" ? (
                  <Button
                    onClick={() => handleProvideService("available")}
                    className="mt-4"
                  >
                    Available For Service
                  </Button>
                ) : isAvailable === "inService" ? (
                  <Tag
                    className="mt-4"
                    color="yellow"
                    icon={<SyncOutlined spin />}
                  >
                    In Service...
                  </Tag>
                ) : (
                  <Button
                    onClick={() => handleProvideService("notAvailable")}
                    className="mt-4"
                  >
                    Go to Offline
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </Col>

        {/* Profile Card */}
        <Col xs={24} md={8}>
          <ProfileCard user={user} />
        </Col>

        {/* Volunteer Stats */}
        <Col xs={24} md={8}>
          <Card
            style={{
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              height: "100%",
            }}
          >
            <h3 className="text-lg font-semibold mb-4">Volunteer Stats</h3>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Statistic
                  title="Hours Served"
                  value={48}
                  prefix={<Clock size={16} className="text-green-500" />}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="People Helped"
                  value={23}
                  prefix={<Users size={16} className="text-green-500" />}
                />
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Help Requests Table */}
        <Col xs={24} md={16}>
          <Card
            style={{
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <h3 className="text-lg font-semibold mb-4">Need Help</h3>
            {isAvailable === "notAvailable" ? (
              <span>Please change your status to see the help requests.</span>
            ) : (
              <Table
                dataSource={seekHelp}
                columns={columns}
                rowKey={(record) => record.patient_id} // important for key warnings
              />
            )}
          </Card>
        </Col>

        {/* Quick Info Card */}
        <Col xs={24} md={8}>
          <Card
            style={{
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              height: "100%",
            }}
          >
            <h3 className="text-lg font-semibold mb-4">Quick Info</h3>
            <div className="space-y-3">
              <p>
                <strong>Next Event:</strong> Health Camp
              </p>
              <p>
                <strong>Date:</strong> March 25, 2025
              </p>
              <p>
                <strong>Location:</strong> Community Center
              </p>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default VolunteerProfile;
