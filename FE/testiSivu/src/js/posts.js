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
        const postDiv = document.createElement('div');
        postDiv.className = 'post-div';
        
        
        const postText = document.createElement('div');
        postText.textContent = post.note;
        postText.className = 'post-text';

        const postInfo = document.createElement('div');
        postInfo.className = 'post-info';

        const addDate = document.createElement('span');
        addDate.textContent = formatDate(post.created_at);
        addDate.className = 'post-date';

        const postNumber = document.createElement('span');
        postNumber.textContent = `post number: ${post.entry_id}`;
        postNumber.className = 'post-number';
        
        
        postDiv.appendChild(postText)
        postInfo.appendChild(addDate);
        postInfo.appendChild(postNumber);
        postDiv.appendChild(postInfo);
        

        
    
        tableBody.appendChild(postDiv);
        
        
    });
}

export { getPosts };