const SERVER_URL = 'http://127.0.0.1:8000'

async function getPosts() {
    let response = await fetch(`${SERVER_URL}/blog/article`);
    let data = response.json();
    return data;
}

async function getPost(id) {
    let response = await fetch(`${SERVER_URL}/blog/article/${id}`);
    let data = response.json();
    return data;
}

async function getCategory() {
    let response = await fetch(`${SERVER_URL}/blog/category`);
    let data = response.json();
    return data;
}

async function insertPostList() {
    let posts = await getPosts()
    let ul = document.getElementById('posts');
    posts.forEach(post => {
        ul.insertAdjacentHTML('afterBegin',`
            <li onclick="returnid(${post.id})" class="list-group-item" data-bs-toggle="modal" data-bs-target="#detailModal" data-bs-whatever="@mdo")">
                <h1 id='title'>${post.title}</h1>
                <p id='content'>${post.content}</p>
            </li>
        `);
    })
}

async function returnid(id) {
    let body = document.getElementsByClassName('modal-body');
    
    let data = getPost(id);
    console.log(data);
    body.insertAdjacentHTML('afterBegin',`
            <h1 id="modal-title">${data.title}</h1>
            <input id="modal-content" value="${data.content}">
    `);
    

}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

async function postPost(post) {
    let token = getCookie('access_token');
    let response = await fetch(`${SERVER_URL}/blog/article`, {
        method: 'POST',
        body: post,
        headers: {
            'Authorization': `Bearer ${token}`,
          },
    });
    let data = response.json();
    return data;
}

async function submitPost() {
    let form = document.getElementById('writeform')
    console.log(form);
    let formData = new FormData(form);
    let result = await postPost(formData);
    console.log(result);
}

async function deletePost(id) {
    let token = getCookie('access_token');
    let response = await fetch(`${SERVER_URL}/blog/article/${id}`, {
        method: 'Delete',
        headers: {
            'Authorization': `Bearer ${token}`,
          },
    });
}

async function get_modifyArticle(id) {
    let title = document.getElementById('title');
    let content = document.getElementById('content');

    let response = await fetch(`${SERVER_URL}/blog/article/${id}`);
    let article = await response.json();
    

    title.value = article.title;
    content.value = article.content;

}

async function modifyArticle(article, id) { 
    let response = await fetch(`${SERVER_URL}/blog/article/${id}`, {
        method: 'PUT',
        body: JSON.stringify(article),
        headers: {
            'Content-type': 'application/json',
        },
    });
    let data = await response.json()
    return data;
}



