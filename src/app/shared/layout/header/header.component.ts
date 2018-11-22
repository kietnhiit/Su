import { Component } from "@angular/core";
import { UserService } from "src/app/core/services";
import { User } from "src/app/core/entity";
import { stringify } from "querystring";


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent {
    isLogin = false;
    user: User;
    constructor(
        private userService: UserService
    ){}

    ngOnInit() {
        this.userService.isAuthenticated.subscribe( data => this.isLogin = data);
        this.userService.currentUser.subscribe( data => this.user = data);
    }
    ngAfterViewInit() {
        this.userService.logInEvent.subscribe(
            data => {
                Object.assign(this.user, data);
            }
        );
    }
}