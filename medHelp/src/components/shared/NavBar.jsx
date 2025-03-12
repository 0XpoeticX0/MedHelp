// Navbar.jsx
import { useState } from "react";
import { Menu, Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link, NavLink, useLocation } from "react-router";
import { getUserFromToken, logout } from "../../utils/auth.js";
import Swal from "sweetalert2";
import { LogIn, LogOut } from "lucide-react";

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

  const menuItems = [
    { key: "/", label: "Home", path: "/" },
    { key: "/about", label: "About", path: "/about" },
    { key: "/services", label: "Services", path: "/services" },
    { key: "/contact", label: "Contact", path: "/contact" },
  ];

  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="https://assets.grok.com/users/2c61054b-87b9-42dd-b6e9-b1e4ce6d4e9c/xbrV6C7PDQWx3KQs-generated_image.jpg"
                alt="medHelp logo"
                className="h-10 w-auto" // Added size constraints
              />
              {/* Optional: Add text beside logo */}
              <span className="ml-2 text-2xl font-bold text-blue-600 hidden sm:inline">
                medHelp
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Menu
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
              <Button
                color="danger"
                variant="solid"
                onClick={handleLogout}
                className="flex items-center gap-3 "
              >
                <LogOut />
                Log out
              </Button>
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
            <Button
              color="danger"
              variant="solid"
              onClick={handleLogout}
              className="flex items-center gap-3 "
            >
              <LogOut />
              Log out
            </Button>
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
