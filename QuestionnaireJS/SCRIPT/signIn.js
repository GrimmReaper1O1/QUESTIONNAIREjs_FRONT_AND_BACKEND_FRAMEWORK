if (localStorage.getItem('id') !== null && localStorage.getItem('loginTimeRunout') !== null && localStorage.getItem('loginTimeRunout') > Date.now()) {
    location.href = './members.html';
} else {
    localStorage.removeItem('id');
    localStorage.removeItem('loginTimeRunout');
}

let signIn = (e) =>{
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let obj = {};
    obj.email = email;
    obj.password = password;
    let uri = 'https://localhost:5000/signin';
    let options = {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(obj),
    };
    fetch(uri, options).then(async data => {
        if (data.status === 200) {
            let info = await data.json();
               localStorage.setItem('loginTimeRunout', (Date.now()+60*60*1000))
                    localStorage.setItem('id', info.id);
                    setTimeout(()=>{
                    location.href = './main/members.html';
                    }, 50)
                 
                } else {
        // remember to add data.message to back-end
            document.getElementById('field').classList.add('hidden');
            let window = document.getElementById('displayMessage');
            window.classList.remove('hidden');
            let message = document.getElementById('message');
            message.textContent = 'Incorrect login details. You may be locked out after five incorrect attempts.';
            throw Error('401 error', data.status, data.error);
                }
    }).catch(err => {
        console.log(err);
    })

};

let hide = () => {
    document.getElementById('displayMessage').classList.add('hidden');
    document.getElementById('field').classList.remove('hidden');
    }
    document.querySelector('body').addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.keycode === 13) {
            event.preventDefault();
            signIn()
        }
    });