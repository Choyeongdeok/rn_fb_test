import React, {Component} from 'react';
import {ScrollView, View, Text, StyleSheet, Alert} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import { number } from 'prop-types';


export default class RegisterUserScreen extends Component {

    state = {
        companyname : "",
        companynumber : "",
        name : "",
        email : "",
        password : "",
        phonenumber : "",
        errorMessage : null
    };

    handleSignUp = () => {
        if(!(/^(?:(010-?\d{4})|(01[1|6|7|8|9]-?\d{3,4}))-?\d{4}$/.test(this.state.phonenumber))) {
            Alert.alert(
                '휴대폰 번호를 올바르게 입력해주세요',
                'xxx-xxxx-xxxx',
                [{text: 'ok'}]
            )
        }

        else if (Number(this.state.companynumber).length < 10) {
            Alert.alert(
                '입력 오류',
                '사업자 번호를 올바르게 입력해주세요',
                [{text: 'ok'}]
            )
        }

        else{
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((res) => {
                    firebase.database().ref('/users/' + res.user.uid).set({

                        email : this.state.email,
                        name : this.state.name,
                        phonenumber : this.state.phonenumber,
                        companyname : this.state.companyname,
                        companynumber : this.state.companynumber,
                        permission : true
                    })
                })
                .then(userCredentials => {
                    return userCredentials.user.updateProfile({
                        displayName : this.state.name
                    });
                })
                .catch(error => this.setState({errorMessage: error.message}));
        }

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
                        <Text style = {styles.inputTitle}>Company Name</Text>
                        <TextInput
                            style = {styles.input} placeholder = "담당자 이름을 입력하세요." autoCapitalize = "none" onChangeText={companyname => this.setState({companyname})} value={this.state.companyname}
                        ></TextInput>
                    </View>

                    <View style = {{marginTop : 32}}>
                        <Text style = {styles.inputTitle}>Company Number</Text>
                        <TextInput
                            style = {styles.input} placeholder = "사업자 등록번호 열 자리를 입력하세요.(숫자만)" maxLength = {10} autoCapitalize = "none" keyboardType = "decimal-pad" onChangeText={companynumber => this.setState({companynumber})} value={this.state.companynumber}
                        ></TextInput>
                    </View>

                    <View style = {{marginTop : 32}}>
                        <Text style = {styles.inputTitle}>Full Name</Text>
                        <TextInput
                            style = {styles.input} placeholder = "담당자 이름을 입력하세요." autoCapitalize = "none" onChangeText={name => this.setState({name})} value={this.state.name}
                        ></TextInput>
                    </View>
                    
                    <View style = {{marginTop : 32}}>
                        <Text style = {styles.inputTitle}>Email Address</Text>
                        <TextInput
                            style = {styles.input} placeholder = "담당자 이메일을 입력하세요." autoCapitalize = "none" onChangeText={email => this.setState({email})} value={this.state.email}
                        ></TextInput>
                    </View>

                    <View style = {{marginTop : 32}}>
                        <Text style = {styles.inputTitle}>Phone Number</Text>
                        <TextInput
                            style = {styles.input} placeholder = "담당자 휴대폰 번호를 입력하세요.(숫자만)" maxLength = {14} autoCapitalize = "none" keyboardType = "decimal-pad" onChangeText={phonenumber => this.setState({phonenumber})} value={this.state.phonenumber}
                        ></TextInput>
                    </View>

                    <View style = {{marginTop : 32}}>
                        <Text style = {styles.inputTitle}>Password</Text>
                        <TextInput
                            style = {styles.input} placeholder = "비밀번호를 입력하세요." secureTextEntry autoCapitalize = "none" onChangeText={password => this.setState({password})} value = {this.state.password}
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