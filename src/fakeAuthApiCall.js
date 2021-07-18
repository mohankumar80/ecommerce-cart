const UsersDB = [
    { username: "mohankumar80", password: "idontknow" },
    { username: "monkeydluffy", password: "pirateking" }
]

const findUserByUsername = username => {
    return UsersDB.find(user => user.username === username)
}

const fakeAuthApiCall = (username = "unauthorized", password = "whoknows") => {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const response = findUserByUsername(username);
            if(response &&  response.password === password) {
                resolve({ success: true, status: 200 })
            } reject({ success: false, status: 400 })
        }, 3000)
    })
}

export default fakeAuthApiCall;