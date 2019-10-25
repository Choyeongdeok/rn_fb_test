import React, { Component } from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import * as firebase from 'firebase'



export default class AccountNumberScreen extends Component {

    state = {
        bankname : "",
        name : "",
        accountnumber : "",
    };

    setAccount = () => {
        if ((this.state.bankname.length == 0) || (this.state.name.length ==0) || (this.state.accountnumber.length == 0)) {
            Alert.alert(
                '등록 오류',
                '정보를 모두 입력하세요.',
                [{text : 'OK', onPress : () => this.props.navigation.navigate("AccountNumber")}],
                {cancelable : false}
            )
        }

        else{
            const userId = firebase.auth().currentUser.uid
            firebase.database().ref('/users/' + userId + '/account/').set({
                bankname : this.state.bankname,
                name : this.state.name,
                accountnumber : this.state.accountnumber
            })

            Alert.alert(
                '등록 완료',
                '계좌 정보가 등록되었습니다.', 
                [
                    {text: 'OK', onPress: () => this.props.navigation.navigate("MyPage")}
                ],
                {cancelable: false}
            )
        }
    }

    render() {
        const data = [
            {value: '신한은행'},
            {value: '하나은행'},
            {value: '국민은행'},
            {value: '기업은행'},
            {value: '우리은행'},
            {value: '우체국'},
            {value: '수협'},
            {value: '농협'},
            {value: '씨티은행'}
        ];

        return (
            <ScrollView style = {{flex : 1}}>
              <View style = {styles.container}>
                <View style={styles.form}>
                  <TouchableOpacity>
                    <Dropdown
                    fontSize={15}
                    labelFontSize={10}
                    label='은행선택'
                    data={data}
                    onChangeText = {bankname => this.setState({bankname})}
                    value = {this.state.bankname}
                    />
                  </TouchableOpacity>
                </View>
                
                <View style = {styles.form}>
                  <View>
                    <TextInput
                        style = {styles.input} autoCapitalize = "none" placeholder="예금주"
                        onChangeText = {name => this.setState({name})} value = {this.state.name}
                    />
                  </View>
                </View>
                
                <View style = {styles.form}>
                  <View>
                    <TextInput
                        placeholder='계좌번호'
                        style = {styles.input} autoCapitalize = "none" placeholder="계좌번호(숫자만 입력하세요)"
                        onChangeText = {accountnumber => this.setState({accountnumber})}
                        value = {this.state.accountnumber}
                    />
                  </View>
                </View>
                
                <TouchableOpacity style={styles.button} onPress={this.setAccount}>
                    <Text style = {{color:"#FFF", fontWeight: "500"}}>등록하기</Text>
                </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    contanier:{
        flex:1,
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
        marginTop:30,
    },
  }
)