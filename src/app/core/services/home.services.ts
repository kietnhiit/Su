import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpService } from "./http.services";

@Injectable()
export class HomeService {
    constructor(
        private http: HttpService
    ){}
    
    getMyFeed(): Observable<any> {
        return this.http.get('');
    }
}