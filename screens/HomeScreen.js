import React, {Component} from 'react';
import {View, Platform, Text, StyleSheet, TouchableOpacity, LayoutAnimation} from 'react-native';
import * as firebase from 'firebase';

import {Ionicons} from '@expo/vector-icons';

export default class HomeScreen extends Component {
    
    state = {
        email : "",
        displayname : ""
    }
    
    componentDidMount() {
        const {email, displayname} = firebase.auth().currentUser

        this.setState({email, displayname});
    }

    signOutUser = () => {
        firebase.auth().signOut();
    }

    render() {
        LayoutAnimation.easeInEaseOut() 
        return (
            <View style = {styles.container}>
                <Text>Hi {this.state.email}</Text>
                <TouchableOpacity style={{marginTop : 32}} onPress={this.signOutUser}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        justifyContent : "center",
        alignItems : "center"
    }
});