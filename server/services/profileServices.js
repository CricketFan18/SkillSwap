import Profile from "../models/Profile.js";

export async function createProfile(data, userId, session) {
  const { username, email, branch, skills, bio, profilePicURL } = data;
  
  const rollNumber = parseInt(email.split("@")[0], 10);
  const batch = parseInt(email.substring(0, 2), 10) + 2000;

  try {
    const profile = new Profile({
      userId,
      rollNumber,
      displayName: username,
      branch,
      batch,
      skills,
      bio: bio || "",
      profilePicURL: profilePicURL || null,
    });
    await profile.save({session});
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
