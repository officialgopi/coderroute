import { db } from "../../../../db";
import { ApiResponse, AsyncHandler } from "../../../utils";

const getProblemFormat = AsyncHandler(async (req, res) => {
  const problem = await db.problem.findMany({
    include: {
      problemDetails: true,
      testcases: true,
    },
  });
  return new ApiResponse(200, { problem }).send(res);
});

export { getProblemFormat };
