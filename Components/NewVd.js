import React, {Component} from 'react';
import {Text} from 'react-native'
import ViewShot from "react-native-view-shot";

class NewVd extends Component {
    constructor(props){
        super(props);
    }

    onCapture = uri => {
        this.props.func(uri);                   //for the parent using callback
    }


    render() {
        return (
            <ViewShot onCapture={this.onCapture} captureMode="mount">
            </ViewShot>
        );
    }
}

export default NewVd;