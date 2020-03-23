import React from "react";
import {seededRandom} from "../lib/global-util";

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

interface ProductsState {
    sortBy: SortBy
}

export default class Products extends React.Component<any, ProductsState> {

    private historyListener: () => void;

    constructor(props: Readonly<any>) {
        super(props);
        this.state = {
            sortBy: this.getSortFromLocation()
        }
    }

    componentDidMount(): void {
        this.historyListener = () => {
            this.setState({
                sortBy: this.getSortFromLocation()
            })
        };
        window.addEventListener("popstate", this.historyListener)
    }

    private getSortFromLocation() {
        let params = new URLSearchParams(window.location.search);
        return {
            attributeId: params.get('sortByAttributeId') as AttributeId || 'id',
            direction: parseInt(params.get('sortByDirection') || '1')
        };
    }

    componentWillUnmount(): void {
        window.removeEventListener("popstate", this.historyListener);
    }


    render() {
        let sortFunction = createSortFunction(this.state.sortBy.attributeId);
        let sortedProducts = products.sort((a, b) => sortFunction(a, b) * this.state.sortBy.direction);
        let createOnClickFunction = (sortBy: SortBy) => (e: any) => {
            e.preventDefault();
            window.history.pushState(null, '', createSortLink(sortBy))
            this.setState({sortBy: sortBy});
        }
        function createSortLink(sortBy: SortBy) {
            return `?sortByAttributeId=${sortBy.attributeId}&sortByDirection=${sortBy.direction}`;
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
                            <a href={createSortLink(sortAsc)} onClick={createOnClickFunction(sortAsc)}>&uarr;</a>
                            &nbsp;
                            <a href={createSortLink(sortDesc)} onClick={createOnClickFunction(sortDesc)}>&darr;</a>
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
