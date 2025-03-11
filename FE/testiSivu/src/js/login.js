import { loginUser } from "./auth";
import { addUser, registerUser } from "./users";



const loginBlock = document.querySelector('.login-form-div');

const makeLoginButtons = () => {
    loginBlock.innerHTML = '';
    const loginButton = document.createElement('div');
    loginButton.className = 'login-buttons';
    loginButton.textContent = 'login';

    const signButton = document.createElement('div');
    signButton.className = 'login-buttons';
    signButton.textContent = 'sign in';

    loginButton.addEventListener('click', makeLoginBlock);
    signButton.addEventListener('click', makeSignBlock);

    loginBlock.appendChild(loginButton);
    loginBlock.appendChild(signButton);
};

const makeLoginBlock = () => {
    loginBlock.innerHTML = `
    <form class="loginForm">
        <label for="username2">Username</label>
        <br>
        <input type="text" id="username2" name="username2" placeholder="username" required />
        <br>
        <label for="password2">Password</label>
        <br>
        <input
            type="password"
            id="password2"
            name="password2"
            placeholder="min 8 symb."
            required
        />
        <br>
        <input
            name="submit"
            id="submitButton"
            type="submit"
            value="Login and get new token"
        /><br>
        <button id="close-button">push me</button>
    </form>`;
    const logUser = loginBlock.querySelector('#submitButton');
    logUser.addEventListener('click', loginUser);

    const closeButton = loginBlock.querySelector('#close-button');
    closeButton.addEventListener('click', makeLoginButtons);
    
};
const makeSignBlock = () => {
    loginBlock.innerHTML = `
    <form class="signForm">
        <label for="username">Username</label>
        <br>
        <input type="text" id="username" name="username2" placeholder="username" required/>
        <br>
        <label for="password">Password</label>
        <br>
        <input
            type="password"
            id="password"
            name="password"
            placeholder="min 8 symb."
            required
        /><br>
        <label for="email">email</label>
        <br>
        <input
            type="text"
            id="email"
            name="email"
            placeholder="username@example.com"
            required
        /><br>
        <input
            name="submit"
            id="submitButton"
            type="submit"
            value="Login and get new token"
        /><br>
        <button id="close-button">push me</button>
    </form>`;

    const closeButton = loginBlock.querySelector('#close-button');
    closeButton.addEventListener('click', makeLoginButtons);

    const addNewUser = loginBlock.querySelector('#submitButton');
    addNewUser.addEventListener('click', async (event) => {
        event.preventDefault();
        try {
            const response = await registerUser();
            console.log(response);
        } catch (e) {
            console.log(e.message);
        }
        
    });
};

makeLoginButtons();

