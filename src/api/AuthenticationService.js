import axios from "axios";

class AuthenticationService {
    executeJWTAuthenticationService(userName, userPassword) {
        return axios.post(`http://localhost:8080/auth/login?userName=${userName}&userPassword=${userPassword}`, {userName, userPassword});
    }
    
    registerSuccessfulLogin(username, token) {
        sessionStorage.setItem("authenticatedUser", token);
        this.setupAxiosInterceptor(this.createJWTToken(token));
    }

    logout() {
        sessionStorage.removeItem("authenticatedUser");
        return axios.get("http://localhost:8080/auth/logout");
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem("authenticatedUser");
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