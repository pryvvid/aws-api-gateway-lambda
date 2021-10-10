import { generatePolicy } from "../utils/generatePolicy";
import { handleErrorResponse } from "../utils/handleErrorResponse";

export const basicAuthorizer = async (event) => {
  console.log("Event", JSON.stringify(event));

  if (event.type !== "TOKEN") {
    return handleErrorResponse(401);
  }

  try {
    const { authorizationToken, methodArn } = event;

    const [_tokenType, encodedCreds] = authorizationToken.split(" ");
    const buff = Buffer.from(encodedCreds, "base64");
    const plainCreds = buff.toString("utf-8");
    const [username, password] = plainCreds.split(":");

    console.log(`username: ${username} password: ${password}`);

    const storedUserPassword = process.env[username];
    const effect =
      !storedUserPassword || storedUserPassword !== password ? "Deny" : "Allow";

    return generatePolicy(encodedCreds, methodArn, effect);
  } catch (error) {
    console.log(error);
    handleErrorResponse(401);
  }
};
