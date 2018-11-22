import { Injectable } from "@angular/core";

@Injectable()
export class JWTService {
    
    getToken(): String {
        return window.localStorage['token'];
    }

    saveToken(token: String) {
        window.localStorage['token'] = token;
    }

    removeToken() {
        window.localStorage.removeItem('token');
    }
}