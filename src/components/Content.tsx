import React from "react";
import {FormattedJSON} from "../lib/global-util";

export default class Content extends React.Component<any, any> {

    render(): React.ReactNode {
        switch (window.location.pathname) {
            case '/pages': return <Pages/>
            case '/blogs': return <Blogs/>
            case '/products': return <Products/>
            default: return <div>Page not found: {window.location.pathname}</div>
        }
    }
}

function Pages() {
    return <div>Pages</div>
}

function Blogs() {
    return <div>Blogs</div>
}

function Products() {
    return <div>Products</div>
}