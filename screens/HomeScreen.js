import React, {Component} from 'react';
import {View, Platform, Text, StyleSheet, TouchableOpacity, LayoutAnimation} from 'react-native';
import * as firebase from 'firebase';

import {Ionicons} from '@expo/vector-icons';

export default class HomeScreen extends Component {
    
    constructor(props){
        super(props);
        this.state = { data : [] }
    }

    componentDidMount() {
        const userId = firebase.auth().currentUser.uid
        const ref = firebase.database().ref('/users/' + userId)
        ref.on("value", snapshot => {
            this.setState({data: snapshot.val()});
        });
            
    }
    signOutUser = () => {
        firebase.auth().signOut();
    }

    render() {
        LayoutAnimation.easeInEaseOut() 
        return (
            <View style = {styles.container}>
                <Text> 안녕하세요. {this.state.data.name}님</Text>
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