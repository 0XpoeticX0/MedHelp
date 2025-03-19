import {
  Layout,
  Button,
  Card,
  Row,
  Col,
  Typography,
  Space,
  Avatar,
} from "antd";
import { Heart, User, Stethoscope, Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router"; // Assuming you're using React Router

const { Content } = Layout;
const { Title, Text } = Typography;

const HomePage = () => {
  return (
    <div className="container mx-auto">
      <Content className="bg-gray-100 py-16">
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
              type="primary"
              size="large"
              className="bg-red-500 border-red-500"
              icon={<ArrowRight size={20} />}
            >
              <Link to="/">Get Help Now</Link>
            </Button>
            <Button size="large" className="border-red-500 text-red-500">
              <Link to="/register">Become a Volunteer</Link>
            </Button>
          </Space>
        </div>
      </Content>

      {/* About Section */}
      <Content className="py-16">
        <div className="container mx-auto">
          <Title
            level={2}
            className="text-center text-3xl font-semibold text-gray-800 mb-12"
          >
            Who We Are
          </Title>
          <Row gutter={[16, 16]} justify="center">
            <Col xs={24} md={16} className="text-center">
              <Text className="text-gray-600 text-lg">
                First Aid Heroes is dedicated to providing immediate first aid
                assistance, including CPR, through our trained volunteers. Our
                expert trainers equip volunteers with the skills to save lives,
                ensuring every patient receives the care they need in
                emergencies.
              </Text>
            </Col>
          </Row>
        </div>
      </Content>

      {/* Services Section */}
      <Content className="bg-gray-50 py-16 px-16">
        <div className="container mx-auto">
          <Title
            level={2}
            className="text-center text-3xl font-semibold text-gray-800 mb-12"
          >
            Our Services
          </Title>
          <Row gutter={[16, 16]} justify="center">
            <Col xs={24} sm={12} md={8}>
              <Card
                hoverable
                className="text-center"
                cover={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "16px",
                      minHeight: "100px",
                    }}
                  >
                    <Heart size={48} className="text-red-500" />
                  </div>
                }
              >
                <Card.Meta
                  title="CPR Assistance"
                  description="Immediate CPR support from our trained volunteers to save lives in emergencies."
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card
                hoverable
                className="text-center"
                cover={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "16px",
                      minHeight: "100px",
                    }}
                  >
                    <Stethoscope size={48} className="text-blue-500" />
                  </div>
                }
              >
                <Card.Meta
                  title="First Aid Training"
                  description="Comprehensive training programs led by expert trainers for volunteers."
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card
                hoverable
                className="text-center"
                cover={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "16px",
                      minHeight: "100px",
                    }}
                  >
                    <User size={48} className="text-green-500" />
                  </div>
                }
              >
                <Card.Meta
                  title="Volunteer Support"
                  description="Join our team to help patients and make a difference in your community."
                />
              </Card>
            </Col>
          </Row>
        </div>
      </Content>

      {/* Team Spotlight Section */}
      <Content className="py-16">
        <div className="container mx-auto">
          <Title
            level={2}
            className="text-center text-3xl font-semibold text-gray-800 mb-12"
          >
            Meet Our Team
          </Title>
          <Row gutter={[16, 16]} justify="center">
            <Col xs={24} sm={12} md={8}>
              <Card className="text-center">
                <Avatar
                  size={80}
                  icon={<Stethoscope />}
                  className="bg-blue-500 mb-4"
                />
                <Title level={4}>Dr. Sarah Lee</Title>
                <Text className="text-gray-600">Lead Trainer</Text>
                <p className="text-gray-500 mt-2">
                  &quot;Training volunteers to be first responders is my
                  passion.&quot;
                </p>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card className="text-center">
                <Avatar
                  size={80}
                  icon={<User />}
                  className="bg-green-500 mb-4"
                />
                <Title level={4}>Mark Johnson</Title>
                <Text className="text-gray-600">Volunteer Coordinator</Text>
                <p className="text-gray-500 mt-2">
                  &quot;Every volunteer is a hero in someone’s story.&quot;
                </p>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>

      {/* CTA Section */}
      <Content className="bg-red-400 py-16 text-center text-white">
        <div className="container mx-auto">
          <Title level={2} className="text-white mb-4">
            Ready to Make a Difference?
          </Title>
          <Text className="text-white text-lg block mb-8">
            Contact us today to get help or join our life-saving mission.
          </Text>
          <Button
            size="large"
            className="bg-white text-red-500 border-none"
            icon={<Phone size={20} />}
          >
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>
      </Content>
    </div>
  );
};

export default HomePage;
