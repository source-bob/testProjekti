import { fetchData } from "./fetch";
import { getPostsById, createMessage } from "./posts.js";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('fi-FI', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit' 
    }).replace(',', '');
};

const fillUserData = async () => {
    const username = localStorage.getItem('nimi');
    const userId = localStorage.getItem('user_id');
    const email = localStorage.getItem('email');
    const level = localStorage.getItem('user_level');

    const userInfo = document.createElement('div');
    userInfo.id = 'user-main-info';
    userInfo.innerHTML = `
        <div class="user-info-part">
            <div class="info-part-header">user ID:</div>
            <div class="info-part-value">${userId}</div>
        </div>
        <div class="user-info-part">
            <div class="info-part-header">uname:</div>
            <div class="info-part-value">${username}</div>
        </div>
        <div class="user-info-part">
            <div class="info-part-header">email:</div>
            <div class="info-part-value">${email}</div>
        </div>
        <div class="user-info-part">
            <div class="info-part-header">status:</div>
            <div class="info-part-value">${level}</div>
        </div>
    `
    
    const userInfoDiv = document.querySelector('#user-info-block');
    userInfoDiv.appendChild(userInfo);
};

const addUser = async (event) => {
    event.preventDefault();

    let username, password, email, userLevel;
    try {
        username = document.querySelector('#username').value.trim();
        password = document.querySelector('#password').value.trim();
        email = document.querySelector('#email').value.trim();
        userLevel = document.querySelector('#user-level').value.trim();
    } catch (e) {
        return e.message;
    }

    const bodyData = {
        username: username,
        password: password,
        email: email,
        user_level: userLevel,
    };


    const url = 'http://localhost:3000/api/users';

    const options = {
        body: JSON.stringify(bodyData),
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    };


    const response = await fetchData(url, options);

    if (response.error) {
        console.log('tapahtui virhe fetch haussa');
        console.log(response.error)
        return
    }

    if (response.message) {
        const messageText = 'user created';
        const mainBlock = document.querySelector('.app');
        const message = await createMessage(messageText);
        mainBlock.appendChild(message);
    }

    console.log(response);
    document.querySelector('.addform').reset();
    getUsers();
};

const registerUser = async () => { // event не нужен, так как он не используется
    let username, password, email, userLevel;

    username = document.querySelector('#username').value.trim();
    password = document.querySelector('#password').value.trim();
    email = document.querySelector('#email').value.trim();
    userLevel = 'regular';

    const bodyData = {
        username: username,
        password: password,
        email: email,
        user_level: userLevel,
    };

    const url = 'http://localhost:3000/api/auth/register';

    const options = {
        body: JSON.stringify(bodyData),
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
    };

    const response = await fetchData(url, options);

    if (response.error) {
        console.log('tapahtui virhe fetch haussa');
        console.log(response.error);
        const messageText = 'bad username/password(min: 8)/email';
        const mainBlock = document.querySelector('.app');
        const message = await createMessage(messageText);

        mainBlock.appendChild(message);
        return response; // Возвращаем response, даже если ошибка
    }

    if (response.message) {
        const messageText = 'user created';
        const mainBlock = document.querySelector('.app');
        const message = await createMessage(messageText);
        mainBlock.appendChild(message);
    }

    console.log(response);
    return response; // Добавляем return, чтобы вернуть ответ
};

const findUser = async () => {
    const token = localStorage.getItem('token');

    const userId = document.querySelector('#user-id').value.trim();

    const url = `http://localhost:3000/api/users/${userId}`;

    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    const user = await fetchData(url, options);

    if (user.error) {
        console.log('tapahtui virhe fetch haussa');
        return
    }

    console.log(user);
    const tableBody = document.querySelector('#users-window');
    tableBody.innerHTML = '';

    const row = createUserBlock(user);

    tableBody.appendChild(row);
    addEventListeners();
};

const createUserBlock = (user) => {
    const row = document.createElement('div');
    row.className = 'user-div';

    const userInfo = document.createElement('div');
    userInfo.className = 'user-info-div';

    const userNameDiv = document.createElement('div');
    userNameDiv.className = 'username-div';

    const userNameValue = document.createElement('div');
    userNameValue.id = 'user-name-value';
    
    userNameValue.textContent = user.username;

    userNameDiv.appendChild(userNameValue);

    const userIdDiv = document.createElement('div');
    userIdDiv.className = 'user-id-div';
    userIdDiv.id = 'user-id-div';
    userIdDiv.textContent = user.user_id;

    const buttonsRivi = document.createElement('div');
    buttonsRivi.className = 'button-rivi';

    const buttonsRivi2 = document.createElement('div');
    buttonsRivi2.className = 'button-rivi';

    const infoButton = document.createElement('button');
    infoButton.className = 'user-button';
    infoButton.textContent = 'info';
    infoButton.id = 'user-info-button';

    const editButton = document.createElement('button');
    editButton.className = 'user-button';
    editButton.textContent = 'edit';
    editButton.id = 'user-edit-button';

    const deleteButton = document.createElement('button');
    deleteButton.className = 'user-button';
    deleteButton.textContent = 'delete';
    deleteButton.id = 'user-delete-button';

    const postsButton = document.createElement('button');
    postsButton.className = 'user-button';
    postsButton.textContent = 'posts';
    postsButton.id = 'user-posts-button';

    buttonsRivi.appendChild(infoButton);
    buttonsRivi.appendChild(editButton);

    buttonsRivi2.appendChild(postsButton);
    buttonsRivi2.appendChild(deleteButton);
    


    const userButtons = document.createElement('div');
    userButtons.className = 'user-buttons-div';

    userButtons.appendChild(buttonsRivi);
    userButtons.appendChild(buttonsRivi2);
    
    userInfo.appendChild(userNameDiv);
    userInfo.appendChild(userIdDiv);

    row.appendChild(userInfo);
    row.appendChild(userButtons);

    return row;
};

