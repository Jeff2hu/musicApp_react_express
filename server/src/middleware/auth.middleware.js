export const protectMiddleware = async (req, res, next) => {
  const { userId } = req.auth;
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  next();
};

export const adminMiddleware = async (req, res, next) => {
  try {
    const { role } = req.auth;
    if (role !== "admin") {
      res.status(403).json({ message: "Permission denied" });
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
};
