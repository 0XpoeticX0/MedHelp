import { useEffect, useState } from "react";
import { Card, Statistic, Button, List, Avatar, Spin, Alert } from "antd";
import {
  UserCheck,
  Users,
  Settings,
  PlusCircle,
  BookPlus,
  BookOpen,
  Briefcase,
  HeartHandshake,
  UserRoundX,
} from "lucide-react";
import { NavLink } from "react-router";
import ProfileCard from "../../components/card/ProfileCard";
import axiosClient from "../../api/axiosClient.js"; // Import axiosClient

const AdminProfile = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axiosClient.get("/auth/dashboard-stats");
        if (data.success) {
          setStats(data.stats);
          // console.log(data.stats);
        } else {
          throw new Error("Failed to fetch statistics");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const recentActivities = [
    { id: 1, action: "Blocked a user", time: "2 hours ago" },
    { id: 2, action: "Approved a volunteer", time: "1 day ago" },
    { id: 3, action: "Updated system settings", time: "3 days ago" },
  ];

  return (
    <div className="container mx-auto grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6">
      {/* Profile Card */}
      <ProfileCard />

      {/* Statistics Cards */}
      <Card className="shadow-md rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Admin Statistics</h3>

        {loading ? (
          <Spin />
        ) : error ? (
          <Alert message="Error fetching data" type="error" showIcon />
        ) : (
          <div className="grid grid-cols-3 gap-3">
            <Statistic
              title="Total Users"
              value={stats.totalUsers || 0}
              prefix={<Users />}
            />
            <Statistic
              title="Active Users"
              value={stats.activeUsers}
              prefix={<UserCheck />}
            />
            <Statistic
              title="Blocked Users"
              value={stats.blockedUsers}
              prefix={<UserRoundX />}
            />
            <Statistic
              title="Total Courses"
              value={stats.totalCourses}
              prefix={<BookOpen />}
            />
            <Statistic
              title="Total Patients"
              value={stats.totalPatients}
              prefix={<HeartHandshake />}
            />
            <Statistic
              title="Total Volunteers"
              value={stats.totalVolunteers}
              prefix={<Briefcase />}
            />
            <Statistic
              title="Total Trainers"
              value={stats.totalTrainers}
              prefix={<Users />}
            />
          </div>
        )}
      </Card>

      {/* Recent Activities */}
      <Card className="shadow-md rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
        <List
          dataSource={recentActivities}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon={<Settings />} />}
                title={item.action}
                description={item.time}
              />
            </List.Item>
          )}
        />
      </Card>

      {/* Quick Actions */}
      <Card className="shadow-md rounded-lg md:col-span-2 lg:col-span-3">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="flex flex-col md:flex-row gap-5">
          <NavLink to="/dashboard/admin/add-trainer">
            <Button type="primary" icon={<PlusCircle size={14} />}>
              Add Trainer
            </Button>
          </NavLink>
          <NavLink to="/dashboard/admin/add-course">
            <Button type="default" icon={<BookPlus size={14} />}>
              Add Course
            </Button>
          </NavLink>
          <NavLink to="/dashboard/admin/manage-volunteers">
            <Button type="default" icon={<UserCheck />}>
              Manage Volunteers
            </Button>
          </NavLink>
        </div>
      </Card>
    </div>
  );
};

export default AdminProfile;
