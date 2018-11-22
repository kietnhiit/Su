import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Post } from "src/app/core/entity";
import { PostService, UserService } from "src/app/core/services";
import { Router } from "@angular/router";

@Component({
    selector: 'app-favorite-button',
    templateUrl: './favorite.component.html'
})
export class FavoriteComponent {
    isFavoriting = false;
    @Input() post: any;
    @Output() onclick: EventEmitter<any> = new EventEmitter();

    constructor(
        private postService: PostService,
        private userService: UserService,
        private route: Router
    ){}
    ngOnInit() {

    }

    onClickFavorite() {

        this.userService.isAuthenticated.subscribe(
            (res) => {
                if (res) {
                    let $service;
                    if (!this.post.favorited) {
                        $service = this.postService.favorite(this.post.slug);
                    } else {
                        $service = this.postService.unfavorite(this.post.slug);
                    }
                    this.isFavoriting = true;
                    $service.subscribe(
                        (res) => {
                            this.isFavoriting = false;
                            this.onclick.emit(res.article);
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