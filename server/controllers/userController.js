import * as userService from "../services/userServices.js";
import { generateIdCookie, clearIdCookie } from "../utils/misc.js";

export async function addUser(req, res) {
  const data = req.body;
  try {
    const result = await userService.registerUser(data);
    generateIdCookie(result, res);
    res
      .status(201)
      .json({ success: true, message: "User Created Succesfully" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Something went wrong", err });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  try {
    const result = await userService.loginUser(email, password);
    generateIdCookie(result, res);
    res
      .status(200)
      .json({ success: true, message: "User Logged In Succesfully" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Something went wrong", err });
  }
}

export async function logout(req, res) {
  try {
    clearIdCookie(res);
    res
      .status(200)
      .json({ success: true, message: "User Logged Out Succesfully" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Something went wrong", err });
  }
}
