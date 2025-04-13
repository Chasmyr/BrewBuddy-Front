const regexEmailFormat = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
const regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

//Check email input match email format
//If so, return exception
export function checkEmailConstraints(email: string) {
    return regexEmailFormat.test(email)
}

//Check if password respect security policy
//If so, return exception
export function checkPasswordConstraints(password: string) {
    return regexPassword.test(password)
}