import promisePool from '../utils/database.js';

const mistake = (e) => {
  console.error(e);
  return e;
};

const changePostById = async (id, entry) => {
  const note = entry.note;
  const sql = `UPDATE posts
                SET note = "${note}"
                WHERE entry_id = ${id}`;
    
    try {
        const newNote = await promisePool.query(sql);
        return { new_note: newNote };
    } catch (e) {
        throw mistake(e);
    }
};

const listAllPosts = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM posts');
    return rows;
  } catch (e) {
    throw mistake(e);
  }
};

const findEntryById = async (id) => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM posts WHERE entry_id = ?', [id]);
    return rows[0];
  } catch (e) {
    throw mistake(e);
  }
};

const addNewPost = async (entry) => {
  const { user_id, note } = entry;
  const sql = `INSERT INTO posts (user_id, note)
               VALUES (?, ?)`;
  const params = [user_id, note];
  try {
    const rows = await promisePool.query(sql, params);
    return { entry_id: rows[0].insertId };
  } catch (e) {
    throw mistake(e);
  }
};

const deletePostById = async (id) => {
  const sql = `DELETE FROM posts
              WHERE entry_id = ${id}`;
  try {
      const [response] = await promisePool.query(sql);
      return { entry_deleted: response };
  } catch (e) {
    throw mistake(e);
  }
};

const getUserPosts = async (userId) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM posts WHERE user_id=?',
      [userId],
    );

    return rows;
  } catch (e) {
    throw mistake(e);
  }
};

export { listAllPosts, findEntryById, addNewPost, deletePostById, getUserPosts, changePostById };