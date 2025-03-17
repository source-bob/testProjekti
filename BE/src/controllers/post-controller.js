import {
  changePostById,
  listAllPosts,
  findEntryById,
  addNewPost,
  deletePostById,
  getUserPosts
} from "../models/post-model.js";
import { customError } from "../middlewares/error-handler.js";

const checkLevel = async (user) => {
  if (user === 'regular') {
    return false;
  } else if (user === 'admin') {
    return true;
  }
};

const getPosts = async (req, res, next) => {
  try {
    const posts = await listAllPosts();
    res.json(posts);
  } catch (e) {
    next(e);
  }
};

const getPostsById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const posts = await getUserPosts(id);
    if (!posts) {
      return res.status(400).json({ message: 'posts not found' });
    }
    return res.json(posts);
  } catch (e) {
    next(e);
  }
};

const deletePost = async (req, res, next) => {
  const id = req.params.id;
  console.log('delete entry by id', id);

  const check = await checkLevel(req.user.user_level);

  try {
    let entry = await findEntryById(id);
    if (!entry) {
      return res.status(400).json({ message: 'invalid id, entry not found' });
    }
    
    if (check === false) {
      if (entry.user_id !== req.user.user_id) {
        return res.status(403).json({message: 'Forbidden'});
      }
    }

    const result = await deletePostById(id);
    console.log(`post id ${id} deleted`, result);

    return res.status(200).json({ message: `post id ${id} deleted` });
  } catch (e) {
    next(e);
  }
};

const changePost = async (req, res, next) => {
  const entryId = req.params.id;
  try {
    let entry = await findEntryById(entryId);
    if (!entry) {
      return res.status(400).json({ message: 'invalid id, entry not found' });
    }
    
    const result = await changePostById(entryId, req.body);
    console.log(`entry id ${entryId} changed onnistui`);
    
    return res.status(200).json({ message: `entry id ${entryId} changed`, result });
  } catch (e) {
    next(e);
  }
};

const addPost = async (req, res, next) => {
  try {
    await addNewPost(req.body);
    res.status(201).json({message: "Post added."});
  } catch (e) {
    next(e);
  }
};

export { getPosts, addPost, deletePost, getPostsById, changePost };