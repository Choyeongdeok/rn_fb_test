import React, {Component} from 'react'
import {View, Text, StyleSheet, Alert, ScrollView, TextInput} from 'react-native'
import * as firebase from 'firebase'
import {Dropdown} from 'react-native-material-dropdown'

export default class WorkRegistrationScreen extends Component {
    
    constructor(props){
        super(props);
        this.state = { data : []}
    }
    
    componentDidMount() {
        const userId = firebase.auth().currentUser.uid
        const ref = firebase.database().ref('/users/' + userId)
        ref.on("value", snapshot => {
            this.setState({data: snapshot.val()});
        });
            
    }
    
    
    render() {

        if(this.state.data.permission == false){
            Alert.alert(
                '권한 없음',
                '기업회원만 접근 가능합니다.',
                [{text : 'OK', onPress : () => this.props.navigation.navigate("More")}],
                {cancelable : false}
            )
        }

        return (
                <ScrollView style = {styles.container}>
                    <View>
                        <Text style = {styles.greeting}>구인 등록 양식</Text>

                        <View style = {styles.form}>
                        
                            <View style = {{width : 80, marginBottom :8}}>
                                
                                <Dropdown
                                fontSize = {15}
                                labelFontSize = {12}
                                label = '지역 선택'
                                data = {[{value : "서울"}, {value : "경기"}, {value : "부산"}, {value : "대구"}, {value : "울산"}, {value : "인천"}, {value : "대전"}, {value : "광주"}, {value : "경북"}, {value : "경남"}, {value : "충북"}, {value : "충남"}, {value : "전북"}, {value : "전남"}, {value : "강원"}, {value : "제주"}]}
                                />
                            </View>
                            <View style = {{marginTop : 24}}>
                                <Text style = {styles.inputTitle}>근무지 주소</Text>
                                <TextInput
                                    style = {styles.input} placeholder = "근무지 주소를 입력하세요." autoCapitalize = "none" /*onChangeText={email => this.setState({email})} value={this.state.email}*/
                                />
                            </View>

                            <View style = {{marginTop : 24}}>
                                <Text style = {styles.inputTitle}>인원 수</Text>
                                <TextInput
                                    style = {styles.input} placeholder = "모집할 인원 수를 입력하세요." autoCapitalize = "none" 
                                    keyboardType = "decimal-pad"
                                    /*onChangeText={email => this.setState({email})} value={this.state.email}*/
                                />
                            </View>

                            <View style = {{marginTop : 24}}>
                                <Text style = {styles.inputTitle}>임금</Text>

                                <View style = {{ alignItems : "center",  flexDirection : 'row'}}>
                                    <View style = {{width : 60, marginRight : 5}}>
                                        <Dropdown
                                        fontSize = {15}
                                        labelFontSize = {12}
                                        label = '선택'
                                        data = {[{value : "일급"}, {value : "주급"}, {value : "월급"}]}
                                        />
                                    </View>

                                    <TextInput
                                        style = {styles.littleinput} placeholder = "금액을 입력하세요." autoCapitalize = "none" keyboardType = "decimal-pad"/*onChangeText={email => this.setState({email})} value={this.state.email}*/
                                    />
                                </View>
                            </View>
                        </View>
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
        fontSize : 18,
        fontWeight : "400",
        textAlign : "center"
    },
    form: {
        marginBottom : 48,
        marginHorizontal: 30
    },
    inputTitle: {
        color : "#8A8F9E",
        fontSize : 12,
        textTransform : "uppercase"
    },
    input: {
        borderBottomColor : "#8A8F9E",
        borderBottomWidth : StyleSheet.hairlineWidth,
        height : 40,
        fontSize : 15,
        color : "#161F3D"
    },
    halfinput: {
        borderBottomColor : "#8A8F9E",
        borderBottomWidth : StyleSheet.hairlineWidth,
        width : '40%',
        height : 40,
        fontSize : 15,
        color : "#161F3D",
    },
    littleinput: {
        marginTop : 12,
        borderBottomColor : "#8A8F9E",
        borderBottomWidth : StyleSheet.hairlineWidth,
        width : '40%',
        height : 40,
        fontSize : 15,
        color : "#161F3D",
    }
})