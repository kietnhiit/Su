import { Component, EventEmitter, Input, Output } from "@angular/core";
import { UserService } from "../core/services";
import { Subscription } from "rxjs";
import { User } from "../core/entity";

@Component({
    selector: 'app-post-comment',
    templateUrl: './post-comment.component.html'
})
export class PostCommentComponent {
    canDelete = false;
    currentUser: User;
    constructor(
        private userService: UserService
    ) { }

    @Input() comment: any;
    @Output() deleteComment = new EventEmitter<boolean>();


    ngOnInit() {
        this.userService.currentUser.subscribe(data => this.currentUser = data);
        if (this.currentUser) {
            this.canDelete = this.currentUser.username === this.comment.author.username;
        }
    }

    deleteClicked() {
        this.deleteComment.emit(true);
    }


}