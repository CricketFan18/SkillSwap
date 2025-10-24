import Help from "../models/Help.js";

/**
 * Creates a new Help Request
 * @param {ObjectId} postedBy ID of the help creator
 * @param {Object} data Object containing { title , description , category , [ -images ] , [ -tages ] }
 * @returns {Promise<Object>} The created help post
 */
export async function createHelp(postedBy, data) {
  const { title, description, category, images, tags } = data;
  const help = new Help({
    postedBy,
    title,
    description,
    category,
    images: images || [],
    tags: tags || [],
  });
  const savedHelp = await help.save();
  return savedHelp;
}

/**
 * Updates the original help post
 * @param {ObjectId} postId ID of the help post to be updated
 * @param {Object} data Object containing { title , description , category , [ -images ] , [ -tages ] }
 * @returns {Promise<Object>} The updated help post.
 */
export async function updateHelp(postId, data) {
  const updatedPost = Help.findByIdAndUpdate(postId, data, {
    new: true,
    runValidators: true,
  });
  if (!profile) throw new Error("Profile not found");
  return updatedPost;
}

/**
 * Fetches the latest help posts or filtered posts if filter provided
 * @param {Number} pageNo page no (1 based)
 * @param {Number} limit max help posts per page
 * @param {Object} filter find documents using this filter
 * @returns {Promise<Object>} The limit number of help posts ( default 10)
 */
export async function getLatestHelps(pageNo = 1, limit = 10, filter = {}) {
  const count = await Help.countDocuments();
  const totalPages = Math.ceil(count / limit);
  const skip = (pageNo - 1) * limit;
  const posts = await Help.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("postedBy", "displayName avatar branch batch");

  return {
    totalPosts: count,
    totalPages,
    currentPage: pageNo,
    data: posts,
  };
}

/**
 * Get help post by ID
 * @param {ObjectId} postId id of the help post
 * @returns {Promise<Object>} complete help post details
 */
export async function getHelpByID(postId) {
  const post = await Help.findById(postId);
  if (!post) throw new Error("Post does not exist!");
  return post;
}

/**
 * @param {ObjectId} postId id of the help post
 */
export async function deleteHelp(postId) {
  const post = Help.findByIdAndDelete(postId);
  if (!post) throw new Error("Post does not exist!");
  return post;
}

/**
 * for admin control
 */
export async function getAllHelps() {
  const data = await Help.find()
    .sort({ createdAt: -1 })
    .populate("postedBy", "name avatar branch batch");
}