const getUsers = async () => {

    const url = 'http://localhost:3000/api/users';
    

    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    };

    const users = await fetchData(url, options);

    if (users.error) {
        console.log('tapahtui virhe fetch haussa');
        return
    }

    console.log(users);

    const tableBody = document.querySelector('#users-window');
    tableBody.innerHTML = ''; // tyhjennetään taulukko

    users.forEach((user) => {
        const userBlock = createUserBlock(user);
    
        tableBody.appendChild(userBlock);
        
        
    });

    // TODO
    addEventListeners();
};

const showUserInfo = async (id) => {
    const dialog = document.querySelector('.info_dialog');
    dialog.showModal();

    const options = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    };
;
    const url = `http://localhost:3000/api/users/${id}`;

    const response = await fetchData(url, options);

    if (response.error) {
        console.log('tapahtui virhe fetch haussa');
        console.log(response.error)
        return
    }

    if (response.message) {
        console.log(response.message);
    }

    dialog.querySelector('p').innerHTML = `
    <div>username: ${response.username}</div>
    <div>user id: ${response.user_id}</div>
    <div>user email: ${response.email}</div>
    <div>user level: ${response.user_level}</div>
    <div>registered: ${formatDate(response.registered_at)}</div>
    `


    const closeButton = document.querySelector('.info_dialog button');
    // "Close" button closes the dialog
    closeButton.addEventListener('click', () => {
        dialog.close();
    });
};

const deleteUser = async (id) => {
    const url = `http://localhost:3000/api/users/${id}`;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    };

    
    const response = await fetchData(url, options);
    
    console.log(response);

    const dialog = document.querySelector('.info_dialog');
    dialog.showModal();
    dialog.querySelector('p').innerHTML = `
    <div>user id: ${id} deleted</div>
    `

    const closeButton = document.querySelector('.info_dialog button');
    // "Close" button closes the dialog
    closeButton.addEventListener('click', () => {
        dialog.close();
        getUsers();
    });
};

const editUserById = (id) => {
    return new Promise((resolve, reject) => { // Создаём промис
        const userLvl = localStorage.getItem('user_level');
        const dialog = document.querySelector('.info_dialog');

        const closeButton = document.querySelector('.info_dialog button');
        closeButton.addEventListener('click', () => {
            dialog.close();
            reject('Dialog closed without submitting');
        });

        dialog.querySelector('p').innerHTML = `
        <form class="addform">
            <label for="username">Username</label><br>
            <input id="username" type="text" name="username" placeholder="uusi käyttäjä"/><br>
            <label for="password">Password</label><br>
            <input id="password" type="password" name="password" placeholder="password"/><br>
            <label for="email">email</label><br>
            <input id="email" type="email" name="email" placeholder="newuser@example.com"/><br>
            <label for="user-level">User level</label><br>
            <input id="user-level" type="text" name="user-level" placeholder="(regular or admin)"/><br>
            <input name="submit" type="submit" value="save" class="formpost"/>
        </form>
        `;

        let userLevel;
        if (userLvl === 'regular') {
            const hideBlock = dialog.querySelector('#user-level');
            hideBlock.style.display = 'none';
            const label = document.querySelector('label[for="user-level"]');
            label.style.display = 'none';
            userLevel = 'regular';
        }

        dialog.showModal();

        const editUserForm = document.querySelector('.addform');
        editUserForm.addEventListener('submit', async (event) => { // Теперь обрабатываем submit
            event.preventDefault();

            const username = document.querySelector('#username').value.trim();
            const password = document.querySelector('#password').value.trim();
            const email = document.querySelector('#email').value.trim();
            if (userLvl === 'admin') {
                userLevel = document.querySelector('#user-level').value.trim();
            }

            const bodyData = { username, password, email, user_level: userLevel };
            const url = `http://localhost:3000/api/users/${id}`;

            const options = {
                body: JSON.stringify(bodyData),
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };

            try {
                const response = await fetchData(url, options);
                console.log('RESPONSE', response);
                
                if (response.error) {
                    console.log(response.error);
                    reject(response.error);
                } else {
                    if (userLvl === 'admin') {
                        getUsers();
                    }
                    resolve(response);
                }
            } catch (error) {
                console.error('Error in editUserById:', error);
                reject(error);
            }
        });
    });
};


       

        

        
    

const addEventListeners = () => {
    
	document.querySelectorAll('.user-div').forEach((div) => {
		console.log(div);

        const userId = div.querySelector('#user-id-div').textContent.trim();

        console.log('ID', userId);

        const userInfoButton = div.querySelector('#user-info-button');
        userInfoButton.addEventListener('click', () => showUserInfo(userId));

        const userDeleteButton = div.querySelector('#user-delete-button');
        userDeleteButton.addEventListener('click', () => deleteUser(userId));

        const userEditButton = div.querySelector('#user-edit-button');
        userEditButton.addEventListener('click', () => editUserById(userId));

        const userPostsButton = div.querySelector('#user-posts-button');
        userPostsButton.addEventListener('click', () => getPostsById(userId));
	});
};



export { addUser, getUsers, findUser, editUserById, registerUser, fillUserData };