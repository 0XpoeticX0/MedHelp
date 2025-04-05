import ProfileCard from "../../components/card/ProfileCard";
import {
  Card,
  Col,
  Row,
  Statistic,
  Timeline,
  Avatar,
  Button,
  message,
  Tag,
} from "antd";
import { Clock, Heart, Users, Calendar, CheckCircle } from "lucide-react";
// import { useNavigate } from "react-router";
import axiosClient from "../../api/axiosClient";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { SyncOutlined } from "@ant-design/icons";

const VolunteerProfile = () => {
  // const navigate = useNavigate();

  const [isAvailable, setIsAvailable] = useState();

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

            if (res.statusText === "OK") {
              setIsAvailable(value);
              Swal.fire({
                position: "center",
                icon: "success",
                title: res.data.message,
              });
            } else {
              message.error("No volunteers available.");
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

  const helps = axiosClient.get("/users/help-for-volunteer");
  console.log(helps.data);

  return (
    <div className="mx-auto container py-8 px-4">
      <Row gutter={[16, 16]}>
        {/* Welcome Card with Cheerful Note */}
        <Col xs={24} md={8}>
          <Card
            style={{
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              height: "100%",
              background: "linear-gradient(135deg, #f6ffed 0%, #e6f4ea 100%)", // Light green gradient
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
                  shine brighter. You’re not just a volunteer—you’re a spark of
                  hope, a burst of joy, and a true hero in action. Keep rocking
                  it—we’re so grateful for YOU!&quot;
                </p>
              </div>
              <div className="">
                {isAvailable === "notAvailable" ? (
                  <Button
                    onClick={() => handleProvideService("inService")}
                    variant="outlined"
                    color="green"
                    className="mt-4"
                  >
                    Available For Service
                  </Button>
                ) : (
                  <>
                    {isAvailable === "available" ? (
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
                        variant="outlined"
                        color="orange"
                        className="mt-4"
                      >
                        Go to offline
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          </Card>
        </Col>

        {/* Profile Card */}
        <Col xs={24} md={8}>
          <ProfileCard />
        </Col>

        {/* Stats Card */}
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

        {/* Recent Activity Card */}
        <Col xs={24} md={16}>
          <Card
            style={{
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <h3 className="text-lg font-semibold mb-4">Need Help</h3>
            <Timeline
              items={[
                {
                  children: (
                    <div>
                      <p className="font-medium">Community Cleanup</p>
                      <p className="text-gray-500 text-sm">
                        <Calendar size={14} className="inline mr-1" />
                        March 15, 2025
                      </p>
                    </div>
                  ),
                  dot: <CheckCircle size={16} className="text-green-500" />,
                },
                {
                  children: (
                    <div>
                      <p className="font-medium">Food Drive Support</p>
                      <p className="text-gray-500 text-sm">
                        <Calendar size={14} className="inline mr-1" />
                        March 10, 2025
                      </p>
                    </div>
                  ),
                  dot: <CheckCircle size={16} className="text-green-500" />,
                },
              ]}
            />
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
