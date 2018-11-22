import { Component } from "@angular/core";
import { UserService } from "../core/services";
import { User } from "../core/entity";
import { Router, ActivatedRoute } from "@angular/router";


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html'
})

export class ProfileComponent {
    currentUser: User;
    isUser = false;
    user: any;
    username: string;

    constructor(
        private userService: UserService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.user = {
            image: '',
            bio: ''
        };
    }

    ngOnInit() {
        this.username = this.activatedRoute.snapshot.paramMap.get('username');
        if (!this.username) {
            this.router.navigateByUrl('/');
            return;
        }
        this.userService.currentUser.subscribe(data => this.currentUser = data);
        this.getProfile();
    }

    clickFollowing(data) {
        this.user = data;
    }

    getProfile() {
        this.userService.getProfile(this.username).subscribe(
            (res) => {
                this.user = res.profile;
                this.isUser = (this.currentUser.username === this.user.username)
            },
            (err) => {

            }
        );
    }

    ngAfterViewInit() {

    }
}