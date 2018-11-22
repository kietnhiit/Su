import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { UserService } from "./user.services";
import { take } from "rxjs/operators";
import { JWTService } from "./jwt.services";

@Injectable()
export class AuthService implements CanActivate {
    constructor(
        private userService: UserService,
        private router: Router,
        private jwtService: JWTService
    ){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if (this.jwtService.getToken()) {
            return true;
        }

        this.router.navigateByUrl('/login');
    }

}