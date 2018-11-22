import { Component } from "@angular/core";
import { PostService, CommentService, UserService, ErrorService } from "../core/services";
import { Router, ActivatedRoute } from "@angular/router";
import { User } from "../core/entity";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";


@Component({
    selector: 'app-post',
    templateUrl: './post.component.html'
})

export class PostComponent {
    post: any;
    slug: string;
    comments: any;
    currentUser: User;
    commentData = '';
    isPosting = false;
    canModify = false;
    isDeleting = false;
    constructor(
        private postService: PostService,
        private commentService: CommentService,
        private userService: UserService,
        private route: Router,
        private activatedRoute: ActivatedRoute,
        private sanitizer: DomSanitizer
    ){
        this.post = {
            title: '',
            author: {
            },
            slug: '',
            createdAt: '',
            body: '',
            favoritesCount: '',
            tagList: []
        };
    }

    sanitizerHtmlFormat(htmlString): SafeHtml{
        return this.sanitizer.bypassSecurityTrustHtml(htmlString);
    }

    ngOnInit(){
        this.userService.currentUser.subscribe( data => this.currentUser = data);
        this.slug = this.activatedRoute.snapshot.paramMap.get('id');
        this.postService.getPostBySlug(this.slug).subscribe(
            (res) => {
                this.post = res.article;
                if (this.currentUser){
                    this.canModify = this.currentUser.username === this.post.author.username ? true : false;
                }
            },
            (err) => {
                this.route.navigateByUrl('/');
            }
        );

        this.getComments();
    }

    ngAfterViewInit() {
        
    }

    getComments() {
        this.commentService.getCommentBySlug(this.slug).subscribe(
            (res) => {
                this.comments = res.comments;
            }
        );
    }

    addComment() {
        this.isPosting = true;
        this.commentService.addComment(this.slug, this.commentData).subscribe(
            (res) => {
                this.comments.unshift(res.comment);
                this.commentData = '';
                this.isPosting = false;
            },
            (err) => {
                this.isPosting = false;
                console.log(err.error.errors.body[0]);
            }
        );
    }


    onDeleteComment(comment){
        this.commentService.deleteComment(this.slug, comment.id).subscribe(
            (res) => {
                this.comments = this.comments.filter((item) => item !== comment);
            },
            (err) => {
                console.log(err);
                
            }
        );
    }

    deletePost() {
        this.isDeleting = true;
        this.postService.deletePost(this.post.slug).subscribe(
            (res) => {
                this.isDeleting = false;
                this.route.navigateByUrl('/')
            },
            (err) => {
                console.log(err.error.errors);
                this.isDeleting = false;
            }
        );
    }

    onCLickFavorited(data) {
        if(!data) 
            return;
            
        this.post = data;
    }
    clickFollowing(data) {
        this.post.author = data;
    }
}