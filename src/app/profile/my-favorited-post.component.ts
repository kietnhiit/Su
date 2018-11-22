import { Component, Input } from "@angular/core";
import { UserService } from "../core/services";
import { User } from "../core/entity";
import { Router, ActivatedRoute } from "@angular/router";
import { PostService } from "../core/services/post.services";


@Component({
    selector: 'app-profile-mypost',
    templateUrl: './my-post.component.html'
})

export class MyFavoritedPostComponent {
    posts = [];
    username: string;
    isLoading = true;
    constructor(
        private route: Router,
        private postService: PostService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.activatedRoute.parent.params.subscribe(
            (data) => {
                this.username = data.username;
            }
        );
        this.getPosts();

    }

    getPosts() {
        this.postService.getMyFavoritePosts(this.username).subscribe(
            (res) => {
                this.isLoading = false;
                this.posts = res.articles;
            },
            (err) => {
                this.isLoading = false;
                console.log(err);
            }
        );
    }

    onCLickFavorited(data) {
        if (!data) return;

        let index = this.posts.findIndex(e => e.slug === data.slug);
        this.posts[index] = data;

        if (index > -1) {
            this.posts.splice(index, 1);
        }
        this.posts = this.posts;
    }

    ngAfterViewInit() {

    }
}