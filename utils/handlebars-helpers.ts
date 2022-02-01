import {Entris} from "../types/entris";


export const handlebarsHelpers = {
    findPrice: (entries: Entris, selectedItem: string): number => {
        const found = entries.find(el => el[0] === selectedItem);

        if (!found) {
            throw new Error(`Cannot find price of "${selectedItem}".`);
        }

        const [, price] = found;
        return price;
    },

    pricify: (price: number): string => price.toFixed(2),

    isNotInArray: <T>(array: T[], element: T): boolean => !array.includes(element),

    isInArray: <T>(array: T[], element: T): boolean => array.includes(element),
};

