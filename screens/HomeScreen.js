import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, LayoutAnimation} from 'react-native';
import * as firebase from 'firebase';

export default class HomeScreen extends Component {
    
    state = {
        name : "",
        email : "",
        displayname : ""
    }
    
    componentDidMount() {
        const {name ,email, displayname} = firebase.auth().currentUser

        this.setState({name, email, displayname});
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