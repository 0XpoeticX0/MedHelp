import config from "../config/index.js";
import status from "http-status";
import { jwtHelpers } from "../utils/jwtHelpers.js";
import AppError from "./AppError.js";

const auth = (...roles) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new AppError(status.UNAUTHORIZED, "You are not authorized!");
      }

      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.access_token_secret
      );

      req.user = verifiedUser;

      // console.log(verifiedUser);
      // console.log(roles);

      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new AppError(status.FORBIDDEN, "Forbidden!");
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
