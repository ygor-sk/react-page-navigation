import React from 'react';
import Products from './Products';

interface AppState {
    page: string,
}

export default class App extends React.Component<any, AppState> {

    constructor(props: Readonly<any>) {
        super(props);
        this.state = {
            page: "pages"
        }
    }

    render() {
        return <div className="container">
            <div>{this.renderMenu()}</div>
            <div className="row">
                <div className="col-3">{this.renderSideMenu()}</div>
                <div className="col-9">{this.renderContent()}</div>
            </div>

        </div>;
    }

    private renderMenu() {
        return <span>
            <a href="pages">Pages</a>
            |
            <a href="blogs">Blogs</a>
            |
            <a href="products">Products</a>
        </span>
    }

    private renderContent() {
        let params = new URLSearchParams(window.location.search);
        switch (window.location.pathname) {
            case '/pages':
                return <Pages/>
            case '/page':
                return <Page id={parseInt(params.get('id'))}/>
            case '/blogs':
                return <Blogs/>
            case '/blog':
                return <Blog id={parseInt(params.get('id'))}/>
            case '/products':
                return <Products/>
            default:
                return <div>Page not found: {window.location.pathname}</div>
        }
    }

    private renderSideMenu() {
        return <ul>{this.getSideMenuPathNames().map(pathName => <li key={pathName}><a href={pathName}>{pathName}</a></li>)}</ul>
    }

    private getSideMenuPathNames(): string[] {
        switch (window.location.pathname) {
            case '/pages':
            case '/page':
                return ['/page?id=1', '/page?id=2', '/page?id=3']
            case '/blogs':
            case '/blog':
                return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => `/blog?id=${id}`)
            case '/products':
                return []
            default:
                return []
        }
    }
}

function Pages() {
    return <div>Pages</div>
}

function Page(props: { id: number }) {
    return <div>Page: {props.id}</div>
}

function Blogs() {
    return <div>Blogs</div>
}

function Blog(props: { id: number }) {
    return <div>Blog: {props.id}</div>
}


