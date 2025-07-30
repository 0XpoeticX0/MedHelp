// Navbar.jsx
import { useState } from "react";
import { Menu, Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link, NavLink, useLocation } from "react-router";
import { getUserFromToken, logout } from "../../utils/auth.js";
import Swal from "sweetalert2";
import { Hospital, LogIn, LogOut } from "lucide-react";
import { menuItems } from "../constant/index.js";

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const user = getUserFromToken();

  // console.log(user);

  const handleLogout = () => {
    logout();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Log out successful",
      showConfirmButton: false,
      timer: 1500,
    });
    window.location.reload();
  };

  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="sm:px-6">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <Hospital className="text-blue-600" />
              {/* Optional: Add text beside logo */}
              <span className="ml-2 md:text-2xl font-bold text-blue-600">
                Med Help
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-3">
            <Menu
              style={{
                width: "25rem",
              }}
              theme="light"
              mode="horizontal"
              selectedKeys={[location.pathname]}
              items={menuItems.map((item) => ({
                key: item.key,
                label: (
                  <Link
                    to={item.path}
                    className="text-gray-700 hover:text-blue-600"
                  >
                    {item.label}
                  </Link>
                ),
              }))}
              className="border-none"
            />
          </div>

          <div className="hidden md:block">
            {user?.email ? (
              <div className="flex items-center space-x-4">
                <Button
                  color="danger"
                  variant="outline"
                  onClick={handleLogout}
                  className="flex items-center gap-3 "
                >
                  <LogOut />
                </Button>
                <NavLink to={`/dashboard/${user?.role}/profile`}>
                  <img
                    src={"/user.svg"}
                    alt={user?.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-600"
                  />
                </NavLink>
              </div>
            ) : (
              <NavLink to="/login">
                <Button type="primary" className="flex items-center gap-3">
                  <LogIn />
                  Login
                </Button>
              </NavLink>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={showDrawer}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <MenuOutlined className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <Drawer placement="right" onClose={onClose} open={visible}>
        <Menu
          mode="vertical"
          selectedKeys={[location.pathname]}
          items={menuItems.map((item) => ({
            key: item.key,
            label: (
              <Link
                to={item.path}
                onClick={onClose}
                className="text-gray-700 hover:text-blue-600"
              >
                {item.label}
              </Link>
            ),
          }))}
        />
        <div className="flex justify-center mt-4">
          {user?.email ? (
            <div className="flex gap-10">
              <NavLink to={`/dashboard/${user?.role}/profile`}>
                <Button
                  color="primary"
                  variant="solid"
                  onClick={handleLogout}
                  className="flex items-center gap-3 "
                >
                  Go to Profile
                </Button>
              </NavLink>

              <Button
                color="danger"
                variant="solid"
                onClick={handleLogout}
                className="flex items-center gap-3 "
              >
                <LogOut />
                Log out
              </Button>
            </div>
          ) : (
            <NavLink to="/login">
              <Button type="primary" className="flex items-center gap-3">
                <LogIn />
                Login
              </Button>
            </NavLink>
          )}
        </div>
      </Drawer>
    </nav>
  );
};

export default NavBar;
