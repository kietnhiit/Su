import { Component } from "@angular/core";
import { UserService, TagService, PostService } from "../core/services";
import { Router } from "@angular/router";
import { RequestOptions } from "../core/entity/request-options.entity";


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent {
    isLoged = false;
    tags = [];
    posts = [];
    requestOpts = new RequestOptions('Global');
    currentPage = 1;
    totals = [];
    isLoading = false;
    tagName = '';
    constructor(
        private userService: UserService,
        private tagService: TagService,
        private postService: PostService,
        private route: Router
    ) {
        this.userService.logInEvent.subscribe(
            flag => {
                this.isLoged = false;
            }
        );
    }

    ngOnInit() {
        this.userService.isAuthenticated.subscribe(
            data => {
                if (data) {
                    this.isLoged = true;
                    this.requestOpts.type = 'Your';
                    this.getFeed(this.requestOpts);
                } else {
                    this.getFeed(this.requestOpts);
                }
            });

        this.getTags();
    }

    ngAfterViewInit() {

    }

    getTags() {
        this.tagService.getTags().subscribe(
            (res) => {
                this.tags = res.tags;
            }
        );
    }
    changeTab(flag) {
        this.reset();
        this.requestOpts.type = flag;
        if (!this.isLoged && this.requestOpts.type === 'Your') {
            this.route.navigateByUrl('/login');
            return;
        }
        this.getFeed(this.requestOpts);
    }

    tagClick(value) {
        this.reset();
        this.requestOpts.type = 'Tag';
        this.tagName = value;
        this.getFeed(this.requestOpts, this.tagName)
    }

    getFeed(requestOpts, tag?) {
        this.isLoading = true;
        this.postService.getFeed(requestOpts, tag).subscribe(
            (res) => {
                this.posts = res.articles;
                this.totals = Array.from(new Array(Math.ceil(res.articlesCount / this.requestOpts.limit)), (val, index) => index + 1);
                this.isLoading = false;
            },
            (err) => {
                this.isLoading = false;
            }
        );
    }

    goToPage(pageNumber) {
        this.isLoading = true;
        this.currentPage = pageNumber;
        this.requestOpts.offset = this.requestOpts.limit * (pageNumber - 1);
        this.getFeed(this.requestOpts, this.tagName)
    }

    onCLickFavorited(data) {
        if (!data) return;

        let index = this.posts.findIndex(e => e.slug === data.slug);
        this.posts[index] = data;
        this.posts = this.posts;
    }

    reset() {
        this.posts = [];
        this.totals = [];
        this.requestOpts.limit = 10;
        this.requestOpts.offset = 0;
        this.tagName = '';
        this.currentPage = 1;
    }
}