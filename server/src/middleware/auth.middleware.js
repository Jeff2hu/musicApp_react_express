// import {
//   UnauthorizedError,
//   handleErrorResponse,
// } from "../utils/apiResponse.js";

export const protectMiddleware = async (req, res, next) => {
  // const { userId } = req.auth;
  // if (!userId) {
  //   return handleErrorResponse(res, new UnauthorizedError("Unauthorized"));
  // }
  next();
};

export const adminMiddleware = async (req, res, next) => {
  // const { role } = req.auth;
  // if (role !== "admin") {
  //   return handleErrorResponse(
  //     res,
  //     new UnauthorizedError("Permission denied"),
  //     403
  //   );
  // }
  next();
};
