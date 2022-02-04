import {Request, Response} from 'express';
import {MyRouter} from "../types/my-router";
import { BaseRouter } from './baseRouter';
import {get} from "../decorators/rest.decorators";
import {urlPrefix} from "../decorators/urlPrefix";


@urlPrefix('/order')
export class OrderRouter extends BaseRouter implements MyRouter {


    @get('/summary')
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

    @get( '/thanks')
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
