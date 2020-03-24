import React from 'react';
import Products from './Products';
import {AttributeId} from "./data-source";

interface AppState {
    location: PartialLocation
}

export interface PartialLocation {
    pathname: string,
    search: string
}

const formatLocation = (location: PartialLocation) => location.search ? `${location.pathname}?${location.search}` : location.pathname

export default class App extends React.Component<any, AppState> {

    private historyListener: () => void;

    constructor(props: Readonly<any>) {
        super(props);
        this.state = {
            location: {
                pathname: window.location.pathname,
                search: window.location.search
            }
        }
    }

    componentDidMount(): void {
        this.historyListener = () => {
            this.setState({
                location: {
                    pathname: window.location.pathname,
                    search: window.location.search
                }
            })
        };
        window.addEventListener("popstate", this.historyListener)
    }

    componentWillUnmount(): void {
        window.removeEventListener("popstate", this.historyListener);
    }

    render() {
        console.log('rendering app', this.state.location);
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
            {this.createNavigationLink('Blogs', {pathname: '/blogs', search: ''})}
            |
            {this.createNavigationLink('Products', {pathname: '/products', search: ''})}
        </span>
    }

    private createNavigationLink(title: string | React.ReactNode, location: PartialLocation) {
        let onClick = (e: any) => {
            e.preventDefault();
            window.history.pushState(null, '', formatLocation(location))
            this.setState({location: location});
        };
        return <a href={formatLocation(location)} onClick={onClick}>{title}</a>;
    }

    private renderContent() {
        let params = new URLSearchParams(this.state.location.search);
        const linkCreator = (title: string | React.ReactNode, location: PartialLocation) => this.createNavigationLink(title, location)
        switch (this.state.location.pathname) {
            case '/blogs':
                return <Blogs/>
            case '/blog':
                return <Blog id={parseInt(params.get('id'))}/>
            case '/products':
                let sortByAttributeId = (params.get('sortByAttributeId') as AttributeId) || "id";
                return <Products sortByAttributeId={sortByAttributeId} linkCreator={linkCreator}/>
            case '/':
                return <div>Welcome to React routing demo</div>
            default:
                return <div>Page not found: {this.state.location.pathname}</div>
        }
    }

    private renderSideMenu() {
        return <ul>{this.getSideMenuPathNames().map(location => {
            return <li key={formatLocation(location)}>
                {this.createNavigationLink(formatLocation(location), location)}
            </li>;
        })}
        </ul>
    }

    private getSideMenuPathNames(): PartialLocation[] {
        switch (this.state.location.pathname) {
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


