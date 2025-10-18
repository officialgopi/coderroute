import dotenv from "dotenv";
import { ApiError, ApiResponse, AsyncHandler } from "../../utils";
import { liveblocks } from "../../libs/liveblocks.lib";
dotenv.config();

const createSessionForUserUsingLiveblocks = AsyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new ApiError(401, "Unauthorized");
  }

  // Create a session for the current user
  const session = liveblocks.prepareSession(user.id.toString(), {
    userInfo: {
      name: user.name,
      picture:
        user.avatar ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          user.name
        )}&background=random`,
      color: "#" + Math.floor(Math.random() * 16777215).toString(16),
    },
  });

  // Allow access to all rooms for this user
  session.allow("*", session.FULL_ACCESS);

  // Authorize the user and return the result
  const { body, status } = await session.authorize();
  if (status !== 200) {
    throw new ApiError(status, "Authentication failed");
  }
  new ApiResponse(
    status,
    {
      body,
    },
    "Session created successfully"
  ).send(res);
});

export { createSessionForUserUsingLiveblocks };
