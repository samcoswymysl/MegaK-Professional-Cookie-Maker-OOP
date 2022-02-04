import {Request, Response, Router} from 'express';
import {MyRouter} from "../types/my-router";
import {get} from "../decorators/rest.decorators";
import {BaseRouter} from "./baseRouter";
import {urlPrefix} from "../decorators/urlPrefix";


@urlPrefix('/')
export class HomeRouter extends BaseRouter implements MyRouter {


    @get('/')
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


