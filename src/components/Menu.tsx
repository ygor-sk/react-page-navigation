import React from "react";

export default class Menu extends React.Component<any, any> {

    render(): React.ReactNode {
        return <span>
            <a href="pages">Pages</a>
            |
            <a href="blogs">Blogs</a>
            |
            <a href="products">Products</a>
        </span>
    }
}