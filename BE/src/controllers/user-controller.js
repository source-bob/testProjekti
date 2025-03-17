import bcrypt from 'bcryptjs';
import { getAllUsers, findUserById, addUser, deleteUserById, editUser } from "../models/user-model.js";

import { customError } from '../middlewares/error-handler.js';

const checkLevel = async (user) => {
  if (user === 'regular') {
    return false;
  } else if (user === 'admin') {
    return true;
  }
};


const getUsers = async (req, res) => {
  const users = await getAllUsers();

  if (!users.error) {
    res.json(users);
  } else {
    res.status(500);
    res.json(users);
  }
};

const registerUser = async (req, res, next) => {
  
  try {
    const { username, password, email } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = { username, password: hashedPassword, email, user_level: 'regular' };

    const result = await addUser(newUser);

    res.status(201).json({ message: `User added. ID: ${result}` });
  } catch (e) {
    next(customError(e.message, 400));
  }
};


const newUser = async (req, res, next) => {
  const check = await checkLevel(req.user.user_level);

  if (check === false) {
    return next(customError('Forbidden'));
  }
  const { username, password, email, user_level } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = { username, password: hashedPassword, email, user_level };

    const result = await addUser(newUser);

    res.status(201).json({ message: `User added. ID: ${result}` });

  } catch (error) {
    next(customError(error.message, 400));
  }
};

const editUserByID = async (req, res, next) => {
  const id = req.params.id;
  const { username, password, email, user_level } = req.body;
  
  
  console.log('Change user by ID:', id);
  console.log('Request body:', req.body);

  try {
    let user = await findUserById(id);
    if (!user) {
      return next(customError(`User with ID ${id} not found`, 404));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await editUser(id, username, hashedPassword, email, user_level);
    console.log(`User ID ${id} data changed`, result);

    res.status(200).json({
      message: `Data changed for user ID ${id}`,
      new_data: { username, email },
    });
  } catch (e) {
    next(customError(e.message, 400));
  }
};

const getUserByID = async (req, res, next) => {
  console.log('getUserByID', req.params.id);
  
  try {
    const user = await findUserById(req.params.id)
    if (user) {
      res.json(user);
      console.log('user found:', user);
    } else {
      res.status(404).json({message: 'User not found, try another id'});
    }
  } catch (e) {
    next(customError(e.message, 400));
  }
};



const deleteUser = async (req, res, next) => {
  console.log('delete user by id', req.params.id);
  const id = req.params.id;
  const check = await checkLevel(req.user.user_level);
  
  if (check === false) {
    return next(customError('access denied'));
  }
  let user = await findUserById(id);

  try {
    if (user !== undefined) {
      const result = await deleteUserById(id);
      console.log(`user id ${id} deleted`, result);
  
      res.json({message: `user id ${id} deleted onnistui`});
      res.status(200);
    } else {
      return next(customError('user not found', 404));
    }
  } catch (e) {
    next(customError(e.message, 404));
  }
};

export { getUsers, getUserByID, newUser, deleteUser, editUserByID, registerUser};
