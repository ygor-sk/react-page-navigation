export interface Product {
    id: number,
    name: string,
    description: string,
    price: number,
}

export type AttributeId = keyof Product;

const products: Product[] = [
    {id: 1001, name: 'Car', description: 'Toyota', price: 20000},
    {id: 1002, name: 'Aircraft', description: 'Lockheed Martin', price: 3800000},
    {id: 1003, name: 'Car', description: 'Tesla', price: 92500},
    {id: 1004, name: 'Rocket', description: 'Falcon 9', price: 61000000},
    {id: 1005, name: 'Car', description: 'Renault', price: 15000},
    {id: 1006, name: 'Aircraft', description: 'Boeing', price: 4300000},
    {id: 1007, name: 'Aircraft', description: 'Airbus', price: 3500000},
    {id: 1008, name: 'Rocket', description: 'Soyuz', price: 78000000},
    {id: 1009, name: 'Car', description: 'BMW', price: 38000},
    {id: 1010, name: 'Rocket', description: 'Atlas 5', price: 120000000},
]

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

export function getSortedProducts(sortByAttributeId: AttributeId): Promise<Product[]> {
    let sortFunction = createSortFunction(sortByAttributeId);
    let sortedProducts = products.sort((a, b) => sortFunction(a, b));
    return new Promise((resolve) => {
        setTimeout(() => resolve(sortedProducts), 1000);
    });
}
