import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { UsersService } from "../services/users.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private usersService: UsersService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.usersService.getToken();
        req = req.clone({
            setHeaders: {
                Authorization: "Bearer " + authToken
            }
        });
        return next.handle(req);
    }
}