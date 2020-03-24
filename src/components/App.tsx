import React from 'react';
import Products from './Products';
import {AttributeId} from "./data-source";
import {RouteComponentProps} from "react-router";
import {Link} from 'react-router-dom';

export interface PartialLocation {
    pathname: string,
    search: string
}

const formatLocation = (location: PartialLocation) => location.search ? `${location.pathname}?${location.search}` : location.pathname

export default class App extends React.Component<RouteComponentProps, any> {

    render() {
        console.log('rendering app', this.props.location);
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
            {<Link to={formatLocation({pathname: '/blogs', search: ''})}>{'Blogs'}</Link>}
            |
            {<Link to={formatLocation({pathname: '/products', search: ''})}>{'Products'}</Link>}
        </span>
    }
    private renderContent() {
        let params = new URLSearchParams(this.props.location.search);
        switch (this.props.location.pathname) {
            case '/blogs':
                return <Blogs/>
            case '/blog':
                return <Blog id={parseInt(params.get('id'))}/>
            case '/products':
                let sortByAttributeId = (params.get('sortByAttributeId') as AttributeId) || "id";
                return <Products sortByAttributeId={sortByAttributeId}/>
            case '/':
                return <div>Welcome to React routing demo</div>
            default:
                return <div>Page not found: {this.props.location.pathname}</div>
        }
    }

    private renderSideMenu() {
        return <ul>{this.getSideMenuPathNames().map(location => {
            return <li key={formatLocation(location)}>
                {<Link to={formatLocation(location)}>{formatLocation(location)}</Link>}
            </li>;
        })}
        </ul>
    }

    private getSideMenuPathNames(): PartialLocation[] {
        switch (this.props.location.pathname) {
            case '/blogs':
            case '/blog':
                return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({pathname: '/blog', search: `id=${id}`}))
            case '/products':
            case '/':
            default:
                return []
        }
    }
}

function Blogs() {
    return <div>Blogs</div>
}

function Blog(props: { id: number }) {
    return <div>Blog: {props.id}</div>
}
