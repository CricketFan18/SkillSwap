import User from "../models/User.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { createProfile } from "./profileServices.js";
import { generateToken } from "../utils/misc.js";

/*
 data should have {
 email ,
 password,
 username,
 branch,
 skills,
 bio (optional),
 profilePicURL (optional),
 }
*/

async function chechExistingUser(email, session) {
  const existingUser = await User.findOne({ email }).session(session);
  if (existingUser) {
    throw new Error("User with this email already exists");
  }
}

export async function registerUser(data) {
  const { email, password } = data;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    await chechExistingUser(email, session);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    const user = await newUser.save({ session });

    const profile = await createProfile(data, user._id, session);

    user.profileId = profile._id;
    await user.save({ session });
    await session.commitTransaction();

    const jwtToken = generateToken({
      userId: user._id,
      profileId: profile._id,
    });
    return { userId: user._id, profileId: profile._id, token: jwtToken };
  } catch (err) {
    await session.abortTransaction();
    console.log(err);
    throw err;
  } finally {
    session.endSession();
  }
}

export async function loginUser(email, password) {
  try {
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
  } catch (err) {
    console.log(err);
    throw err;
  }
}

//OAUTH
//forgot password

export async function logoutUser(userId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User does not exist");
    }
    user.lastLogin = new Date();
    await user.save();
    return { message: "User logged out successfully" };
  } catch (err) {
    console.log(err);
    throw err;
  }
}
