import { Component } from "@angular/core";
import { PostService } from "../core/services/post.services";
import { Post } from "../core/entity";
import { ErrorService } from "../core/services";
import { Router, ActivatedRoute } from "@angular/router";


@Component({
    selector: 'app-newpost',
    templateUrl: './newpost.component.html'
})

export class NewpostComponent {
    post: Post;
    tagList: string;
    errors = [];
    isAdding = false;
    slugId = '';
    isUpdate = false;
    constructor(
        private postService: PostService,
        private errorService: ErrorService,
        private route: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.post = {
            title: '',
            description: '',
            body: '',
            tagList: []
        };
    }
    ngOnInit() {
        this.slugId = this.activatedRoute.snapshot.paramMap.get('id');
        if (this.slugId) {
            this.isUpdate = true;
            this.getPost();
        }

    }
    getPost() {
        this.postService.getPostBySlug(this.slugId).subscribe(
            (res) => {
                Object.assign(this.post, res.article);
                this.tagList = this.post.tagList.reverse().join(',');
            },
            (err) => {
                console.log(err.error.errors);

            }
        );
    }

    addPost() {
        this.isAdding = true;
        this.beforeSave();
        this.postService.addPost(this.post).subscribe(
            (res) => {
                this.afterSave();
                this.route.navigateByUrl('/');
            },
            (err) => {
                this.errors = this.errorService.handleError(err.error.errors);
                this.isAdding = false;
            }
        );
    }
    updatePost() {
        this.isAdding = true;
        this.postService.updatePost(this.slugId, this.post).subscribe(
            (res) => {
                this.isAdding = false;
                this.route.navigateByUrl('/post/' + this.slugId);
            },
            (err) => {
                this.isAdding = false;
                this.errors = this.errorService.handleError(err.error.errors);

            }
        );
    }

    beforeSave() {
        if (this.tagList) {
            this.post.tagList = this.tagList.split(',');
        }
    }
    afterSave() {
        this.isAdding = false;
        this.post = {
            title: '',
            description: '',
            body: '',
            tagList: []
        };
    }
}