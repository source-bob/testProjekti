import '../css/style.css';
import '../css/regular.css'
import {fetchData} from './fetch.js';
import { getPosts, addPost, getPostsById } from './posts.js';
import { editUserById, fillUserData } from './users.js';
import { logout } from './auth.js';

getPosts();
await fillUserData();
const userId = localStorage.getItem('user_id');

const editOwnInfo = document.querySelector('#edit-own-info');
editOwnInfo.addEventListener('click', async () => {
    console.log('button clicked');
    await editInfo(userId);
    
});

const createNewPost = document.querySelector('#create-post');
createNewPost.addEventListener('click', async () => {
    console.log('button 2 clicked');
    await addPost();
});

const findOwnPosts = document.querySelector('#find-own-posts');
findOwnPosts.addEventListener('click', async () => {
    console.log('button 3 clicked');
    await getPostsById(userId);
});

const allPosts = document.querySelector('#show-all-posts');
allPosts.addEventListener('click', getPosts);

const logoutButton = document.querySelector('#logout');
logoutButton.addEventListener('click', async () => {
    console.log('logout');
    await logout();
});

const editInfo = async (id, next) => {
    
    try {
        const response = await editUserById(id);
        return response;
    } catch (e) {
        next(e);
    }
};