import React, {Component} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from 'firebase';

export default class RegisterScreen extends Component {

    state = {
        name : "",
        email : "",
        password : "",
        phonenumber : "",
        errorMessage : null
    };

    handleSignUp = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((res) => {
                firebase.database().ref('users/' + res.user.uid).set({
                    name : this.state.name,
                    email : this.state.email,
                    phonenumber : this.state.phonenumber
                })
            })
            .then(userCredentials => {
                return userCredentials.user.updateProfile({
                    displayName : this.state.name
                });
            })
            
            .catch(error => this.setState({errorMessage: error.message}));
        

    }


    render() {

        return (
            <ScrollView style = {{flex : 1}}>
            <View style = {styles.container}>
                <Text style={styles.greeting}>{`Hello.\nSign up to start 데일리워킹.`}</Text>
                
                <View style = {styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style = {styles.form}>

                    <View>
                        <Text style = {styles.inputTitle}>Full Name</Text>
                        <TextInput
                            style = {styles.input} autoCapitalize = "none" onChangeText={name => this.setState({name})} value={this.state.name}
                        ></TextInput>
                    </View>
                    <View style = {{marginTop : 32}}>
                        <Text style = {styles.inputTitle}>Email Address</Text>
                        <TextInput
                            style = {styles.input} autoCapitalize = "none" onChangeText={email => this.setState({email})} value={this.state.email}
                        ></TextInput>
                    </View>

                    <View style = {{marginTop : 32}}>
                        <Text style = {styles.inputTitle}>Phone Number</Text>
                        <TextInput
                            style = {styles.input} autoCapitalize = "none" onChangeText={phonenumber => this.setState({phonenumber})} value={this.state.phonenumber}
                        ></TextInput>
                    </View>

                    <View style = {{marginTop : 32}}>
                        <Text style = {styles.inputTitle}>Password</Text>
                        <TextInput
                            style = {styles.input} secureTextEntry autoCapitalize = "none" onChangeText={password => this.setState({password})} value = {this.state.password}
                        ></TextInput>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                    <Text style = {{color:"#FFF", fontWeight: "500"}}>Sign up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{alignSelf: "center", marginTop : 32, marginBottom : 64}} onPress={() => this.props.navigation.navigate("Login")}>
                    <Text style = {{color : "#414959", fontSize : 13}}>
                        Already Sign Up? <Text style = {{fontWeight : "500", color : "#0C00AF"}}>Login</Text>
                    </Text>
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
        justifyContent : "center"
    }
});