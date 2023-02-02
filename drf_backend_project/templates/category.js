const SERVER_URL = 'http://127.0.0.1:8000'

async function getPosts() {
    let response = await fetch(`${SERVER_URL}/blog/category`);
    let data = response.json();
    return data;
}

async function insertPostList() {
    let posts = await getPosts()
    posts.forEach(post => {
        document.body.insertAdjacentHTML('afterBegin',`
        <ul id='${post.id}' onclick="showDetail()" class="list-group list-group-flush">
            <li class="list-group-item">
                <h1 id='id'>${post.id}</h1>
                <p id='name'>${post.name}</p>
                <button type="button" class="btn btn-warning" onclick="deleteArticle(${post.id})">Delete</button>
            </li>
        </ul> 
        `);
    })
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

async function postPost(post) {
    let token = getCookie('access_token');
    let response = await fetch(`${SERVER_URL}/blog/category`, {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        credentials: 'include',
    });
    let data = response.json();
    return data;
}

async function submitPost() {
    let name = document.getElementById('category_name');
    let data = {
        name: name.value,
    }
    let result = await postPost(data);
    console.log(result);
    location.reload();
}


