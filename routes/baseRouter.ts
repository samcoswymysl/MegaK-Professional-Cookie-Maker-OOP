import {CookieMakerApp} from "../index";
import {RestDecoratorInfo} from "../types/rest-decorator";
import {Router} from "express";

export class BaseRouter {
    public router: Router = Router();

    constructor(protected cmapp: CookieMakerApp) {
        this.setUpRoutes();
    }


    protected setUpRoutes(): void {
        const apiOperations: RestDecoratorInfo[] = Reflect.get(this, '_restApiCalls') ?? [];
        for(const oneApiOperation of apiOperations){

            this.router[oneApiOperation.httpMethod](oneApiOperation.path,(...args) =>  (this as any)[oneApiOperation.propertyName](...args));
        }
    }
}
