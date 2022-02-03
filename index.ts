import * as express from 'express';
import {Application, json, Request, Response, static as expressStatic} from "express";
import * as cookieParser from 'cookie-parser';
import {engine} from 'express-handlebars';

import {HomeRouter} from "./routes/home";
import {ConfiguratorRouter} from "./routes/configurator";
import {OrderRouter} from "./routes/order";
import {handlebarsHelpers} from "./utils/handlebars-helpers";
import {COOKIE_BASES, COOKIE_ADDONS} from"./data/cookies-data";
import {Entris} from "./types/entris";
import {MyRouter} from "./types/my-router";





export class CookieMakerApp {
   private app: Application = express()
    public readonly data = {
        COOKIE_BASES,
        COOKIE_ADDONS,
    };

   private readonly routers = [HomeRouter, ConfiguratorRouter, OrderRouter]

    constructor() {
        this._configureApp();
        this._setRoutes();
        this._run();
    }

    private _configureApp(): void {

        this.app.use(json());
        this.app.use(expressStatic('public'));
        this.app.use(cookieParser());
        this.app.engine('.hbs', engine({
            extname: '.hbs',
            helpers: handlebarsHelpers,
        }));
        this.app.set('view engine', '.hbs');
    }

    private _setRoutes(): void {
       for(const router of this.routers){
           const newRouter: MyRouter =  new router(this)
           this.app.use(newRouter.urlPrefix, newRouter.router)
       }
    }

   private _run(): void {
        this.app.listen(3000, '0.0.0.0', () => {
            console.log('Listening on :3000');
        });
    }

     public showErrorPage(res: Response, description: string): void {
        res.render('error', {
            description,
        });
    }


     public getAddonsFromReq(req: Request): string[] {
        const {cookieAddons} = req.cookies as {
            cookieAddons: string
        };
        return cookieAddons ? JSON.parse(cookieAddons) : [];
    }

    public getCookieSettings(req: Request): {
        addons: string[],
        base: string | undefined,
        sum: number,
        allBases: Entris,
        allAddons: Entris,
    } {
        const {cookieBase: base} = req.cookies as {
            cookieBase?: string
        }


        const addons = this.getAddonsFromReq(req);

        const allBases = Object.entries(this.data.COOKIE_BASES);
        const allAddons = Object.entries(this.data.COOKIE_ADDONS);

        const sum = (base ? handlebarsHelpers.findPrice(allBases, base) : 0)
            + addons.reduce((prev, curr) => (
                prev + handlebarsHelpers.findPrice(allAddons, curr)
            ), 0);

        return {
            // Selected stuff
            addons,
            base,

            // Calculations
            sum,

            // All possibilities
            allBases,
            allAddons,
        };
    }

}

new CookieMakerApp();
