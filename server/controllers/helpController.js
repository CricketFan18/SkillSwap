import * as helpService from "../services/helpServices.js";

export async function createHelpPost(req, res) {
  const postedBy = req.profileId;
  const data = req.validatedData;
  const post = await helpService.createHelp(postedBy, data);
  res.status(201).json(post);
}

export async function updateHelpPost(req, res) {
  const postId = req.params.id;
  const data = req.validatedData;
  const post = await helpService.updateHelp(postId, data);
  res.status(200).json(post);
}

export async function getHelpPosts(req, res) {
  const { page, limit, ...filter } = req.query;
  const posts = await helpService.getLatestHelps(page, limit, filter);
  res.status(200).json(posts);
}

export async function getPostByID(req, res) {
  const postId = req.params.id;
  const post = await helpService.getHelpByID(postId);
  res.status(200).json(post);
}

export async function deleteHelpPost(req, res) {
  const postId = req.params.id;
  const post = await helpService.deleteHelp(postId);
  res.status(204).json(post);
}

export async function getAllPosts(req, res) {
  const filter = req.validatedData;
  const posts = await helpService.getAllHelps(filter);
  res.status(200).json(posts);
}
