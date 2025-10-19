import Profile from "../models/Profile.js";

export async function createProfile(userId) {
  const profile = new Profile({
    userId,
  });
  await profile.save();
  return profile;
}


export async function updateProfile(profileId, updateData) {
  try {
    const profile = await Profile.findByIdAndUpdate(profileId, updateData, {
      new: true,
      runValidators: true,
    });
    if (!profile) throw new Error("Profile not found");
    return profile;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function deleteProfile(profileId) {
  try {
    const profile = await Profile.findByIdAndDelete(profileId);
    if (!profile) throw new Error("Profile not found");
    return profile;
  } catch (err) {
    console.log(err);
    throw err;
  }
}


export async function getProfileById(profileId) {
  try {
    const profile = await Profile.findById(profileId);
    if (!profile) {
      throw new Error("Profile not found");
    }
    return profile;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function addSkill(profileId, skill) {
  try {
    const profile = await Profile.findById(profileId);
    if (!profile) throw new Error("Profile not found");
    profile.skills = profile.skills || [];
    if (!profile.skills.includes(skill)) {
      profile.skills.push(skill);
      await profile.save();
    }
    return profile;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function removeSkill(profileId, skill) {
  try {
    const profile = await Profile.findById(profileId);
    if (!profile) throw new Error("Profile not found");
    profile.skills = (profile.skills || []).filter((s) => s !== skill);
    await profile.save();
    return profile;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
