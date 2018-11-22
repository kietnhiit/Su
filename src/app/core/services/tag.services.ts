import { Injectable } from "@angular/core";
import { HttpService } from "./http.services";
import { Observable } from "rxjs";

@Injectable()
export class TagService {
    constructor(
        private http: HttpService
    ){}

    getTags(): Observable<any> {
        return this.http.get('tags');
    }
}