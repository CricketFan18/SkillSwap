import * as userService from "../services/userServices.js";
import { generateIdCookie, clearIdCookie } from "../utils/misc.js";
export async function addUser(req, res) {
  const data = req.validatedData;
  const result = await userService.registerUser(data);
  generateIdCookie(result.token, res);
  res.status(201).json({ success: true, message: "User Created Succesfully" });
}

export async function login(req, res) {
  const { email, password } = req.validatedData;
  const result = await userService.loginUser(email, password);
  generateIdCookie(result.token, res);
  res
    .status(200)
    .json({ success: true, message: "User Logged In Succesfully" });
}

export async function logout(req, res) {
  clearIdCookie(res);
  await userService.logoutUser(req.userId);
  res
    .status(200)
    .json({ success: true, message: "User Logged Out Succesfully" });
}
