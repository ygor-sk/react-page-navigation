import React from "react";
import {PartialLocation} from "./App";
import {AttributeId, getSortedProducts, Product, SortBy} from "./data-source";

interface ProductsProps {
    linkCreator: (title: string | React.ReactNode, location: PartialLocation) => React.ReactNode,
    sortBy: SortBy
}

const attributes: { [id in AttributeId]: { title: string } } = {
    id: {title: "ID"},
    name: {title: "Name"},
    description: {title: "Description"},
    price: {title: "Price"},
}

interface ProductsState {
    products: Product[]
}

export default class Products extends React.Component<ProductsProps, ProductsState> {

    constructor(props: Readonly<ProductsProps>) {
        super(props);
        this.state = {products: []}
    }

    componentDidMount(): void {
        this.loadProducts();
    }

    componentDidUpdate(prevProps: Readonly<ProductsProps>, prevState: Readonly<ProductsState>, snapshot?: any): void {
        if (prevProps.sortBy.attributeId !== this.props.sortBy.attributeId || prevProps.sortBy.direction !== this.props.sortBy.direction) {
            this.loadProducts();
        }
    }

    private loadProducts() {
        getSortedProducts(this.props.sortBy).then(products => {
            this.setState({products: products})
        });
    }

    render() {
        console.log('rendering products', this.props.sortBy);

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
            {this.state.products.map(product => <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
            </tr>)}
            </tbody>
        </table>
    }
}
