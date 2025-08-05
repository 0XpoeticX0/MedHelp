import ProfileCard from "../../components/card/ProfileCard";
import { Card, Col, Row, Statistic, Timeline, Avatar, Progress } from "antd";
import {
  Clock,
  Heart,
  Stethoscope,
  Calendar,
  CheckCircle,
  User,
} from "lucide-react";
import { getUserFromToken } from "../../utils/auth";

const PatientProfile = () => {
  const user = getUserFromToken();
  return (
    <div className="container mx-auto py-8 px-4">
      <Row gutter={[16, 16]}>
        {/* Welcome Card */}
        <Col xs={24} md={8}>
          <Card
            style={{
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              height: "100%",
              background: "linear-gradient(135deg, #e6f7ff 0%, #bae7ff 100%)", // Light blue gradient
            }}
          >
            <div className="flex flex-col items-center gap-4 text-center">
              <Avatar
                size={64}
                icon={<Heart color="#1890ff" />}
                style={{ backgroundColor: "rgba(24, 144, 255, 0.1)" }}
              />
              <div>
                <h2 className="text-xl font-semibold mb-2 text-blue-700">
                  Your Health Matters!
                </h2>
                <p className="text-gray-700 text-sm leading-relaxed">
                  &quot;Welcome back! We’re here to support you every step of
                  the way on your journey to wellness. You’ve got this, and
                  we’ve got you!&quot;
                </p>
              </div>
            </div>
          </Card>
        </Col>

        {/* Profile Card */}
        <Col xs={24} md={8}>
          <ProfileCard user={user} />
        </Col>

        {/* Health Stats Card */}
        <Col xs={24} md={8}>
          <Card
            style={{
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              height: "100%",
            }}
          >
            <h3 className="text-lg font-semibold mb-4">Health Overview</h3>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Statistic
                  title="Last Visit"
                  value={"March 10"}
                  prefix={<Calendar size={16} className="text-blue-500" />}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Services Taken"
                  value={5}
                  prefix={<Clock size={16} className="text-blue-500" />}
                />
              </Col>
              <Col span={24}>
                <div className="mt-2">
                  <p className="text-sm text-gray-600 mb-1">
                    Recovery Progress
                  </p>
                  <Progress percent={75} strokeColor="#1890ff" />
                </div>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Services Taken Card */}
        <Col xs={24} md={16}>
          <Card
            style={{
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <h3 className="text-lg font-semibold mb-4">Services Taken</h3>
            <Timeline
              items={[
                {
                  children: (
                    <div>
                      <p className="font-medium">General Checkup</p>
                      <p className="text-gray-500 text-sm">
                        <Calendar size={14} className="inline mr-1" />
                        March 10, 2025 - Dr. Smith
                      </p>
                    </div>
                  ),
                  dot: <CheckCircle size={16} className="text-blue-500" />,
                },
                {
                  children: (
                    <div>
                      <p className="font-medium">Physical Therapy</p>
                      <p className="text-gray-500 text-sm">
                        <Calendar size={14} className="inline mr-1" />
                        March 5, 2025 - Therapist Jane
                      </p>
                    </div>
                  ),
                  dot: <CheckCircle size={16} className="text-blue-500" />,
                },
                {
                  children: (
                    <div>
                      <p className="font-medium">Blood Test</p>
                      <p className="text-gray-500 text-sm">
                        <Calendar size={14} className="inline mr-1" />
                        February 28, 2025 - Lab Tech Mike
                      </p>
                    </div>
                  ),
                  dot: <CheckCircle size={16} className="text-blue-500" />,
                },
              ]}
            />
          </Card>
        </Col>

        {/* Care Team Card */}
        <Col xs={24} md={8}>
          <Card
            style={{
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              height: "100%",
            }}
          >
            <h3 className="text-lg font-semibold mb-4">Your Care Team</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar
                  size={40}
                  icon={<Stethoscope size={20} />}
                  style={{ backgroundColor: "#1890ff" }}
                />
                <div>
                  <p className="font-medium">Dr. Emily Smith</p>
                  <p className="text-gray-500 text-sm">Primary Physician</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Avatar
                  size={40}
                  icon={<User size={20} />}
                  style={{ backgroundColor: "#40a9ff" }}
                />
                <div>
                  <p className="font-medium">Nurse John Doe</p>
                  <p className="text-gray-500 text-sm">Care Coordinator</p>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PatientProfile;
