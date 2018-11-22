import { Injectable } from "@angular/core";
import { HttpService } from "./http.services";
import { Observable } from "rxjs";

@Injectable()
export class CommentService {
    constructor(
        private http: HttpService
    ){}

    getCommentBySlug(slug) {
        return this.http.get('articles/'+ slug + '/comments');
    }

    addComment(slug, data) {
        return this.http.post('articles/'+ slug + '/comments', {
            comment: {body: data}
        });
    }
    deleteComment(slug, id) {
        return this.http.delete('articles/'+ slug + '/comments/'+ id);
    }
}