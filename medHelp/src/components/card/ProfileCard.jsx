/* eslint-disable react/prop-types */
import { Card, Tag, Descriptions, Space, Avatar } from "antd";
import {
  User,
  Stethoscope,
  Shield,
  Mail,
  Phone,
  Home,
  Lock,
  CheckCircle,
} from "lucide-react";
import React from "react";

const roleConfig = {
  admin: {
    color: "#ff4d4f",
    gradient: "linear-gradient(135deg, #ff4d4f 0%, #ff7875 100%)",
    icon: <Shield />,
  },
  patient: {
    color: "#1890ff",
    gradient: "linear-gradient(135deg, #1890ff 0%, #69c0ff 100%)",
    icon: <User />,
  },
  volunteer: {
    color: "#52c41a",
    gradient: "linear-gradient(135deg, #52c41a 0%, #95de64 100%)",
    icon: <Stethoscope />,
  },
};

const ProfileCard = ({ user }) => {
  const config = roleConfig[user.role] || roleConfig.patient;

  return (
    <Card
      style={{
        // width: 380,
        height: "100%",
        // margin: "16px",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        border: "none",
      }}
      cover={
        <div
          style={{
            height: "120px",
            background: config.gradient,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar
            size={80}
            icon={React.cloneElement(config.icon, {
              size: 40,
              color: "white",
            })}
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              border: "3px solid white",
            }}
          />
          <Tag
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              borderRadius: "12px",
              padding: "2px 8px",
            }}
            color={config.color}
          >
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </Tag>
        </div>
      }
    >
      <div style={{ padding: "16px 0" }}>
        <Space direction="vertical" size="middle">
          <div className="flex flex-col justify-center text-center">
            <h3 style={{ margin: "0", color: "#1a1a1a", fontSize: "20px" }}>
              {user.name}
            </h3>
            <div className="flex justify-center">
              <Tag
                icon={
                  user.status ? <Lock size={14} /> : <CheckCircle size={14} />
                }
                color={user.status ? "error" : "success"}
                style={{
                  marginTop: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  width: "fit-content",
                }}
              >
                {user.status ? "Blocked" : "Active"}
              </Tag>
            </div>
          </div>

          <Descriptions
            column={1}
            size="small"
            styles={{ width: "100px", color: "#595959" }}
            style={{ color: "#1a1a1a" }}
          >
            <Descriptions.Item
              label={
                <Space>
                  <Mail size={16} color={config.color} />
                  Email
                </Space>
              }
            >
              {user.email}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <Space>
                  <Phone size={16} color={config.color} />
                  Phone
                </Space>
              }
            >
              {user.phone}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <Space>
                  <Home size={16} color={config.color} />
                  Address
                </Space>
              }
            >
              {typeof user.address === "object"
                ? `${user.address.street}, ${user.address.city}`
                : user.address}
            </Descriptions.Item>
          </Descriptions>
        </Space>
      </div>
    </Card>
  );
};

export default ProfileCard;
