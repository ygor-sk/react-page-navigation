import React from "react";
import {PartialLocation} from "./App";
import {AttributeId, getSortedProducts, Product} from "./data-source";

interface ProductsProps {
    linkCreator: (title: string | React.ReactNode, location: PartialLocation) => React.ReactNode,
    sortByAttributeId: AttributeId
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
        if (prevProps.sortByAttributeId !== this.props.sortByAttributeId) {
            this.loadProducts();
        }
    }

    private loadProducts() {
        getSortedProducts(this.props.sortByAttributeId).then(products => {
            this.setState({products: products})
        });
    }

    render() {
        console.log('rendering products', this.props.sortByAttributeId);

        function createSortLink(sortByAttributeId: AttributeId) {
            return `sortByAttributeId=${sortByAttributeId}`;
        }

        return <table className="table">
            <tbody>
            <tr>
                {Object.entries(attributes).map(([attributeId, attribute]) => {
                        return <th key={attributeId} style={{fontWeight: this.props.sortByAttributeId === attributeId ? 'bold' : 'normal'}}>
                            {this.props.linkCreator(attribute.title, {pathname: '/products', search: createSortLink(attributeId as keyof Product)})}
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
