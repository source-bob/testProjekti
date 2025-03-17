import '../css/regular.css'
import '../css/style.css';
import {fetchData} from './fetch.js';
import { getPosts, addPost, getPostsById } from './posts.js';
import { editUserById, fillUserData } from './users.js';
import { logout } from './auth.js';

const tbody = document.querySelector('.tbody');

tbody.addEventListener('scroll', () => {
    const scrollTop = tbody.scrollTop;
    tbody.style.backgroundPosition = `center ${-scrollTop}px`;
});


getPosts();
await fillUserData();
const userId = localStorage.getItem('user_id');

const editOwnInfo = document.querySelector('#edit-own-info');
editOwnInfo.addEventListener('click', async () => {
    try {
        console.log('button clicked');
        const response = await editInfo(userId); // Дожидаемся завершения редактирования
        console.log('editInfo response:', response);
        if (response) { // Теперь response не undefined!
            console.log('Logging out...');
            await logout();
        }
    } catch (error) {
        console.error('Error during editInfo:', error);
    }
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

const editInfo = async (id) => {
    try {
        const response = await editUserById(id);
        console.log('EDIT INFO RESPONSE', response);
        return response;
    } catch (e) {
        console.error('Error in editInfo:', e);
        return null; // Возвращаем значение в случае ошибки
    }
};
