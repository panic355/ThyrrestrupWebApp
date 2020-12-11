export const userService = {
    login
};

async function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    console.log('Got here #3')
    
    const response = await fetch('/auth/login', requestOptions);
    const json = await response.json().then(handleResponse);
    /*
    fetch('/auth/login', requestOptions).then(response => {
        console.log("hellow"+response.status);
    });
    */
}


async function handleResponse(response) {
    console.log('Got here #5'+response.status)
       const error = response.error;
        if (!(response.status === 200)) {
            console.log('Got here #6: '+response.status)
            if (response.status === 401) {
                console.log('Got here #7: '+response.status)
                // auto logout if 401 response returned from api
               // window.location.reload();
            } 
            console.log(error)
             return error;
        }
        if (response.status === 200){
        window.location.href = '/fleet'
        console.log('Got here #8'+response.status)
        }
}