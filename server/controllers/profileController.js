import * as profileService from "../services/profileServices.js";

export async function updateProfile(req, res) {
  const profileId = req.profileId;
  const updateData = req.validatedData;
  const updatedProfile = await profileService.updateProfile(
    profileId,
    updateData
  );
  res.status(200).json(updatedProfile);
}

export async function deleteProfile(req, res) {
  const profileId = req.profileId;
  await profileService.deleteProfile(profileId);
  res.status(200).json({ message: "Profile deleted successfully" });
}

export async function getProfile(req, res) {
  const queryId = req.params.id;
  const profile = await profileService.getProfileById(queryId);
  res.status(200).json(profile);
}

export async function addSkill(req, res) {
  const profileId = req.profileId;
  const { skills } = req.validatedData;
  const updatedProfile = await profileService.addSkill(profileId, skills);
  res.status(200).json(updatedProfile);
}

export async function removeSkill(req, res) {
  const profileId = req.profileId;
  const { skills } = req.validatedData;
  const updatedProfile = await profileService.removeSkill(profileId, skills);
  res.status(200).json(updatedProfile);
}
