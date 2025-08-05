import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { Card, List, Typography, Spin, Tag, message } from "antd";
import { HeartHandshake, UserRound, CalendarDays } from "lucide-react";

const { Title, Text } = Typography;

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHelpHistory = async () => {
    try {
      const res = await axiosClient.get("/help/patient/history");
      setHistory(res.data);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      message.error("Failed to load help history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHelpHistory();
  }, []);

  console.log(history);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <HeartHandshake className="text-[#1f80f0] w-6 h-6" />
        <Title level={2} className="!text-[#1f80f0] !mb-0">
          My Help History
        </Title>
      </div>

      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <Spin size="large" />
        </div>
      ) : history.length === 0 ? (
        <Text type="secondary">No help history found.</Text>
      ) : (
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={history}
          renderItem={(item) => (
            <List.Item>
              <Card
                title={
                  <div className="flex items-center gap-2 text-blue-500 font-semibold text-lg">
                    <UserRound className="w-5 h-5" />
                    {item.volunteerName || "Unassigned"}
                  </div>
                }
                styles={{
                  header: {
                    backgroundColor: "#d2d1f4",
                  },
                }}
                className="border border-red-100 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <p className="flex items-center gap-2">
                  <CalendarDays className="text-green-600 w-4 h-4" />
                  <Text strong>Requested on:</Text>
                  <Tag color="green">
                    {new Date(item.helpDate).toLocaleDateString()}
                  </Tag>
                </p>
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default History;
