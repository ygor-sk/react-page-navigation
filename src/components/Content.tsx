import React from "react";
import {FormattedJSON} from "../lib/global-util";

export default class Content extends React.Component<any, any> {

    render(): React.ReactNode {
        return <FormattedJSON value={window.location}/>
    }
}