import {Router} from "express";

export interface MyRouter {
    readonly urlPrefix: string;
    readonly router: Router
}
