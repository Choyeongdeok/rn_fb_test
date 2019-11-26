import React, { Component } from 'react'
import { Text, View, ScrollView, Image } from 'react-native'

export default class DocumentImageScreen extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            uri : ''
        }
    }

    componentDidMount() {
        const {navigation} = this.props;
        uri = navigation.getParam('data')
        this.setState({uri : uri})
    }

    render() {
        return (
            <View style = {{alignItems : 'center', marginTop : 16, marginBottom : 16}}>
                <Image
                style = {{width :'90%' , height: '100%', borderColor : '#0C00AF', borderWidth : 0.5}}
                source = {{uri:this.state.uri}}/>
            </View>
        )
    }
}