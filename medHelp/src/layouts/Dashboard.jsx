import { Navigate, NavLink, Outlet, useNavigate } from "react-router";
import { getUserFromToken, logout } from "../utils/auth";
import { Button, Layout, Menu, Tooltip } from "antd";
import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  LogOut,
  Hospital,
  UserCheck,
  Users,
  UserCog,
  BookOpen,
  User,
  BookOpenCheck,
  History,
} from "lucide-react";

import Swal from "sweetalert2";
const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const navigate = useNavigate();
  const { name, email, role } = getUserFromToken();

  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Log out successful",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/");
  };

  let items = [];

  switch (role) {
    case "admin":
      items = [
        {
          key: "1",
          icon: <User />,
          label: <NavLink to="/dashboard/admin/profile">Profile</NavLink>,
        },
        {
          key: "2",
          icon: <UserCog />,
          label: "Manage Trainers",
          children: [
            {
              key: "3",
              label: (
                <NavLink to="/dashboard/admin/add-trainer">Add Trainer</NavLink>
              ),
            },
            {
              key: "4",
              label: (
                <NavLink to="/dashboard/admin/all-trainers">
                  All Trainers
                </NavLink>
              ),
            },
          ],
        },
        {
          key: "5",
          icon: <Users />,
          label: (
            <NavLink to="/dashboard/admin/manage-volunteers">
              Manage Volunteers
            </NavLink>
          ),
        },
        {
          key: "6",
          icon: <UserCheck />,
          label: (
            <NavLink to="/dashboard/admin/manage-patients">
              Manage Patients
            </NavLink>
          ),
        },
        {
          key: "7",
          icon: <BookOpen />,
          label: "Manage Courses",
          children: [
            {
              key: "8",
              label: (
                <NavLink to="/dashboard/admin/add-course">Add Course</NavLink>
              ),
            },
            {
              key: "9",
              label: (
                <NavLink to="/dashboard/admin/all-course">All Course</NavLink>
              ),
            },
          ],
        },
      ];
      break;
    case "volunteer":
      items = [
        {
          key: "1",
          icon: <User />,
          label: <NavLink to="/dashboard/volunteer/profile">Profile</NavLink>,
        },
        {
          key: "2",
          icon: <BookOpen />,
          label: <NavLink to="/dashboard/volunteer/courses">Course</NavLink>,
        },
        {
          key: "3",
          icon: <BookOpenCheck />,
          label: (
            <NavLink to="/dashboard/volunteer/certification">
              Certification
            </NavLink>
          ),
        },
      ];
      break;
    case "patient":
      items = [
        {
          key: "1",
          icon: <User />,
          label: <NavLink to="/dashboard/patient/profile">Profile</NavLink>,
        },
        {
          key: "2",
          icon: <History />,
          label: <NavLink to="/dashboard/patient/history">History</NavLink>,
        },
      ];
      break;
    default:
      break;
  }

  return role ? (
    <div className="">
      <div className="">
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            className="min-h-screen"
          >
            <div className="demo-logo-vertical" />
            <div className="text-white h-[6rem] items-center flex justify-between border-b-2 mb-2">
              <h1
                className={`text-lg font-semibold flex ${
                  collapsed ? "flex-col justify-center text-center text-xs" : ""
                } items-center gap-3 p-4`}
              >
                {collapsed ? <Hospital size={16} /> : <Hospital size={24} />}
                Med Help
              </h1>
            </div>

            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["1"]}
              items={items}
            />
            <div
              className={`m-[4px] ${
                collapsed ? "px-[28px]" : "pl-[24px] pr-[16px]"
              } cursor-pointer`}
            >
              {collapsed ? (
                <Tooltip placement="right" title="Log out">
                  <button
                    onClick={handleLogout}
                    className="flex gap-2 text-red-500 cursor-pointer hover:text-white"
                  >
                    <LogOut size={20} />
                  </button>
                </Tooltip>
              ) : (
                <button
                  onClick={handleLogout}
                  className="flex gap-2 text-red-500 cursor-pointer hover:text-white"
                >
                  <LogOut size={20} /> <span>Log out</span>
                </button>
              )}
            </div>
          </Sider>
          <Layout>
            <Header
              style={{
                padding: 0,
                height: "6rem",
                background: "#001529",
              }}
            >
              <div className="flex justify-between items-center">
                <Button
                  type="text"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: "24px",
                    width: 64,
                    height: 64,
                    color: "white",
                  }}
                />

                <div className="flex items-center gap-6 p-4">
                  <div className="flex flex-col text-white">
                    <span className="text-xl font-semibold">{name}</span>
                    <span className="text-sm text-gray-400">{role}</span>
                    <span className="text-sm mt-1">{email}</span>
                  </div>
                  <div className="flex-shrink-0">
                    <img
                      src={"/user.svg"}
                      alt={name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-600"
                    />
                  </div>
                </div>
              </div>
            </Header>
            <Content
              style={{
                minHeight: 280,
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default Dashboard;
