import Profile from "../models/Profile.js";

/**
 * Creates a new profile for a user.
 * @param {ObjectId} userId - The ID of the user for whom the profile is being created.
 * @param {String} email - The user's email address (used to extract roll number and batch).
 * @returns {Promise<Object>} The newly created profile document.
 */
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
 * Updates an existing profile by ID.
 * @param {String} profileId - ID of the profile to be updated
 * @param {Promise<Object>} updateData  - Object {
 * displayName: String,
 * avatar: String,
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

/**
 * Deletes a profile by ID.
 * @param {String} profileId - ID of the profile to delete.
 * @returns {Promise<Object>} The deleted profile document.
 */
export async function deleteProfile(profileId) {
  const profile = await Profile.findByIdAndDelete(profileId);
  if (!profile) throw new Error("Profile not found");
  return profile;
}

/**
 * Retrieves a profile by ID.
 * @param {String} profileId - ID of the profile to fetch.
 * @returns {Promise<Object>} The found profile document.
 */
export async function getProfileById(profileId) {
  const profile = await Profile.findById(profileId);
  if (!profile) throw new Error("Profile not found");
  return profile;
}

/**
 * Adds one or more skills to a user's profile.
 * @param {String} profileId - ID of the profile to update.
 * @param {String[]} newSkills - Array of new skills to add.
 * @returns {Promise<Object>} The updated profile document.
 */
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

/**
 * Removes one or more skills from a user's profile.
 * @param {String} profileId - ID of the profile to update.
 * @param {String[]} oldSkills - Array of skills to remove.
 * @returns {Promise<Object>} The updated profile document.
 */
export async function removeSkill(profileId, oldSkills) {
  const profile = await Profile.findById(profileId);
  if (!profile) throw new Error("Profile not found");
  profile.skills = profile.skills.filter((skill) => !oldSkills.includes(skill));
  await profile.save();
  return profile;
}
