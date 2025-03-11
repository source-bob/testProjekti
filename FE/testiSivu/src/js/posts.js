import { fetchData } from "./fetch";


const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('fi-FI', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit' 
    }).replace(',', ''); // Убираем запятую между датой и временем
};

const createPostBlock = (post) => {
    const userLevel = localStorage.getItem('user_level');
    const userId = localStorage.getItem('user_id');

    const postDiv = document.createElement('div');
    postDiv.className = 'post-div';
    
    
    const postTextBlock = document.createElement('div');
    postTextBlock.className = 'post-text';

    const postText = document.createElement('div');
    postText.id = 'post-text-block';
    postText.textContent = post.note;

    postTextBlock.appendChild(postText);

    const postButtons = document.createElement('div');
    postButtons.className = 'post-buttons';

    console.log('IDt', parseInt(userId), post.user_id);

    if (userLevel === 'admin' || post.user_id === parseInt(userId)) {
        
        const editPostButton = document.createElement('div');
        editPostButton.className = 'post-button';
        editPostButton.id = 'edit-post-button';
        editPostButton.textContent = 'edit';

        const postUserId = document.createElement('div');
        postUserId.className = 'post-button';

        const userIdHeader = document.createElement('div');
        userIdHeader.className = 'user-id-header';
        userIdHeader.textContent = 'uID:';


        const userIdValue = document.createElement('div');
        userIdValue.className = 'user-id-value';
        userIdValue.textContent = post.user_id;

        postUserId.appendChild(userIdHeader);
        postUserId.appendChild(userIdValue);

        const deletePostButton = document.createElement('div');
        deletePostButton.className = 'post-button';
        deletePostButton.id = 'delete-post-button';
        deletePostButton.textContent = 'delete';

        postButtons.appendChild(editPostButton);
        postButtons.appendChild(postUserId);
        postButtons.appendChild(deletePostButton);
    }

    const postInfo = document.createElement('div');
    postInfo.className = 'post-info';

    const addDate = document.createElement('div');
    addDate.textContent = formatDate(post.created_at);
    addDate.className = 'post-date';

    const postNumber = document.createElement('div');
    postNumber.className = 'post-number';

    const postNumberHeader = document.createElement('div');
    postNumberHeader.className = 'post-number-header';
    postNumberHeader.textContent = 'post #:';

    const postNumberValue = document.createElement('div');
    postNumberValue.className = 'post-number-value';
    postNumberValue.textContent = post.entry_id;

    postNumber.appendChild(postNumberHeader);
    postNumber.appendChild(postNumberValue);
    
    
    postDiv.appendChild(postTextBlock);
    postInfo.appendChild(addDate);
    postInfo.appendChild(postNumber);
    postDiv.appendChild(postButtons);
    postDiv.appendChild(postInfo);

    return postDiv;
};

const createMessage = async (message) => {
    
    const errorMessage = document.createElement('div');
    errorMessage.id = 'error-message-login';
    errorMessage.textContent = message;
    const errorCloseButton = document.createElement('div');
    errorCloseButton.id = 'error-close';
    errorCloseButton.textContent = 'ok';

    errorCloseButton.addEventListener('click', () => {
        errorMessage.style.display = 'none';
    });

    errorMessage.appendChild(errorCloseButton);
    return errorMessage;
};


const getPosts = async () => {

    const url = 'http://localhost:3000/api/posts';
    
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    };
    

    const posts = await fetchData(url, options);

    if (posts.error) {
        console.log('tapahtui virhe fetch haussa');
        return
    }

    console.log(posts);
    let tableBody;

    if (localStorage.getItem('user_level') === 'regular') {
        tableBody = document.querySelector('.tbody2');
    } else if (localStorage.getItem('user_level') === 'admin') {
        tableBody = document.getElementById('notes-window');
    }
    tableBody.innerHTML = ''; // tyhjennetään taulukko

    posts.forEach((post) => {
        const block = createPostBlock(post);
        
        tableBody.appendChild(block);
    });
    addPostEventListeners();
}

const getPostsById = async (id) => {
    const url = `http://localhost:3000/api/posts/${id}`;

    const options = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    };

    const response = await fetchData(url, options);

    if (response.error) {
        console.log(response.error);
        return
    }

    if (response.message) {
        console.log(response.message);
    }

    console.log('RESPONSE:', response);
    let tableBody;
    if (localStorage.getItem('user_level') === 'admin') {
        tableBody = document.getElementById('notes-window');
    } else if (localStorage.getItem('user_level') === 'regular') {
        tableBody = document.querySelector('.tbody2');
    }
    
    tableBody.innerHTML = '';
    response.forEach((post) => {
        const postBlock = createPostBlock(post);
        tableBody.appendChild(postBlock);
    });
};

