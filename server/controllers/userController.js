import * as userService from "../services/userServices.js";
import { generateIdCookie, clearIdCookie } from "../utils/misc.js";
import { userSchema } from "../validators/userSchema.js";

export async function addUser(req, res) {
  const safeData = await userSchema.safeParse(req.body);
  if (!safeData.success) {
    throw new Error(safeData.error.issues[0].message);
  }
  const result = await userService.registerUser(safeData.data);
  generateIdCookie(result.token, res);
  res.status(201).json({ success: true, message: "User Created Succesfully" });
}

export async function login(req, res) {
  const safeData = await userSchema.safeParse(req.body);
   if (!safeData.success) {
    throw new Error(safeData.error.issues[0].message);
  }
  const { email, password } = safeData.data;
  const result = await userService.loginUser(email, password);
  generateIdCookie(result.token, res);
  res
    .status(200)
    .json({ success: true, message: "User Logged In Succesfully" });
}

export async function logout(req, res) {
  clearIdCookie(res);
  await userService.logoutUser(req.user.userId);
  res
    .status(200)
    .json({ success: true, message: "User Logged Out Succesfully" });
}
