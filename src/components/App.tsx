import React from 'react';
import Products, {AttributeId} from './Products';

interface AppState {
    location: MyLocation
}

interface MyLocation {
    pathname: string,
    search: string
}

export default class App extends React.Component<any, AppState> {

    constructor(props: Readonly<any>) {
        super(props);
        this.state = {
            location: {
                pathname: '/',
                search: ''
            }
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
            {this.createButtonLink('Pages', {pathname: '/pages', search: ''})}
            |
            {this.createButtonLink('Blogs', {pathname: '/blogs', search: ''})}
            |
            {this.createButtonLink('Products', {pathname: '/products', search: ''})}
        </span>
    }

    private createButtonLink(description: string, location: MyLocation) {
        return <button onClick={() => this.setState({location: location})}>{description}</button>;
    }

    private renderContent() {
        let params = new URLSearchParams(this.state.location.search);
        switch (this.state.location.pathname) {
            case '/pages':
                return <Pages/>
            case '/page':
                return <Page id={parseInt(params.get('id'))}/>
            case '/blogs':
                return <Blogs/>
            case '/blog':
                return <Blog id={parseInt(params.get('id'))}/>
            case '/products':
                let sortDirection = params.get('sortDirection') ? parseInt(params.get('sortDirection')) : 1;
                let sortByAttributeId = (params.get('sortByAttributeId') as AttributeId) || "id";
                return <Products sortByAttributeId={sortByAttributeId} sortDirection={sortDirection}/>
            case '/':
                return <div>Welcome to React routing demo</div>
            default:
                return <div>Page not found: {this.state.location.pathname}</div>
        }
    }

    private renderSideMenu() {
        return <ul>{this.getSideMenuPathNames().map(location => {
            let path = location.pathname + '?' + location.search;
            return <li key={path}>
                {this.createButtonLink(path, location)}
            </li>;
        })}
        </ul>
    }

    private getSideMenuPathNames(): MyLocation[] {
        switch (this.state.location.pathname) {
            case '/pages':
            case '/page':
                return [1, 2, 3].map(id => ({pathname: '/page', search: `id=${id}`}))
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


