import {seededRandom} from "../lib/global-util";

export interface Product {
    id: number,
    name: string,
    description: string,
    price: number,
}

export type AttributeId = keyof Product;

export interface SortBy {
    attributeId: AttributeId,
    direction: number
}


const products: Product[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id: id,
    name: 'Name ' + Math.floor(seededRandom() * 10000),
    description: 'Description ' + Math.floor(seededRandom() * 10000),
    price: seededRandom() * 10000,
}))

function createSortFunction(attributeId: AttributeId): (a: Product, b: Product) => number {
    switch (attributeId) {
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

export async function getSortedProducts(sortBy: SortBy): Promise<Product[]> {
    let sortFunction = createSortFunction(sortBy.attributeId);
    let sortedProducts = products.sort((a, b) => sortFunction(a, b) * sortBy.direction);
    return new Promise((resolve) => {
        setTimeout(() => resolve(sortedProducts), 1000);
    });
}
