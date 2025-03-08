import { fetchData } from "./fetch";

const addUser = async (event) => {
    event.preventDefault();

    // haetaan formista oikea tieto mikä on täytetty

    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
    const email = document.querySelector('#email').value.trim();
    const userLevel = document.querySelector('#user-level').value.trim();

    // POST
    // content-type: application/json

    /*const bodyData = {
        username: 'uusi käyttäjä',
        password: 'uusipass',
        email: 'uusiemail@example.com',
    };*/

    const bodyData = {
        username: username,
        password: password,
        email: email,
        user_level: userLevel,
    };


    // url
    const url = 'http://localhost:3000/api/users';

    // options eli mikä metodi, headers ja JSON
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
        alert(response.message);
    }

    console.log(response);
    document.querySelector('.addform').reset(); // tyhjennetään formi
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

    const tableBody = document.querySelector('.tbody');
    tableBody.innerHTML = ''; // tyhjennetään taulukko

    users.forEach((user) => {
        const row = document.createElement('tr');
    
        row.innerHTML = `
          <td>${user.username}</td>
          <td>${user.email}</td>
          <td><button class="check" data-id="${user.user_id}">Info</button></td>
          <td><button class="del" data-id="${user.user_id}">Delete</button></td>
          <td>${user.user_id}</td>
        `;
    
        tableBody.appendChild(row);
        
        
    });

    // TODO
    addEventListeners();
};

export { addUser, getUsers };