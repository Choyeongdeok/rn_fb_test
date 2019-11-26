import React, { Component } from 'react'
import { Text, View, StyleSheet, Alert, ScrollView, TouchableOpacity} from 'react-native'
import * as firebase from 'firebase'

export default class RequestScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            data : [],
            key : '',
            requestValue : false
        }
    }

    state = {
        userdata : []
    }

    componentDidMount() {
        const {navigation} = this.props;
        selectedKey = navigation.getParam('selectedKey')
        this.setState({key : selectedKey})

        firebase.database().ref('/work/' + selectedKey).on(
            "value", async (snapshot) => {
                await this.setState({data : snapshot.val()})
            }
        )

        firebase.database().ref('/work/' + selectedKey + '/requestMember/').on(
            "value", async (snapshot) =>{
                var snapVal = snapshot.val();
                for (var key in snapVal) {
                    if (snapVal.hasOwnProperty(key) && ((snapVal[key].userId == firebase.auth().currentUser.uid))) {
                        this.setState({requestValue : true})
                    }
                }
            }
        )
    }

    sendRequest = () => {
        const userId = firebase.auth().currentUser.uid
        const ref = firebase.database().ref('/users/' + userId)
        ref.on("value", snapshot => {
            if(snapshot.val().permission) {
                Alert.alert(
                    '알림',
                    '기업 회원은 신청할 수 없습니다.',
                    [
                        {text : 'ok'}
                    ]
                )
            }

            else if(this.state.requestValue) {
                Alert.alert(
                    '알림',
                    '이미 신청하였습니다.',
                    [{text : 'ok', onPress : () => this.props.navigation.navigate("Home")}],
                    {cancelable : false}
                )
            }
    
            else {
                firebase.database().ref('/work/' + this.state.key +'/requestMember/').push({
                    name : snapshot.val().name,
                    userId : firebase.auth().currentUser.uid,
                    phonenumber : snapshot.val().phonenumber,
                    gendertype : snapshot.val().gendertype
                })
                Alert.alert(
                    '알림',
                    '신청 완료',
                    [{text : 'ok', onPress : () => this.props.navigation.navigate("Home")}],
                    {cancelable : false}
                )
            }
        });
    }
    
    render() {
        return (
            <ScrollView style = {styles.container}>
            <View>
                <Text style = {styles.greeting}>구인 공고</Text>

                <View style = {styles.form}>
                
                    <View style = {{marginTop : 24}}>
                        <View style = {{flexDirection : 'row'}}>
                            <Text style = {styles.inputTitle}>근무지 주소</Text>
                        </View>
                        <View>
                            <Text style = {styles.input}>{this.state.data.address}</Text>
                        </View>
                    </View>

                    <View style = {{marginTop : 32}}>
                        <View style = {{flexDirection : 'row'}}>
                            <Text style = {styles.inputTitle}>근로계약기간</Text>
                        </View>
                        <View>
                            <Text style = {styles.input}>{this.state.data.firstday} ~ {this.state.data.lastday}</Text>
                        </View>
                    </View>

                    <View style = {{marginTop : 24}}>
                        <Text style = {styles.inputTitle}>인원 수</Text>
                        <Text style = {styles.input}>{this.state.data.member} 명</Text>
                    </View>

                    <View style = {{marginTop : 24}}>
                        <Text style = {styles.inputTitle}>임금</Text>

                        <View style = {{ alignItems : "center",  flexDirection : 'row'}}>
                        <Text style = {styles.input}>{this.state.data.paytype} {this.state.data.pay}</Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={this.sendRequest}>
                    <Text style = {{color:"#FFF", fontWeight: "500"}}>신청하기</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex :1
    },
    greeting: {
        marginTop : 32,
        fontSize : 32,
        fontWeight : "400",
        textAlign : "center"
    },
    form: {
        marginBottom : 48,
        marginHorizontal: 30
    },
    inputTitle: {
        color : "#8A8F9E",
        fontSize : 20,
        textTransform : "uppercase"
    },
    input : {
        fontSize : 20
    },
    button : {
        marginHorizontal : 30,
        backgroundColor: "#0C00AF",
        borderRadius : 4,
        height : 52,
        alignItems : "center",
        justifyContent : "center",
        marginBottom : 32
    }
})