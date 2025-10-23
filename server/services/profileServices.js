import mongoose from "mongoose";
import Profile from "../models/Profile.js";

export async function createProfile(userId, email) {
  const rollNumber = parseInt(email.split("@")[0], 10);
  const batch = parseInt(email.substring(0, 2), 10) + 2000;
  const profile = new Profile({
    userId,
    rollNumber,
    batch,
  });
  await profile.save();
  return profile;
}

/**
 *
 * @param {String} profileId - ID of the profile to be updated
 * @param {Object} updateData  - Object {
 * displayName: String,
 * profilePicURL: String,
 * bio: String,
 * skills: [String],
 * }
 * @returns {Object} - Updated profile object
 */
export async function updateProfile(profileId, updatedData) {
  const profile = await Profile.findByIdAndUpdate(profileId, updatedData, {
    new: true,
    runValidators: true,
  });
  if (!profile) throw new Error("Profile not found");
  return profile;
}

export async function deleteProfile(profileId) {
  const profile = await Profile.findByIdAndDelete(profileId);
  if (!profile) throw new Error("Profile not found");
  return profile;
}

export async function getProfileById(profileId) {
  const profile = await Profile.findById(profileId);
  if (!profile) throw new Error("Profile not found");
  return profile;
}

export async function addSkill(profileId, newSkills) {
  const profile = await Profile.findById(profileId);
  if (!profile) throw new Error("Profile not found");
  profile.skills = profile.skills || [];
  newSkills.forEach((newSkill) => {
    if (!profile.skills.includes(newSkill)) profile.skills.push(newSkill);
  });
  await profile.save();
  return profile;
}

export async function removeSkill(profileId, oldSkills) {
  const profile = await Profile.findById(profileId);
  if (!profile) throw new Error("Profile not found");
  profile.skills = profile.skills.filter((skill) => !oldSkills.includes(skill));
  await profile.save();
  return profile;
}
