export const userService = {
    login
};

async function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };
    const response = await fetch('/auth/login', requestOptions).then(handleResponse)
}

async function handleResponse(response) {
    return response.json().then(json => {
        if (!(json.status === 200)) {
           const error = json.error;
           console.log("jes: "+error)
           return Promise.reject(error);
        }
        if (json.status === 200){
        window.location.href = '/fleet'
        }
        else {
               window.location.reload();
        }
     return json;
     });
}