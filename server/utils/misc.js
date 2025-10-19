import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function generateToken(payload) {
  const token = jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: "7d",
  });
  return token;
}

export function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_KEY);
}

export function generateIdCookie(token, res) {
  res.cookie("id", token, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
}
export function clearIdCookie(res) {
  res.clearCookie("id", {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
}
