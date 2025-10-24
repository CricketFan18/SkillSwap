import * as helpService from "../services/helpServices.js";

export async function createHelpPost(req, res) {
  const postedBy = req.profileId;
  const data = req.validatedData;
  const post = await helpService.createHelp(postedBy, data);
  res.status(201).json(post);
}

export async function updateHelpPost(req, res) {
  const { postId, data } = req.validatedData;
  const post = await helpService.updateHelp(postId, data);
  res.status(200).json(post);
}