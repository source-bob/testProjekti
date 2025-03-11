import '../css/style.css';
import '../css/admin.css';
import {fetchData} from './fetch.js';
import { addUser, getUsers, findUser, fillUserData } from './users.js';
import { getPosts } from './posts.js';
import { logout } from './auth.js';




const addNew = async () => {
    const dialog = document.querySelector('.info_dialog');
    dialog.querySelector('p').innerHTML = `
    <form class="addform">
        <label for="username">Username</label><br>
        <input
            id="username"
            type="text"
            name="username"
            placeholder="Uusi käyttäjä"
        /><br>
        <label for="password">Password</label><br>
        <input
            id="password"
            type="password"
            name="password"
            placeholder="salakala"
        /><br>
        <label for="email">Email</label><br>
        <input
            id="email"
            type="email"
            name="email"
            placeholder="newuser@example.com"
        /><br>
        <label for="user-level">User level</label><br>
        <input
            id="user-level"
            type="text"
            name="user-level"
            placeholder="(regular or admin)"
        /><br>
        <input
            name="submit"
            type="submit"
            value="Add User"
            class="formpost"
        />
    </form>
    `;
    dialog.showModal();
    const addUserForm = document.querySelector('.formpost');
    addUserForm.addEventListener('click', addUser);

    const closeButton = document.querySelector('.info_dialog button');
    // "Close" button closes the dialog
    closeButton.addEventListener('click', () => {
        dialog.close();
    });

};


const findUserById = async () => {
    const dialog = document.querySelector('.info_dialog');
    dialog.querySelector('p').innerHTML = `
    <form class="addform">
        <label for="user-id">User id</label><br>
        <input
            id="user-id"
            type="text"
            name="user-id"
            placeholder="user id"
        /><br>
        <input
            name="submit"
            type="submit"
            value="find"
            class="formpost"
        />
    </form>
    `;
    dialog.showModal();

    const addUserForm = document.querySelector('.formpost');
    addUserForm.addEventListener('click', async (event) => {
        event.preventDefault();
        
        console.log('start FINDING');
        await findUser();
    });

    const closeButton = document.querySelector('.info_dialog button');
    // "Close" button closes the dialog
    closeButton.addEventListener('click', () => {
        dialog.close();
    });
};





const createNewButton = document.getElementById('create-new');
createNewButton.addEventListener('click', addNew);

const refreshUsers = document.getElementById('get-all-users');
refreshUsers.addEventListener('click', async (event) => {
    getUsers();
});

const userSearch = document.getElementById('find-user');
userSearch.addEventListener('click', findUserById);

const getAllPosts = document.getElementById('get-all-posts');
getAllPosts.addEventListener('click', getPosts);

const logoutButton = document.querySelector('#logout');
logoutButton.addEventListener('click', logout);

getUsers();
getPosts();
await fillUserData();

