const SERVER_URL = 'http://127.0.0.1:8000'

async function login(user) {
    let response = await fetch(`${SERVER_URL}/user/login`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })

    let data = await response.json();
    return data;
}

function setCookie(name, value) {
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + "; path=/";
    document.cookie = updatedCookie;
}

async function submitLogin() {
    let user = {
        email: document.getElementById('email').value,
        password: document.getElementById('pw').value,
    }
    let result = await login(user);
    if (result.access_token) {
        setCookie('access_token', result.access_token);
        alert('로그인 완료');
    }
}