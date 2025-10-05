import jwt from "jsonwebtoken";

const generatedAccessToken = async (userId) => {
  const token = await jwt.sign(
    { id: userId },
    process.env.JSON_WEB_TOKEN_SECRET_KEY,
    { expiresIn: "5h" }
  );

  return token;
};

export default generatedAccessToken;
