import axios from "axios";

class AuthenticationService {
    serverAddress = "https://tw-yk.website:81/";
    testAddress = "http://localhost:8080/";
    AdminUser = "twyk";

    executeJWTAuthenticationService(userName, userPassword) {
        return axios.post( this.serverAddress + `auth/login?userName=${userName}&userPassword=${userPassword}` )
    }
    
    registerSuccessfulLogin(username, token) {
        sessionStorage.setItem(username, token);
        this.setupAxiosInterceptor(this.createJWTToken(token));
    }

    logout() {
        sessionStorage.removeItem(this.AdminUser);
        return axios.get( this.serverAddress + "auth/logout");
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(this.AdminUser);
        if(user === null) {
            return false;
        } else {
            return true;
        }
    }

    createJWTToken(token) {
        return "Bearer " + token;
    }

    setupAxiosInterceptor(token) {
        axios.interceptors.request.use(
            config => {
                config.headers.Authorization = token;
                return config;
            }
        )
    }
}

export default new AuthenticationService();