import {HttpMethod} from "../types/http-methods";
import {MyRouter} from "../types/my-router";
import {RestDecoratorInfo} from "../types/rest-decorator";

export function rest(
    httpMethod: HttpMethod,
    path: string
) {
    return (target: MyRouter, propertyName: string): any => {
        const ar: RestDecoratorInfo[] = Reflect.get(target, '_restApiCalls') ?? [];

        ar.push({
            httpMethod,
            path,
            propertyName,
        })

        Reflect.set(target, '_restApiCalls',  ar)
    }
}

export function get(path: string) {
    return rest('get', path)
}

export function post(path: string) {
    return rest('post', path)
}

export function put(path: string) {
    return rest('put', path)
}

export function patch(path: string) {
    return rest('patch', path)
}

export function deleteEl(path: string) {
    return rest('delete', path)
}