const editPost = async (id, postText) => {
    const dialog = document.querySelector('.info_dialog');
        
    dialog.querySelector('p').innerHTML = `
    <form class="addform">
        <label for="post-edit-form-text">Edit note:</label><br>
        <textarea
            id="post-edit-form-text"
            name="post"
        >${postText}</textarea><br>
        <input
            name="submit"
            type="submit"
            value="save"
            class="formpost"
        />
    </form>
    `;

    const closeButton = document.querySelector('.info_dialog button');
        // "Close" button closes the dialog
        closeButton.addEventListener('click', () => {
            
            dialog.close();
        });


    dialog.showModal();

    const editPostForm = document.querySelector('.formpost');
    editPostForm.addEventListener('click', async (event) => {
        event.preventDefault();

        const note = document.querySelector('#post-edit-form-text').value.trim();
        

        // POST
        // content-type: application/json

        /*const bodyData = {
            username: 'uusi käyttäjä',
            password: 'uusipass',
            email: 'uusiemail@example.com',
        };*/

        const bodyData = {
            note: note
        };


        // url
        const url = `http://localhost:3000/api/posts/${id}`;

        // options eli mikä metodi, headers ja JSON
        const options = {
            body: JSON.stringify(bodyData),
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        };

        const response = await fetchData(url, options);

        if (response.error) {
            console.log(response.error);
            return
        }

        if (response.message) {
            console.log(response.message);
        }

        getPosts();


        
    });
};

const deletePost = async (id) => {
    const url = `http://localhost:3000/api/posts/${id}`;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    };
    const dialog = document.querySelector('.info_dialog');

    const closeButton = dialog.querySelector('button');
    closeButton.addEventListener('click', () => {
        dialog.close();
        getPosts(); // Обновляем список постов
    });
    try {
        const response = await fetchData(url, options);
        console.log(response);

        

        // Вставляем контент перед открытием диалога
        dialog.querySelector('p').innerHTML = `
            <div>Post ID: ${id} deleted</div>
        `;

        // Открываем модальное окно
        dialog.showModal();

        // Назначаем обработчик для кнопки закрытия
        

    } catch (error) {
        console.error('Ошибка при удалении поста:', error);
    }
};

const addPost = async () => {
    const dialog = document.querySelector('.info_dialog');
        
    dialog.querySelector('p').innerHTML = `
    <form class="addform">
        <label for="post-edit-form-text">New post:</label><br>
        <textarea
            id="post-edit-form-text"
            name="post"
            placeholder="put your text here"
        ></textarea><br>
        <input
            name="submit"
            type="submit"
            value="save"
            class="formpost"
        />
    </form>
    `;

    const closeButton = document.querySelector('.info_dialog button');
        // "Close" button closes the dialog
        closeButton.addEventListener('click', () => {
            
            dialog.close();
        });


    dialog.showModal();

    const createPostForm = document.querySelector('.formpost');
    createPostForm.addEventListener('click', async (event) => {
        event.preventDefault();

        const note = document.querySelector('#post-edit-form-text').value.trim();
        

        

        const bodyData = {
            user_id: localStorage.getItem('user_id'),
            note: note
        };


        // url
        const url = `http://localhost:3000/api/posts/`;

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
            console.log(response.error);
            return
        }

        if (response.message) {
            console.log(response.message);
        }

        getPosts();
        dialog.close();


        
    });
};

const addPostEventListeners = () => {
    
    document.querySelectorAll('.post-div').forEach((div) => {
        console.log(div);

        const postId = div.querySelector('.post-number-value').textContent.trim();
        const postText = div.querySelector('.post-text').textContent.trim();


        const postEditButton = div.querySelector('#edit-post-button');
        if (postEditButton) {
            postEditButton.addEventListener('click', () => editPost(postId, postText));
        };
        
        const postDeleteButton = div.querySelector('#delete-post-button');
        if (postDeleteButton) {
            postDeleteButton.addEventListener('click', () => deletePost(postId));
        };
        
        
    });
};

export { getPosts, getPostsById, addPost, createMessage };