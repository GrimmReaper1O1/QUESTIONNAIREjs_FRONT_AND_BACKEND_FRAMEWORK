let enterInfo = (e) => {
    e.preventDefault();
    let jsonStringEl = document.getElementById('jsonText');
    let jsonString = jsonStringEl.value;
    jsonString = jsonString.replace('\n', '');
    let jsonStringObj = JSON.parse(jsonString);
    jsonStringObj.creator = localStorage.getItem('id');
    jsonStringObj.creator2 = jsonStringObj.creator;
    jsonStringObj.links = JSON.stringify(jsonStringObj.links);
    console.log(jsonStringObj);
    jsonString = JSON.stringify(jsonStringObj);
    console.log(jsonString);
    if (jsonString.length > 5) {
 
    let URI = 'http://localhost:5000/api/auth/questions/inputSubject';
    let options = {method: 'PUT', headers: {'Content-Type': 'application/json'}, body: jsonString};


    fetch(URI, options).then(async response =>  {
        console.log(response);
        let result = await response.body.json
        console.log(result);
    }).catch(error => {
        console.log(error);
    });
} else {
    console.log('not long enough');
}
};