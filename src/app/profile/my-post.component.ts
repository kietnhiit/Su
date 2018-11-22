import { Component } from "@angular/core";
import { UserService } from "../core/services";
import { User } from "../core/entity";
import { Router, ActivatedRoute } from "@angular/router";
import { PostService } from "../core/services/post.services";


@Component({
    selector: 'app-profile-mypost',
    templateUrl: './my-post.component.html'
})

export class MyPostComponent {
    posts = [];
    user: User;
    isLoading = true;
    constructor(
        private route: Router,
        private postService: PostService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.userService.currentUser.subscribe(data => this.user = data);
        let username = this.activatedRoute.snapshot.paramMap.get('username');
        this.getPost(username);
    }

    getPost(username) {
        this.postService.getMyPost(username).subscribe(
            (res) => {
                this.isLoading = false;
                this.posts = res.articles;
            },
            (err) => {
                console.log(err);

            }
        );
    }

    onCLickFavorited(data) {
        if (!data) return;

        let index = this.posts.findIndex(e => e.slug === data.slug);
        this.posts[index] = data;
        this.posts = this.posts;
    }

    ngAfterViewInit() {

    }
}