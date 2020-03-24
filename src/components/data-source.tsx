import {seededRandom} from "../lib/global-util";

export interface Product {
    id: number,
    name: string,
    description: string,
    price: number,
}

export type AttributeId = keyof Product;

const products: Product[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id: id,
    name: 'Name ' + Math.floor(seededRandom() * 10000),
    description: 'Description ' + Math.floor(seededRandom() * 10000),
    price: seededRandom() * 10000,
}))

function createSortFunction(sortByAttributeId: AttributeId): (a: Product, b: Product) => number {
    switch (sortByAttributeId) {
        case 'id':
            return (a, b) => a.id - b.id;
        case 'name':
            return (a, b) => a.name.localeCompare(b.name);
        case 'description':
            return (a, b) => a.description.localeCompare(b.description);
        case 'price':
            return (a, b) => a.price - b.price;
    }
}

export async function getSortedProducts(sortByAttributeId: AttributeId): Promise<Product[]> {
    let sortFunction = createSortFunction(sortByAttributeId);
    let sortedProducts = products.sort((a, b) => sortFunction(a, b));
    return new Promise((resolve) => {
        setTimeout(() => resolve(sortedProducts), 1000);
    });
}
