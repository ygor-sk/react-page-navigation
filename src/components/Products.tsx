import React from "react";
import {seededRandom} from "../lib/global-util";
import {PartialLocation} from "./App";

interface Product {
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

const attributes: { [id in AttributeId]: { title: string } } = {
    id: {title: "ID"},
    name: {title: "Name"},
    description: {title: "Description"},
    price: {title: "Price"},
}

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

interface SortBy {
    attributeId: AttributeId,
    direction: number
}

interface ProductsProps {
    linkCreator: (title: string | React.ReactNode, location: PartialLocation) => React.ReactNode,
    sortBy: SortBy
}

export default class Products extends React.Component<ProductsProps> {

    render() {
        console.log('rendering products', this.props.sortBy);
        let sortFunction = createSortFunction(this.props.sortBy.attributeId);
        let sortedProducts = products.sort((a, b) => sortFunction(a, b) * this.props.sortBy.direction);
        function createSortLink(sortBy: SortBy) {
            return `sortByAttributeId=${sortBy.attributeId}&sortByDirection=${sortBy.direction}`;
        }
        return <table className="table">
            <tbody>
            <tr>
                {Object.entries(attributes).map(([attributeId, attribute]) => {
                        let sortAsc = {attributeId: attributeId as keyof Product, direction: 1};
                        let sortDesc = {attributeId: attributeId as keyof Product, direction: -1};
                        return <th key={attributeId}>
                            {attribute.title}
                            &nbsp;
                            {this.props.linkCreator(<span>&uarr;</span>, {pathname: '/products', search: createSortLink(sortAsc)})}
                            &nbsp;
                            {this.props.linkCreator(<span>&darr;</span>, {pathname: '/products', search: createSortLink(sortDesc)})}
                        </th>;
                    }
                )}
            </tr>
            {sortedProducts.map(product => <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
            </tr>)}
            </tbody>
        </table>
    }
}
