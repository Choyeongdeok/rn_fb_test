import React, { Component } from 'react'
import { Text, StyleSheet, View, FlatList, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native'
import * as firebase from 'firebase'
import {Dropdown} from 'react-native-material-dropdown'
import CheckBox from 'react-native-checkbox'

export default class DocumentRegistrationScreen extends Component {

    constructor(props){
        super(props);
        this.state = { data : [],
            checked : false,
            checked1 : false,
            checked2 : false,
            checked3 : false,
            checked4 : false }
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
                    <Text style = {styles.greeting}>{`전자근로계약서 양식\n(워크넷 제공)`}</Text>

                    <View style = {styles.form}>

                    <View>
                        <Text style = {styles.inputTitle}>사업체명</Text>
                        <TextInput
                            style = {styles.input} placeholder = "사업체 이름을 입력하세요." autoCapitalize = "none" /*onChangeText={name => this.setState({name})} value={this.state.name}*/
                        ></TextInput>
                    </View>

                    <View style = {{marginTop : 32}}>
                        <Text style = {styles.inputTitle}>사업주명</Text>
                        <TextInput
                            style = {styles.input} placeholder = "사업주 이름을 입력하세요." autoCapitalize = "none" /*onChangeText={email => this.setState({email})} value={this.state.email}*/
                        ></TextInput>
                    </View>

                    <View style = {{marginTop : 32}}>
                        <Text style = {styles.inputTitle}>휴대폰 번호</Text>
                        <TextInput
                            style = {styles.input} placeholder = "사업자 대표 전화번호를 입력하세요.(숫자만 입력)" autoCapitalize = "none" keyboardType = "decimal-pad"/*onChangeText={phonenumber => this.setState({phonenumber})} value={this.state.phonenumber}*/
                        ></TextInput>
                    </View>

                    <View style = {{marginTop : 32}}>
                        <Text style = {styles.inputTitle}>근로계약기간</Text>
                        <View style = {{ alignItems : "center", justifyContent : "space-around", flexDirection : 'row'}}>
                            <TextInput maxLength = {16}
                                style = {styles.halfinput} placeholder = "근로시작일"  autoCapitalize = "none" /*onChangeText={phonenumber => this.setState({phonenumber})} value={this.state.phonenumber}*/
                            ></TextInput>
                            <Text>~</Text>
                            <TextInput maxLength = {16}
                                style = {styles.halfinput} placeholder = "근로종료일" autoCapitalize = "none" /*onChangeText={phonenumber => this.setState({phonenumber})} value={this.state.phonenumber}*/
                            ></TextInput>
                        </View>
                    </View>

                    <View style = {{marginTop : 32}}>
                        <Text style = {styles.inputTitle}>근무장소</Text>
                        <TextInput
                            style = {styles.input} placeholder = "근무장소를 입력하세요." autoCapitalize = "none" /*onChangeText={email => this.setState({email})} value={this.state.email}*/
                        ></TextInput>
                    </View>

                    <View style = {{marginTop : 32}}>
                        <Text style = {styles.inputTitle}>업무내용</Text>
                        <TextInput
                            style = {styles.input} placeholder = "업무내용을 입력하세요." autoCapitalize = "none" /*onChangeText={email => this.setState({email})} value={this.state.email}*/
                        ></TextInput>
                    </View>

                    <View style = {{marginTop : 32}}>
                        <Text style = {styles.inputTitle}>주 소정근로시간</Text>
                        <TextInput
                            style = {styles.input} placeholder = "주 소정근로시간을 입력하세요." autoCapitalize = "none" /*onChangeText={email => this.setState({email})} value={this.state.email}*/
                        ></TextInput>
                        <Text style = {styles.underline}>근로시간은 일 8시간, 주 40시간을 초과할 수 없습니다.</Text>
                    </View>

                    <View style = {{marginTop : 32}}>
                        <Text style = {styles.inputTitle}>근무형태</Text>
                        <TouchableOpacity>
                            <Dropdown
                            fontSize = {15}
                            labelFontSize = {12}
                            label = '선택'
                            data = {[{value : "주 7일[근로기준법 제 63조 적용 업종]"}, {value : "주 6일"}, {value : "주 5일"}, {value : "주 4일"}, {value : "주 3일"}, {value : "주 2일"}, {value : "주 1일"}, {value : "주말근무"}, {value : "격일근무"}]}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style = {{marginTop : 32}}>
                        <Text style = {styles.inputTitle}>근무시간</Text>
                        <View style = {{ alignItems : "center", justifyContent : "space-around", flexDirection : 'row'}}>
                            <TextInput maxLength = {16}
                                style = {styles.halfinput} placeholder = "근로시작시간"  autoCapitalize = "none" /*onChangeText={phonenumber => this.setState({phonenumber})} value={this.state.phonenumber}*/
                            ></TextInput>
                            <Text>~</Text>
                            <TextInput maxLength = {16}
                                style = {styles.halfinput} placeholder = "근로종료시간" autoCapitalize = "none" /*onChangeText={phonenumber => this.setState({phonenumber})} value={this.state.phonenumber}*/
                            ></TextInput>
                        </View>
                    </View>

                    <View style = {{marginTop : 32}}>
                        <Text style = {styles.inputTitle}>휴게시간</Text>
                        <View style = {{ alignItems : "center", justifyContent : "space-around", flexDirection : 'row'}}>
                            <TextInput maxLength = {16}
                                style = {styles.halfinput} placeholder = "휴게시작시간"  autoCapitalize = "none" /*onChangeText={phonenumber => this.setState({phonenumber})} value={this.state.phonenumber}*/
                            ></TextInput>
                            <Text>~</Text>
                            <TextInput maxLength = {16}
                                style = {styles.halfinput} placeholder = "휴게종료시간" autoCapitalize = "none" /*onChangeText={phonenumber => this.setState({phonenumber})} value={this.state.phonenumber}*/
                            ></TextInput>
                        </View>
                    </View>

                    <View style = {{marginTop : 32}}>
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
                            ></TextInput>
                            
                        </View>
                    </View>

                    <View style = {{marginTop : 32}}>
                        <Text style = {styles.inputTitle}>임금 지급일</Text>
                        
                        <View style = {{width : 100}}>
                        <Dropdown
                        fontSize = {15}
                        labelFontSize = {12}
                        label = '선택'
                        data = {[{value : "매일"}, {value : "매주"}, {value : "매월"}]}
                        />
                        </View>
                    </View>

                    <View style = {{marginTop : 32}}>
                        <Text style = {styles.inputTitle}>임금 지급방법</Text>
                        
                        <View style = {{marginTop : 8}}>
                            <CheckBox
                            style = {{}}
                            label='근로자에게 직접지급'
                            checked={this.state.checked}
                            onChange = {() => this.setState({checked : !this.state.checked})}
                            />
                            <CheckBox
                            label='근로자 명의 예금통장에 입금'
                            checked={!this.state.checked}
                            onChange = {() => this.setState({checked : this.state.checked})}
                            />
                        </View>
                    </View>

                    <View style = {{marginTop : 32}}>
                        <Text style = {styles.inputTitle}>사회보험적용여부(셀렉트박스)</Text> 

                        <View style = {{marginTop : 8}}>
                            <CheckBox
                            style = {{}}
                            label='고용보험'
                            checked={this.state.checked1}
                            onChange = {() => this.setState({checked1 : !this.state.checked1})}
                            />
                            
                            <CheckBox
                            style = {{}}
                            label='산재보험'
                            checked={this.state.checked2}
                            onChange = {() => this.setState({checked2 : !this.state.checked2})}
                            />
                            
                            <CheckBox
                            style = {{}}
                            label='국민연금'
                            checked={this.state.checked3}
                            onChange = {() => this.setState({checked3 : !this.state.checked3})}
                            />
                            
                            <CheckBox
                            style = {{}}
                            label='건강보험'
                            checked={this.state.checked4}
                            onChange = {() => this.setState({checked4 : !this.state.checked4})}
                            />
                        </View>
                    </View>

                    <View style = {{marginTop : 32}}>
                        <Text style = {styles.inputTitle}>전자서명</Text> 
                    </View>
                </View>

                <TouchableOpacity style={styles.button} /*onPress={this.handleSignUp}*/>
                    <Text style = {{color:"#FFF", fontWeight: "500"}}>작성 완료</Text>
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
    },
    underline : {
        marginTop : 5,
        color : 'red',
        fontSize : 10
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
});