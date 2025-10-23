import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createProfile } from "./profileServices.js";
import { generateToken } from "../utils/misc.js";

async function chechExistingUser(email) {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }
}

/**
 * @param {Object} data - The user data containing email, password
 * @returns {Promise<Object>} - An object containing userId and JWT token
 */
export async function registerUser(data) {
  const { email, password } = data;
  await chechExistingUser(email);

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    email,
    password: hashedPassword,
  });

  const user = await newUser.save();
  const profile = await createProfile(user._id,email);
  user.profileId = profile._id;
  await user.save();

  const jwtToken = generateToken({
    userId: user._id,
    profileId: profile._id,
  });
  return { userId: user._id, profileId: profile._id, token: jwtToken };
}

/**
 * @param {String} email
 * @param {String} password
 * @returns {Promise<Object>} - An object containing userId, profileId, and token
 */

export async function loginUser(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User does not exist");
  }
  const hashedPassword = user.password;
  const match = await bcrypt.compare(password, hashedPassword);
  if (!match) {
    throw new Error("Password does not match");
  }
  const jwtToken = generateToken({
    userId: user._id,
    profileId: user.profileId,
  });
  return { userId: user._id, profileId: user.profileId, token: jwtToken };
}

//OAUTH
//forgot password

/**
 * @param {String} userId
 */
export async function logoutUser(userId) {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User does not exist");
  }
  user.lastLogin = new Date();
  await user.save();
  return;
}
