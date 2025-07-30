import { Layout, Button, Card, Row, Col, Typography, Avatar } from "antd";
import { Heart, User, Stethoscope, Phone } from "lucide-react";
import { Link } from "react-router"; // Assuming you're using React Router
import HelpSection from "../components/module/home/HelpSection";
import Footer from "../components/shared/Footer";

const { Content } = Layout;
const { Title, Text } = Typography;

const HomePage = () => {
  return (
    <div className="">
      <Content className={`bg-[url('./banner1.jpg')] bg-cover bg-center py-16`}>
        <HelpSection />
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
      <Content className="bg-[#D2D1F4] py-16 text-center text-white">
        <div className="container mx-auto">
          <Title level={2} className="text-white mb-4">
            Ready to Make a Difference?
          </Title>
          <Text className="text-white text-lg block mb-8">
            Contact us today to get help or join our life-saving mission.
          </Text>
          <Button
            color="primary"
            size="large"
            variant="solid"
            icon={<Phone size={20} />}
          >
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>
      </Content>

      <Content>
        <Footer />
      </Content>
    </div>
  );
};

export default HomePage;
