import { useEffect } from "react";
import Countdown from "react-countdown";
import { Card, Typography } from "antd";
import "antd/dist/reset.css";
import { useLocation, useNavigate } from "react-router";

const { Title, Text } = Typography;

const WaitingRoom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const patient_id = location.state?.patient_id;
  const isGuest = patient_id?.startsWith("GUEST-") ?? false;

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Display a custom confirmation dialog
      event.preventDefault();
      event.returnValue =
        "Wait don't reload. If you reload the timer will restart again."; // Required for modern browsers to show confirmation dialog
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return (
        <div
          style={{
            width: "400px",
            height: "400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "4px solid #ff4d4f",
            borderRadius: "50%",
            backgroundColor: "#fff1f0",
          }}
        >
          <Text type="danger" strong style={{ fontSize: "24px" }}>
            Please have patience. Our volunteer is on the way!
          </Text>
        </div>
      );
    } else {
      return (
        <div
          style={{
            width: "400px",
            height: "400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "4px solid #1890ff",
            borderRadius: "50%",
            backgroundColor: "#e6f7ff",
          }}
        >
          <Text strong style={{ fontSize: "48px" }}>
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </Text>
        </div>
      );
    }
  };

  const handleRegister = () => {
    navigate("/register", { state: { patient_id } });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <Card
        title={<Title level={4}>Waiting Room</Title>}
        style={{ textAlign: "center" }}
      >
        <div style={{ marginBottom: "20px" }}>
          <Text>Please wait...</Text>
        </div>

        <div
          style={{
            margin: "30px auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Countdown date={Date.now() + 600000} renderer={renderer} />
        </div>
      </Card>
      <br />
      <Card>
        <Text strong style={{ fontSize: "16px" }}>
          Important Note:
        </Text>
        <br />
        <Text>
          {isGuest ? (
            <p>
              You are in a guest session. Please go to our registration page to
              store your history.
              <button onClick={handleRegister}>
                <span className="text-blue-500 hover:underline font-semibold p-2">
                  Register from here
                </span>
              </button>
            </p>
          ) : (
            `Your Patient ID: ${patient_id}. Please wait for a volunteer to assist you.`
          )}
        </Text>
      </Card>
    </div>
  );
};

export default WaitingRoom;
