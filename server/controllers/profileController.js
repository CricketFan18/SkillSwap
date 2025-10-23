import * as profileService from "../services/profileServices.js";
import { handleValidationError } from "../utils/misc.js";
import { profileSchema } from "../validators/profileSchema.js";

export async function updateProfile(req, res) {
  const safeData = profileSchema.safeParse(req.body);
  handleValidationError(safeData);
  const profileId = res.profileId;
  const updateData = safeData.data;
  const updatedProfile = await profileService.updateProfile(
    profileId,
    updateData
  );
  res.status(200).json(updatedProfile);
}

export async function deleteProfile(req, res) {
  const profileId = res.profileId;
  await profileService.deleteProfile(profileId);
  res.status(200).json({ message: "Profile deleted successfully" });
}

export async function getProfileById(req, res) {
  const queryId = req.params.id;
  const profile = await profileService.getProfileById(queryId);
  res.status(200).json(profile);
}

export async function addSkill(req, res) {
  const safeData = profileSchema.pick({ skills: true }).safeParse(req.body);
  handleValidationError(safeData);
  const profileId = res.profileId;
  const { skills } = safeData.data;
  const updatedProfile = await profileService.addSkill(profileId, skills);
  res.status(200).json(updatedProfile);
}

export async function removeSkill(req, res) {
  const safeData = profileSchema.pick({ skills: true }).safeParse(req.body);
  handleValidationError(safeData);
  const profileId = res.profileId;
  const { skills } = safeData.data;
  const updatedProfile = await profileService.removeSkill(profileId, skills);
  res.status(200).json(updatedProfile);
}
