import React from "react";
import {AttributeId, getSortedProducts, Product} from "./data-source";
import {Link} from "react-router-dom";

interface ProductsProps {
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
            return `/products?sortByAttributeId=${sortByAttributeId}`;
        }

        return <table className="table">
            <tbody>
            <tr>
                {Object.entries(attributes).map(([attributeId, attribute]) => {
                        return <th key={attributeId} style={{fontWeight: this.props.sortByAttributeId === attributeId ? 'bold' : 'normal'}}>
                            <Link to={createSortLink(attributeId as keyof Product)}>{attribute.title}</Link>
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
