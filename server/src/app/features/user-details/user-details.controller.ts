import { db } from "../../../db";
import { ApiError, AsyncHandler } from "../../utils";

const getUserDetails = AsyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const userDetails = await db.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      avatar: true,
      authProvider: true,
      createdAt: true,
      updatedAt: true,
    },
  });
});

export { getUserDetails };
