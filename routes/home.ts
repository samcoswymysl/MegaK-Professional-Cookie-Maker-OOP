import {Request, Response, Router} from 'express';
import {CookieMakerApp} from "../index";

export class HomeRouter {
    public router: Router = Router();

    constructor(private cmapp: CookieMakerApp) {
        this.setUpRoutes();
    }

    setUpRoutes(): void {
        this.router.get('/', this.home);
    }

    home = (req: Request, res: Response) => {
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

