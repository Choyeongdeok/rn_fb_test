import React, {Component} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from 'firebase';

export default class UpdateScreen extends Component {

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

    handleUpdate = () => {
        const userId = firebase.auth().currentUser.uid
        firebase.database().ref('/users/' + userId).set({
            name : this.state.name,
            email : this.state.email,
            phonenumber : this.state.phonenumber
        })
    }

    render() {
        return(
            <ScrollView style = {{flex : 1}}>
            <View style = {styles.container}>
                <Text style={styles.greeting}>{`수정할 개인정보를 입력한 후,\n'수정하기' 버튼을 눌러주세요.`}</Text>
                
                <View style = {styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style = {styles.form}>

                    <View>
                        <Text style = {styles.inputTitle}>Email Address</Text>
                            <Text>{this.state.data.email}</Text>
                    </View>


                    <View style = {{marginTop : 32}}>
                        <Text style = {styles.inputTitle}>Full Name</Text>
                        <TextInput
                            style = {styles.input} placeholder = {`${this.state.data.name}`} autoCapitalize = "none" onChangeText={name => this.setState({name})} value={this.state.name}
                        ></TextInput>
                    </View>

                    <View style = {{marginTop : 32}}>
                        <Text style = {styles.inputTitle}>Phone Number</Text>
                        <TextInput
                            style = {styles.input} placeholder = {`${this.state.data.phonenumber}`} autoCapitalize = "none" onChangeText={phonenumber => this.setState({phonenumber})} value={this.state.phonenumber}
                        ></TextInput>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={this.handleUpdate}>
                    <Text style = {{color:"#FFF", fontWeight: "500"}}>수정하기</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
            
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
        justifyContent : "center",
        marginBottom : 64
    }
});