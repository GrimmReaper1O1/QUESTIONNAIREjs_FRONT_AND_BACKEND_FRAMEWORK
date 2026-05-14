let uri = 'https://localhost:3000/api/auth/signout';
let options = {
    credentials: 'include', 
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({id: localStorage.getItem('id')})
};
fetch(uri, options).then(async data => {
    if (data.status === 200) {
        location.href = './';
        localStorage.removeItem('loginTimeRunout');
        localStorage.removeItem('id');
        location.href = 'https://localhost';
    }
    location.href = 'https://localhost';
}).catch(err => {
    console.log(err);
    localStorage.removeItem('loginTimeRunout');
    localStorage.removeItem('id');
    location.href = 'https://localhost';
})

