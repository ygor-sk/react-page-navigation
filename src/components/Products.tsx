import React from "react";
import {seededRandom} from "../lib/global-util";

interface Product {
    id: number,
    name: string,
    description: string,
    price: number,
}

const products: Product[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id: id,
    name: 'Name ' + Math.floor(seededRandom() * 10000),
    description: 'Description ' + Math.floor(seededRandom() * 10000),
    price: seededRandom() * 10000,
}))

interface Attribute {
    id: keyof Product,
    title: string
}

const attributes: Attribute[] = [
    {id: 'id', title: "ID"},
    {id: 'name', title: "Name"},
    {id: 'description', title: "Description"},
    {id: 'price', title: "Price"},
]

interface ProductsState {
    sortedProducts: Product[]
}

function sortedProducts(attribute: Attribute): Product[] {
    switch (attribute.id) {
        case 'id': return products.sort((a, b) => a.id - b.id);
        case 'name': return products.sort((a, b) => a.name.localeCompare(b.name));
        case 'description': return products.sort((a, b) => a.description.localeCompare(b.description));
        case 'price': return products.sort((a, b) => a.price - b.price);
    }
}

export default class Products extends React.Component<any, ProductsState> {

    constructor(props: Readonly<any>) {
        super(props);
        this.state = {
            sortedProducts: sortedProducts(attributes[0])
        }
    }

    render() {
        return <table className="table">
            <tbody>
            <tr>
                {attributes.map(attribute =>
                    <th key={attribute.id}>
                        {attribute.title}
                        &nbsp;
                        <button onClick={() => this.setState({sortedProducts: sortedProducts(attribute)})}>&uarr;</button>
                        &nbsp;
                        <button onClick={() => this.setState({sortedProducts: sortedProducts(attribute).reverse()})}>&darr;</button>
                    </th>
                )}
            </tr>
            {this.state.sortedProducts.map(product => <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
            </tr>)}
            </tbody>
        </table>
    }
}
