const SERVER_URL = 'http://127.0.0.1:8000'

async function register(user) {
    let response = await fetch(`${SERVER_URL}/user/register`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    let data = await response.json();
    return data;
}

async function submitRegister() {
    let user = {
        email: document.getElementById('email').value,
        password: document.getElementById('pw').value,
        fullname: document.getElementById('name').value,
    }

    let result = await register(user);
    alert('회원가입 완료');
    console.log(result);
}