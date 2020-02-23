import ApiService from "./ApiService"

const RESOURCE = '/users/'
const RESOURCE_LOGIN = '/login/'
const RESOURCE_LOGOUT = '/logout/'

export default {    
    login( userName, password ) {
        const body = {
            "username": userName, 
            "password": password
        }
       
        return ApiService.post(RESOURCE_LOGIN, body)               
    },
    logout() {
        return ApiService.post(RESOURCE_LOGOUT)
    },
    createUser( firstName, lastName, email, userName, password ) {
        const body = {
            "first_name": firstName,
            "last_name": lastName, 
            "email": email, 
            "username": userName, 
            "password": password
        }
       
        return ApiService.post(RESOURCE, body)               
    }
}