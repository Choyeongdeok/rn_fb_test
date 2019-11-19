import React, { Component } from 'react'
import { Text, StyleSheet, View, FlatList, TouchableOpacity, TextInput,  Image, Alert, ScrollView } from 'react-native'
import * as firebase from 'firebase'
import {Dropdown} from 'react-native-material-dropdown'
import {Card, CardItem, CheckBox} from 'native-base'
import * as ExpoPixi from 'expo-pixi';

export default class DocumentRegistrationScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            data : [],
            workdata : [],
            checked1 : false,
            checked2 : false,
            checked3 : false,
            checked4 : false,
        }
    }

    state = {
        one : false,
        two : false,
        workKey : null,
        address : '',
        firstday : '',
        lastday : '',
        paytype : '',
        pay : '',
        company : '',
        head : '',
        phonenumber : '',
        workDetail : '',
        weekHours : 0,
        workType : '',
        workstartTime : '',
        workendTime : '',
        reststartTime : '',
        restendTime : '',
        daytype : '',
        givetype : '',
        insurance : '',
        in1 : '',
        in2 : '',
        in3 : '',
        in4 : ''
    }
    
    componentDidMount() {
        const {navigation} = this.props;
            key = navigation.getParam('key')
            this.setState({workKey : key})

        const userId = firebase.auth().currentUser.uid
        const ref = firebase.database().ref('/users/' + userId)
        ref.on("value", snapshot => {
            this.setState({data : snapshot.val()});
        });
        firebase.database().ref('/work/' + key).on("value", async snapshot => {
            await this.setState({workdata : snapshot.val()})
        });
        
    }
    
    sumInsurance = () => {

        if(this.state.weekHours > 40) {
            Alert.alert(
                '입력 범위 초과',
                '주 소정 근로시간은 40시간을 초과할 수 없습니다',
                [
                    {text : 'ok'}
                ]
            )
        }

        else{
            var sumInsur = []

            if(this.state.checked1) {
                sumInsur.push(this.state.in1)
            }

            if(this.state.checked2) {
                sumInsur.push(this.state.in2)
            }

            if(this.state.checked3) {
                sumInsur.push(this.state.in3)
            }

            if(this.state.checked4) {
                sumInsur.push(this.state.in4)
            }


            this.setState({insurance : sumInsur.join(', ')}, this.documentRegister)
        }
    }

    documentRegister = () => {
        firebase.database().ref('/work/' + this.state.workKey + '/document/').set({
            address : this.state.workdata.address,
            firstday : this.state.workdata.firstday,
            lastday : this.state.workdata.lastday,
            paytype : this.state.workdata.paytype,
            pay : this.state.workdata.pay,
            company : this.state.company,
            head : this.state.head,
            phonenumber : this.state.phonenumber,
            workDetail : this.state.workDetail,
            weekHours : this.state.weekHours,
            workType : this.state.workType,
            workstartTime : this.state.workstartTime,
            workendTime : this.state.workendTime,
            reststartTime : this.state.reststartTime,
            restendTime : this.state.restendTime,
            daytype : this.state.daytype,
            givetype : this.state.givetype,
            insurance : this.state.insurance,
            signature : this.state.data.signature
        })
        Alert.alert(
            '알림',
            '등록 완료',
            [
                {text : 'ok', onPress : () => this.props.navigation.navigate("More")}
            ]
        )

    }

    onePressed(givetype) {
        this.setState({one: true, two : false, givetype : givetype})
    }

    twoPressed(givetype) {
        this.setState({one: false, two : true, givetype : givetype})
    }

    multiPressed1(option) {
        this.setState({checked1 : !this.state.checked1, in1 : option})
    }

    multiPressed2(option) {
        this.setState({checked2 : !this.state.checked2, in2 : option})
    }

    multiPressed3(option) {
        this.setState({checked3 : !this.state.checked3, in3 : option})
    }

    multiPressed4(option) {
        this.setState({checked4 : !this.state.checked4, in4 : option})
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
                            style = {styles.input} placeholder = "사업체 이름을 입력하세요." autoCapitalize = "none" onChangeText={company => this.setState({company})} value={this.state.company}
                        ></TextInput>
                    </View>

                    <View style = {{marginTop : 32}}>
                        <Text style = {styles.inputTitle}>사업주명</Text>
                        <TextInput
                            style = {styles.input} placeholder = "사업주 이름을 입력하세요." autoCapitalize = "none" onChangeText={head => this.setState({head})} value={this.state.head}
                        ></TextInput>
                    </View>

                    <View style = {{marginTop : 32}}>
                        <Text style = {styles.inputTitle}>휴대폰 번호</Text>
                        <TextInput
                            style = {styles.input} placeholder = "사업자 대표 전화번호를 입력하세요.(숫자만)" autoCapitalize = "none" keyboardType = "decimal-pad"onChangeText={phonenumber => this.setState({phonenumber})} value={this.state.phonenumber}
                        ></TextInput>
                    </View>

                    <View style = {{marginTop : 32}}>
                        <Text style = {styles.inputTitle}>근로계약기간</Text>
                        <Text>{this.state.workdata.firstday} ~ {this.state.workdata.lastday}</Text>
                    </View>

                    <View style = {{marginTop : 32}}>
                        <Text style = {styles.inputTitle}>근무지</Text>
                        <Text>{this.state.workdata.address}</Text>
                    </View>

                    <View style = {{marginTop : 32}}>
                        <Text style = {styles.inputTitle}>업무내용</Text>
                        <TextInput
                            style = {styles.input} placeholder = "업무내용을 입력하세요." autoCapitalize = "none" onChangeText={workDetail => this.setState({workDetail})} value={this.state.workDetail}
                        ></TextInput>
                    </View>

                    <View style = {{marginTop : 32}}>
                        <Text style = {styles.inputTitle}>주 소정근로시간</Text>
                        <TextInput
                            style = {styles.input} placeholder = "주 소정근로시간을 입력하세요." autoCapitalize = "none" keyboardType = "decimal-pad" onChangeText={weekHours => this.setState({weekHours})} value={this.state.weekHours}
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
                            onChangeText = {workType => this.setState({workType})}
                            value = {this.state.workType}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style = {{marginTop : 32}}>
                        <Text style = {styles.inputTitle}>근무시간</Text>
                        <View style = {{ alignItems : "center", justifyContent : "space-around", flexDirection : 'row'}}>
                            <TextInput maxLength = {16}
                                style = {styles.halfinput} placeholder = "근로시작시간"  autoCapitalize = "none" onChangeText={workstartTime => this.setState({workstartTime})} value={this.state.workstartTime}
                            ></TextInput>
                            <Text>~</Text>
                            <TextInput maxLength = {16}
                                style = {styles.halfinput} placeholder = "근로종료시간" autoCapitalize = "none" onChangeText={workendTime => this.setState({workendTime})} value={this.state.workendTime}
                            ></TextInput>
                        </View>
                    </View>

                    <View style = {{marginTop : 32}}>
                        <Text style = {styles.inputTitle}>휴게시간</Text>
                        <View style = {{ alignItems : "center", justifyContent : "space-around", flexDirection : 'row'}}>
                            <TextInput maxLength = {16}
                                style = {styles.halfinput} placeholder = "휴게시작시간"  autoCapitalize = "none" onChangeText={reststartTime => this.setState({reststartTime})} value={this.state.reststartTime}
                            ></TextInput>
                            <Text>~</Text>
                            <TextInput maxLength = {16}
                                style = {styles.halfinput} placeholder = "휴게종료시간" autoCapitalize = "none" onChangeText={restendTime => this.setState({restendTime})} value={this.state.restendTime}
                            ></TextInput>
                        </View>
                    </View>

                    <View style = {{marginTop : 32}}>
                        <Text style = {styles.inputTitle}>임금</Text>
                        <Text>{this.state.workdata.paytype} {this.state.workdata.pay}</Text>
                    </View>

                    <View style = {{marginTop : 32}}>
                        <Text style = {styles.inputTitle}>임금 지급일</Text>
                        
                        <View style = {{width : 100}}>
                        <Dropdown
                        fontSize = {15}
                        labelFontSize = {12}
                        label = '선택'
                        data = {[{value : "매일"}, {value : "매주"}, {value : "매월"}]}
                        onChangeText = {daytype => this.setState({daytype})}
                        value = {this.state.daytype}
                        />
                        </View>
                    </View>

                    <View style = {{marginTop : 32}}>
                        <Text style = {styles.inputTitle}>임금 지급방법</Text>
                        
                        <View style = {{marginTop : 8}}>
                            <Card>
                                <CardItem body>
                                    <CheckBox checked = {this.state.one}
                                    onPress = {() => this.onePressed('근로자에게 직접지급')}
                                    style = {{marginRight : 20, borderColor : "#0C00AF"}}
                                    /><Text style={{color : "#8A8F9E"}}>근로자에게 직접지급</Text>
                                </CardItem>

                                <CardItem body>
                                    <CheckBox checked = {this.state.two}
                                    onPress = {() => this.twoPressed('근로자 명의 예금통장에 입금')}
                                    style = {{marginRight : 20, borderColor : "#0C00AF"}}
                                    /><Text style={{color : "#8A8F9E"}}>근로자 명의 예금통장에 입금</Text>
                                </CardItem>
                            </Card>
                            
                        </View>
                    </View>

                    <View style = {{marginTop : 32}}>
                        <Text style = {styles.inputTitle}>사회보험적용여부</Text> 

                        <View style = {{marginTop : 8}}>

                            <Card>
                                <CardItem body>
                                    <CheckBox checked = {this.state.checked1}
                                    onPress = {() => this.multiPressed1('고용보험')}
                                    style = {{marginRight : 20, borderColor : "#0C00AF"}}
                                    /><Text style={{color : "#8A8F9E"}}>고용보험</Text>
                                </CardItem>

                                <CardItem body>
                                    <CheckBox checked = {this.state.checked2}
                                    onPress = {() => this.multiPressed2('산재보험')}
                                    style = {{marginRight : 20, borderColor : "#0C00AF"}}
                                    /><Text style={{color : "#8A8F9E"}}>산재보험</Text>
                                </CardItem>

                                <CardItem body>
                                    <CheckBox checked = {this.state.checked3}
                                    onPress = {() => this.multiPressed3('국민연금')}
                                    style = {{marginRight : 20, borderColor : "#0C00AF"}}
                                    /><Text style={{color : "#8A8F9E"}}>국민연금</Text>
                                </CardItem>

                                <CardItem body>
                                    <CheckBox checked = {this.state.checked4}
                                    onPress = {() => this.multiPressed4('건강보험')}
                                    style = {{marginRight : 20, borderColor : "#0C00AF"}}
                                    /><Text style={{color : "#8A8F9E"}}>건강보험</Text>
                                </CardItem>
                            </Card>
                        </View>
                    </View>

                    <View style = {{marginTop : 32}}>
                        <Text style = {styles.inputTitle}>전자서명</Text>
                        <View style = {{ marginTop : 8}}>
                            <Image
                            style = {{width : 100, height : 70,     borderColor : '#0C00AF', borderWidth : 1}}
                            source = {{uri : this.state.data.signature}}
                            />
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={this.sumInsurance}>
                    <Text style = {{color:"#FFF", fontWeight: "500"}}>작성 완료</Text>
                </TouchableOpacity>

                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex : 2
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