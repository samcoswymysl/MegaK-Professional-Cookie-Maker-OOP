import {Request, Response} from 'express';
import {MyRouter} from "../types/my-router";
import { BaseRouter } from './baseRouter';
import {rest} from "../dorators/rest.decorators";

export class OrderRouter extends BaseRouter implements MyRouter {
    readonly urlPrefix = '/order';

    @rest('get', ',symmary')
    private readonly sumary = (req: Request, res: Response): void => {
        const {sum, addons, base, allBases, allAddons} = this.cmapp.getCookieSettings(req);

        res.render('order/summary', {
            cookie: {
                base,
                addons,
            },
            allBases,
            allAddons,
            sum,
        });
    };

    @rest('get', '/thanks')
   private readonly thanks = (req: Request, res: Response): void => {
        const {sum} = this.cmapp.getCookieSettings(req);

        res
            .clearCookie('cookieBase')
            .clearCookie('cookieAddons')
            .render('order/thanks', {
                sum,
            });
    }
}
