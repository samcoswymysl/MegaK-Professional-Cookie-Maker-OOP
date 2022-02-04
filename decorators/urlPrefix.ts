import { BaseRouter } from "../routes/baseRouter";

export function urlPrefix(path: string) {
    return function <T extends { new(...args: any[]): BaseRouter}>(constructor: T) {
        Reflect.set(constructor, 'urlPrefix', path)
    }
}

