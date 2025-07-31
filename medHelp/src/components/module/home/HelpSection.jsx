import { Button, message, Space, Typography } from "antd";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { getUserFromToken } from "../../../utils/auth";
import axiosClient from "../../../api/axiosClient";

const { Title, Text } = Typography;
const HelpSection = () => {
  const navigate = useNavigate();

  const user = getUserFromToken();

  console.log(user);

  const patient_id = user?.id || `GUEST-${Date.now()}`;

  const handleGetHelp = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          console.log({ latitude, longitude });

          try {
            const res = await axiosClient.post("/users/seek-for-help", {
              latitude,
              longitude,
              patient_id,
            });

            console.log(res.data);

            if (res.statusText === "OK") {
              message.success("Location sent successfully.");
              navigate("/volunteer");
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

  return (
    <div className="container mx-auto text-center">
      <Title
        level={1}
        className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
      >
        Saving Lives, One Beat at a Time
      </Title>
      <Text className="text-lg text-gray-600 block mb-8">
        Learn CPR, get first aid support, and join our mission to empower
        communities with life-saving skills.
      </Text>
      <Space size="middle">
        <Button
          onClick={handleGetHelp}
          type="primary"
          size="large"
          className="bg-red-500 border-red-500"
          icon={<ArrowRight size={20} />}
        >
          <Link to="/">Get Help Now</Link>
        </Button>
        <Button size="large" className="border-red-500 text-red-500">
          <Link to="/register">Register Now!!</Link>
        </Button>
      </Space>
    </div>
  );
};

export default HelpSection;
