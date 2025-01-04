import User from "../model/user.model.js";
import { ServerError } from "../utils/apiResponse.js";

export const callbackService = async ({
  id,
  firstName,
  lastName,
  imageUrl,
}) => {
  try {
    const existingUser = await User.findOne({ clerkId: id });

    if (!existingUser) {
      const newUser = await User.create({
        clerkId: id,
        fullName: `${firstName} ${lastName}`,
        imageUrl,
      });

      return newUser;
    }

    return existingUser;
  } catch (err) {
    throw new ServerError(err.message);
  }
};
