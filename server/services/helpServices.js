import Help from "../models/Help.js";

/**
 * Creates a new Help Request
 * @param {ObjectId} postedBy ID of the help creator
 * @param {Object} data Object containing { title , description , category , [ -images ] , [ -tages ] }
 */
export async function createPost(postedBy, data) {
  const { title, description, category, images, tags } = data;
  const post = new Help({
    postedBy,
    title,
    description,
    category,
    images: images || [],
    tags: tags || [],
  });
  const savedPost = await post.save();
  return savedPost;
}

/**
 * Updates the original post
 * @param {ObjectId} postId ID of the post to be updated
 * @param {Object} data Object containing { title , description , category , [ -images ] , [ -tages ] }
 */
export async function updatePost(postId, data) {
  const updatedPost = Help.findByIdAndUpdate(postId, data, {
    new: true, // returns the updated document
    runValidators: true, // ensures schema validation
  });
  if (!profile) throw new Error("Profile not found");
  return updatedPost;
}

/**
 *
 * @param {Number} pageNo page no (1 based)
 * @param {Number} limit max posts per page
 */
export async function getLatestPosts(pageNo = 1, limit = 10) {
  const count = await Help.countDocuments();
  const totalPages = Math.ceil(count / limit);
  const skip = (pageNo - 1) * limit;
  const posts = await Help.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return {
    totalPosts: count,
    totalPages,
    currentPage: pageNo,
    data: posts,
  };
}

/**
 * Fetch latest posts filtered by category
 * @param {String} category - Category name
 * @param {Number} pageNo - Page number (1-based)
 * @param {Number} limit - Max posts per page
 */
export async function getLatestPostsByCategory(category, pageNo = 1, limit = 10) {
  const filter = { category };
  const count = await Help.countDocuments(filter);
  const totalPages = Math.ceil(count / limit);
  const skip = (pageNo - 1) * limit;

  const posts = await Help.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    
  return {
    totalPosts: count,
    totalPages,
    currentPage: pageNo,
    data: posts,
  };
}
