// Note: db functions are async and must be called with await from the controller
// How to handle errors in controller?
import promisePool from '../utils/database.js';

const changePostById = async (id, entry) => {
  const note = entry.note;
  const sql = `UPDATE posts
                SET note = "${note}"
                WHERE entry_id = ${id}`;
    
    try {
        const newNote = await promisePool.query(sql);
        return {new_note: newNote};
    } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
    }
};

const listAllPosts = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM posts');
    console.log('rows', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const findEntryById = async (id) => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM posts WHERE entry_id = ?', [id]);
    console.log('rows', rows);
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const addNewPost = async (entry) => {
  const { user_id, note } = entry;
  const sql = `INSERT INTO posts (user_id, note)
               VALUES (?, ?)`;
  const params = [user_id, note];
  try {
    const rows = await promisePool.query(sql, params);
    console.log('rows', rows);
    return {entry_id: rows[0].insertId};
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

/*const updateNote = async (id, note) => {
    const sql = `UPDATE diaryentries
                SET notes = '${note}'
                WHERE entry_id = ${id}`;
    
    try {
        const newNote = await promisePool.query(sql);
        return {new_note: newNote};
    } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
    }
};*/

const deletePostById = async (id) => {
    const sql = `DELETE FROM posts
                WHERE entry_id = ${id}`;
    try {
        const response = await promisePool.query(sql);
        return {entry_deleted: response};
    } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
    }
};

const getUserPosts = async (userId) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM posts WHERE user_id=?',
      [userId],
    );
    console.log(rows);
    return rows;
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

export { listAllPosts, findEntryById, addNewPost, deletePostById, getUserPosts, changePostById };