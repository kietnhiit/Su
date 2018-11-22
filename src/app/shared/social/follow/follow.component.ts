import { Component, Input, Output, EventEmitter } from "@angular/core";
import { UserService } from "src/app/core/services";
import { Router } from "@angular/router";

@Component({
    selector: 'app-follow-button',
    templateUrl: './follow.component.html'
})
export class FollowComponent {
    isFollowing = false;
    @Input() user: any;
    @Output() clickFollow: EventEmitter<any> = new EventEmitter();

    constructor(
        private userService: UserService,
        private route: Router
    ){}
    ngOnInit() {

    }

    onClickFollowing() {
        this.userService.isAuthenticated.subscribe(
            (res) => {
                if (res) {
                    let $service;
                    if (!this.user.following) {
                        $service = this.userService.follow(this.user.username);
                    } else {
                        $service = this.userService.unfollow(this.user.username);
                    }
                    this.isFollowing = true;
                    $service.subscribe(
                        (res) => {
                            this.isFollowing = false;
                            this.clickFollow.emit(res.profile);
                        },
                        (err) => {
                            this.route.navigateByUrl('/');
                        }
                    );
                } else {
                    this.route.navigateByUrl('/login');
                }
            }
        );
    }
}