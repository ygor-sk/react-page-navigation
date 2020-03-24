import React from 'react';
import Products from './Products';
import {AttributeId} from "./data-source";
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';

export interface PartialLocation {
    pathname: string,
    search: string
}

const formatLocation = (location: PartialLocation) => location.search ? `${location.pathname}?${location.search}` : location.pathname

export default class App extends React.Component<any, any> {

    render() {
        return <div className="container">
            <BrowserRouter>
                <div>{this.renderMenu()}</div>
                <div className="row">
                    <div className="col-3">{this.renderSideMenu()}</div>
                    <div className="col-9">{this.renderContent()}</div>
                </div>
            </BrowserRouter>
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
        return <Switch>
            <Route path='/blogs'>
                <Blogs/>
            </Route>
            <Route path='/blog/:id' render={props => {
                return <Blog id={parseInt(props.match.params.id)}/>
            }}/>
            <Route path='/products' render={props => {
                const params = new URLSearchParams(props.location.search)
                let sortByAttributeId = (params.get('sortByAttributeId') as AttributeId) || "id";
                return <Products sortByAttributeId={sortByAttributeId}/>
            }}/>
            <Route path='/'>
                <div>Welcome to React routing demo</div>
            </Route>
            <Route path='*' render={props => {
                return <div>Page not found: {props.location.pathname}</div>
            }}/>
        </Switch>
    }

    private renderSideMenu() {
        return <Switch>
            <Route path={['/blogs', '/blog']}>
                {<ul>{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({pathname: `/blog/${id}`, search: ''})).map(location => {
                    return <li key={formatLocation(location)}>
                        {<Link to={formatLocation(location)}>{formatLocation(location)}</Link>}
                    </li>;
                })}
                </ul>}
            </Route>
            <Route path='*'/>
        </Switch>
    }
}

function Blogs() {
    return <div>Blogs</div>
}

function Blog(props: { id: number }) {
    return <div>Blog: {props.id}</div>
}
