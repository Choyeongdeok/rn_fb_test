import React, {Component} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from 'firebase';

export default class UpdateScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {data : [] }
    }

    componentDidMount() {
        const ref = firebase.database().ref('users/qEUpXaPOoLcfVTmxalGRtZsTlbY2');
        ref.on("value", snapshot => {
            this.setState({ data: snapshot.val()});
        })
    }
    
    

    render() {
        return(
            <View>
                <Text>개인정보 수정</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex : 1
    },
    greeting: {
        marginTop : 32,
        fontSize : 18,
        fontWeight : "400",
        textAlign : "center"
    },
    errorMessage: {
        height : 72,
        alignItems : "center",
        justifyContent : "center",
        marginHorizontal : 30
    },
    error: {
        color : "#E9446A",
        fontSize : 13,
        fontWeight : "600",
        textAlign : "center"
    },
    form: {
        marginBottom : 48,
        marginHorizontal: 30
    },
    inputTitle: {
        color : "#8A8F9E",
        fontSize : 10,
        textTransform : "uppercase"
    },
    input: {
        borderBottomColor : "#8A8F9E",
        borderBottomWidth : StyleSheet.hairlineWidth,
        height : 40,
        fontSize : 15,
        color : "#161F3D"
    },
    button : {
        marginHorizontal : 30,
        backgroundColor: "#0C00AF",
        borderRadius : 4,
        height : 52,
        alignItems : "center",
        justifyContent : "center"
    }
});