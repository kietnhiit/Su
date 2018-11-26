import { Injectable } from "@angular/core";
import { HttpService } from "./http.services";
import { Observable } from "rxjs";
import { Post } from "../entity";

@Injectable()
export class PostService {

    constructor(
        private http: HttpService
    ){}


    getMyPost(user): Observable<any> {
        return this.http.get('articles?author=' + user);
    }

    getMyFavoritePosts(user): Observable<any> {
        return this.http.get('articles?favorited=' + user);
    }

    addPost(data): Observable<any> {
        return this.http.post('/articles', {article: data})
    }

    getFeed(requestOpts, tag?): Observable<any> {
        let path = `articles?limit=${requestOpts.limit}&offset=${requestOpts.offset}`;
        if (requestOpts.type === 'Your') {
            path = `articles/feed?limit=${requestOpts.limit}&offset=${requestOpts.offset}`;
        }

        if (tag) path += '&tag=' + tag;
        return this.http.get(path);
    }

    getPostBySlug(slug){
        return this.http.get('articles/'+ slug);
    }

    deletePost(slug) {
        return this.http.delete('articles/' + slug);
    }

    updatePost(slug, data) {
        return this.http.put('articles/' + slug, { article: data });
    }

    favorite(slug) {
        return this.http.post('articles/' + slug + '/favorite');
    }
    
    unfavorite(slug) {
        return this.http.delete('articles/' + slug + '/favorite');
    }
}