import { Component } from "@angular/core";
import { UserService, TagService, PostService } from "../core/services";
import { Router } from "@angular/router";


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent {

    typeFeed = 'Global';
    isLoged = false;
    tags = [];
    posts = [];
    limit = 10;
    offset = 0;
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
                    this.typeFeed = 'Your';
                    this.getFeed(this.typeFeed, this.limit, this.offset);
                } else {
                    this.getFeed(this.typeFeed, this.limit, this.offset);
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
        this.typeFeed = flag;
        if (!this.isLoged && this.typeFeed === 'Your') {
            this.route.navigateByUrl('/login');
            return;
        }
        this.getFeed(this.typeFeed, this.limit, this.offset);
    }

    tagClick(value) {
        this.reset();
        this.typeFeed = 'Tag';
        this.tagName = value;
        this.getFeed(this.typeFeed, this.limit, this.offset, this.tagName)
    }

    getFeed(type, limit, offset, tag?) {
        this.isLoading = true;
        let path = `articles?limit=${limit}&offset=${offset}`;
        if (type === 'Your') {
            path = `articles/feed?limit=${limit}&offset=${offset}`;
        }

        if (tag) path += '&tag=' + tag;
        this.postService.getFeed(path).subscribe(
            (res) => {
                this.posts = res.articles;
                this.totals = Array.from(new Array(Math.ceil(res.articlesCount / this.limit)), (val, index) => index + 1);
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
        this.offset = this.limit * (pageNumber - 1);
        this.getFeed(this.typeFeed, this.limit, this.offset, this.tagName)
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
        this.limit = 10;
        this.offset = 0;
        this.tagName = '';
    }
}