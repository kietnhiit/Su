import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { LoginModel } from '../core/models/login.model'
import { UserService } from "../core/services/user.services";
import { ErrorService } from "../core/services";
import { User } from "../core/entity";

@Component({
    selector: 'app-auth',
    templateUrl: './login.component.html',
    providers: [ErrorService]
})

export class LoginComponent implements OnInit {
    title = 'Sign up';
    question = 'Have an account?';
    type = 'register';
    errors = [];

    loginModel = new LoginModel();

    constructor(
        private router: Router,
        private activeRoute: ActivatedRoute,
        private userService: UserService,
        private errorService: ErrorService
    ) { }


    ngOnInit() {

        this.userService.isAuthenticated.subscribe(
            data => {
                if (data) {
                    this.router.navigateByUrl('/');
                }
            }
        );

        this.activeRoute.url.subscribe(
            (data) => {
                if (data[0].path === 'login') {
                    this.title = 'Sign in';
                    this.question = 'Need an account?';
                    this.type = 'login';
                }
            }
        );
    }

    ngAfterViewInit() {

    }

    login() {
        // if path = login : sign in else path = '' : register
        let path = 'login';
        if (this.loginModel.name) {
            path = '';
        }
        this.userService.login(path, this.loginModel).subscribe(
            (res) => {
                this.router.navigate(['/']);
            },
            (err) => {
                this.errors = this.errorService.handleError(err.error.errors);
            }
        );
    }
}