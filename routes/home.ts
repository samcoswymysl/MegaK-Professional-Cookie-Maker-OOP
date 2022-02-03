import {Request, Response, Router} from 'express';
import {CookieMakerApp} from "../index";
import {MyRouter} from "../types/my-router";
import {rest} from "../dorators/rest.decorators";
import {BaseRouter} from "./baseRouter";


export class HomeRouter extends BaseRouter implements MyRouter   {
    readonly urlPrefix = '/';

    @rest('get', '/')
    private readonly home = (req: Request, res: Response): void => {
        const {sum, addons, base, allBases, allAddons} = this.cmapp.getCookieSettings(req);

        res.render('home/index', {
            cookie: {
                base,
                addons,
            },
            allBases,
            allAddons,
            sum,
        });
    };
}

