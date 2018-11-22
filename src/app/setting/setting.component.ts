import { Component } from "@angular/core";
import { UserService, ErrorService } from "../core/services";
import { Router } from "@angular/router";
import { User } from "../core/entity";
import { UserModel } from "../core/models";


@Component({
    selector: 'app-setting',
    templateUrl: './setting.component.html'
})

export class SettingComponent {
    data: UserModel;
    isAdding = false;
    errors = [];
    constructor(
        private userService: UserService,
        private route: Router,
        private errorService: ErrorService
    ) {
        this.data = {
            bio: '',
            email: '',
            username: '',
            image: '',
            password: undefined
        }
    }
    ngOnInit() {
        this.userService.currentUser.subscribe(
            data => {
                Object.assign(this.data, data);
            });
    }
    ngAfterViewInit() {

    }

    logOut() {
        this.userService.logOut();
        this.route.navigateByUrl('/');
    }

    update() {
        this.isAdding = true;
        this.userService.update(this.data).subscribe(
            (res) => {
                this.isAdding = false;
                this.userService.currentUser.subscribe(
                    data => {
                        this.route.navigateByUrl('/profile/' + this.data.username)
                    });
            },
            (err) => {
                this.errors = this.errorService.handleError(err.error.errors);
                this.isAdding = false;
            }
        );
    }
}