import {Request, Response} from "express";
import {MyRouter} from "../types/my-router";
import {get, rest} from "../decorators/rest.decorators";
import { BaseRouter } from "./baseRouter";
import {urlPrefix} from "../decorators/urlPrefix";

@urlPrefix('/configurator')
export class ConfiguratorRouter extends BaseRouter implements MyRouter {


    @get( '/select-base/:baseName')
    private selectBase = (req: Request, res: Response): void => {
        const {baseName} = req.params;

        if ( !(this.cmapp.data.COOKIE_BASES as Record<string, number>)[baseName]) {
            return this.cmapp.showErrorPage(res, `There is no such base as ${baseName}.`);
        }

        res
            .cookie('cookieBase', baseName)
            .render('configurator/base-selected', {
                baseName,
            });
    };

    @get('/add-addon/:addonName')
    private addAddon = (req: Request, res: Response): void => {
        const {addonName}= req.params;



        if (!(this.cmapp.data.COOKIE_ADDONS as Record<string, number>)[addonName] ) {
            return this.cmapp.showErrorPage(res, `There is no such addon as ${addonName}.`);
        }

        const addons = this.cmapp.getAddonsFromReq(req);

        if (addons.includes(addonName)) {
            return this.cmapp.showErrorPage(res, `${addonName} is already on your cookie. You cannot add it twice.`);
        }

        addons.push(addonName);

        res
            .cookie('cookieAddons', JSON.stringify(addons))
            .render('configurator/added', {
                addonName,
            });
    };

    @get('/delete-addon/:addonName')
    private deleteAddon= (req: Request, res: Response): void  => {
        const {addonName} = req.params;

        const oldAddons = this.cmapp.getAddonsFromReq(req);

        if (!oldAddons.includes(addonName)) {
            return this.cmapp.showErrorPage(res, `Cannot delete something that isn't already added to the cookie. ${addonName} not found on cookie.`);
        }

        const addons = oldAddons.filter(addon => addon !== addonName);

        res
            .cookie('cookieAddons', JSON.stringify(addons))
            .render('configurator/deleted', {
                addonName,
            });
    };
}
