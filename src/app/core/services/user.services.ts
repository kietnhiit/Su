import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, ReplaySubject, BehaviorSubject } from 'rxjs';
import { HttpService } from './http.services';
import { LoginModel } from '../models/login.model';
import { map } from 'rxjs/operators';
import { JWTService } from './jwt.services';
import { User } from '../entity';



@Injectable()
export class UserService {

    private currentUserSubject = new BehaviorSubject<any>({} as any);
    public currentUser = this.currentUserSubject.asObservable();

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    @Output()
    logInEvent: EventEmitter<any> = new EventEmitter();

    constructor(
        private http: HttpService,
        private jwtService: JWTService
    ) { }



    init() {
        if (this.jwtService.getToken()) {
            this.http.get('user').subscribe(
                res => {
                    this.setAuth(res.user);
                },
                err => {
                    this.removeAuth();
                }
            );
        } else {
            this.removeAuth();
        }
    }

    setAuth(user) {
        this.jwtService.saveToken(user.token);
        this.currentUserSubject.next(user)
        this.isAuthenticatedSubject.next(true);
    }

    removeAuth() {
        this.jwtService.removeToken();
        this.currentUserSubject.next({})
        this.isAuthenticatedSubject.next(false);
    }

    login(path, loginModel: LoginModel) {
        return this.http.post('users/' + path,
            {
                user: {
                    password: loginModel.password,
                    email: loginModel.email,
                    username: loginModel.name
                }
            }
        ).pipe(map(
            data => {
                this.setAuth(data.user);
                this.logInEvent.emit(true);
            }
        ));
    }


    logOut() {
        this.jwtService.removeToken();
        this.removeAuth();
        this.logInEvent.emit(false);
    }



    update(data: any): Observable<any> {
        return this.http
            .put('user', { user: data })
            .pipe(
                map(data => {
                    this.currentUserSubject.next(data);
                    this.logInEvent.emit(data.user);
                    return data;
                }));
    }

    getProfile(username) {
        return this.http.get('profiles/' + username)
    }

    getUser() {
        return this.currentUserSubject.value;
    }

    follow(username: string) {
        return this.http.post('/profiles/' + username + '/follow');
    }

    unfollow(username: string) {
        return this.http.delete('/profiles/' + username + '/follow');
    }
}
