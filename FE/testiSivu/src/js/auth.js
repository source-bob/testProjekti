import '../css/style.css';
import '../css/login.css';
import { fetchData } from './fetch.js';
import { createMessage } from './posts.js';

const loginUser = async (event) => {
    event.preventDefault();

    // Haetaan oikea formi
    const loginForm = document.querySelector('.loginForm');

    // Haetaan formista arvot
    const username = loginForm.querySelector('#username2').value.trim();
    const password = loginForm.querySelector('#password2').value.trim();

    // Luodaan body lähetystä varten taustapalvelun vaatimaan muotoon
    const bodyData = {
        username: username,
        password: password,
    };

    // Endpoint
    const url = 'http://localhost:3000/api/auth/login';

    // Options
    const options = {
        body: JSON.stringify(bodyData),
        method: 'POST',
        headers: {
        'Content-type': 'application/json',
        },
    };
    console.log(options);
    console.log('MOOOOOI');
    // Hae data
    const response = await fetchData(url, options);

    if (response.error) {
        console.error('error login', response.error);
        

        const mainBlock = document.querySelector('.app');
        const message = await createMessage(response.error);

        mainBlock.appendChild(message);

        return;
    }

    if (response.message) {
        console.log(response.message, 'success');
        localStorage.setItem('token', response.token);
        localStorage.setItem('nimi', response.user.username);
        localStorage.setItem('user_id', response.user.user_id);
        localStorage.setItem('user_level', response.user.user_level);
        localStorage.setItem('email', response.user.email);
    }

    console.log(response);
    const userLevel = localStorage.getItem('user_level');
    if (userLevel === 'admin') {
        window.location.href = 'admin.html';
    } else if (userLevel === 'regular') {
        window.location.href = 'regular.html';
    }
    loginForm.reset(); // tyhjennetään formi
    
};

const logout = async () => {
    window.location.href = 'login.html';
    localStorage.clear();
};




export { logout, loginUser };