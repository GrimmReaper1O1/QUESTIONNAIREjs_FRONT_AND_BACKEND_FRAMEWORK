const fetchIt =  (option, object = '') => {
    
    
    let uri, options;
    
    object = {method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(object)};
    switch (option) {
        case 'category':
            uri = `https://localhost:5000/api/flashCards/insertCategory`;
            
            break;
            case 'send':
                uri = `https://localhost:5000/api/flashCards/insertFlashCards`;
                break;
                default:
                    uri = `https://localhost:5000/api/flashCards/getFlashCardsViaSubject`;
                    object.method = 'POST';
                    break;
                    
                };
                try {
                    fetch(uri, options).then(async response => { 
                        if (response.ok) {      
                            let data = await response.json();
                            console.log(data);
                            if (option === 'categories') {
                                
                            } else if (option === 'send') {
                                
                            } else {
                                
                            }
                        } else {
                            throw new Error("The request couldn't go through!");
                        }
                    }).catch(error => {
                        console.log(error);
                    });
                    
                } catch (e) {
                    console.log(e);
                }
                console.log('not halted');
            }