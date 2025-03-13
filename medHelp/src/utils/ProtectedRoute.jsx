import { Navigate, Outlet } from "react-router";
import { getUserFromToken } from "./auth";
import PropTypes from "prop-types";

const ProtectedRoute = ({ role }) => {
  const user = getUserFromToken();

  return user.role === role ? <Outlet /> : <Navigate to="/" />;
};
ProtectedRoute.propTypes = {
  role: PropTypes.string.isRequired,
};

export default ProtectedRoute;
