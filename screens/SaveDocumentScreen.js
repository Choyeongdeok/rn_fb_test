import React, { Component, useRef } from 'react'
import { Text, View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import * as firebase from 'firebase'
import{ captureRef as takeSnapshotAsync} from 'react-native-view-shot'

export default class QualificationScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data : [],
            signature : '',
            uri:""
        }
    }
    

    componentDidMount() {
        const {navigation} = this.props;
        data = navigation.getParam('data')
        var documentData = []
        for(var obj in data) {
            documentData.push(data[obj])
        }
        this.setState({data : documentData})

        const userId = firebase.auth().currentUser.uid
        firebase.database().ref('/users/' + userId).on(
            "value", snapshot => {
                this.setState({signature : snapshot.val().signature})
            }
        )
    }

    captureDocument = async () => {
        const doc_result = await takeSnapshotAsync(this.pageView, {
            format: 'jpeg', // 'png' also supported
            quality: 1, // quality 0 for very poor 1 for very good
            result: 'file' // 
        })
        console.log(doc_result)
        
        const userId = firebase.auth().currentUser.uid
        firebase.database().ref('/users/' + userId + '/savedDocument/').push({
            uri : doc_result
        })
    }

    render() {
        return (

            <ScrollView>
                <View>
                    <View collapsable={false}
                    ref={view => {
                    this.pageView = view;
                    }}>
                    <Text style = {styles.greeting}>전자근로계약서</Text>
                    
                    <View style = {styles.form}>
                        <View>
                            <Text style = {styles.inputTitle}>사업체명</Text>
                            <Text style = {styles.context}>{this.state.data[1]}</Text>
                        </View>
                        <View style = {{marginTop : 16}}>
                            <Text style = {styles.inputTitle}>사업주명</Text>
                            <Text style = {styles.context}>{this.state.data[5]}</Text>
                        </View>
                        <View style = {{marginTop : 16}}>
                            <Text style = {styles.inputTitle}>휴대폰 번호</Text>
                            <Text style = {styles.context}>{this.state.data[10]}</Text>
                        </View>
                        <View style = {{marginTop : 16}}>
                            <Text style = {styles.inputTitle}>근로계약기간</Text>
                            <Text style = {styles.context}>{this.state.data[3]} ~ {this.state.data[7]}</Text>
                        </View>
                        <View style = {{marginTop : 16}}>
                            <Text style = {styles.inputTitle}>근무지</Text>
                            <Text style = {styles.context}>{this.state.data[0]}</Text>
                        </View>
                        <View style = {{marginTop : 16}}>
                            <Text style = {styles.inputTitle}>업무내용</Text>
                            <Text style = {styles.context}>{this.state.data[15]}</Text>
                        </View>
                        <View style = {{marginTop : 16}}>
                            <Text style = {styles.inputTitle}>주 소정근로시간</Text>
                            <Text style = {styles.context}>{this.state.data[14]}시간</Text>
                        </View>
                        <View style = {{marginTop : 16}}>
                            <Text style = {styles.inputTitle}>근무형태</Text>
                            <Text style = {styles.context}>{this.state.data[16]}</Text>
                        </View>
                        <View style = {{marginTop : 16}}>
                            <Text style = {styles.inputTitle}>근무시간</Text>
                            <Text style = {styles.context}>{this.state.data[18]} ~ {this.state.data[17]}</Text>
                        </View>
                        <View style = {{marginTop : 16}}>
                            <Text style = {styles.inputTitle}>휴게시간</Text>
                            <Text style = {styles.context}>{this.state.data[12]} ~ {this.state.data[11]}</Text>
                        </View>
                        <View style = {{marginTop : 16}}>
                            <Text style = {styles.inputTitle}>임금</Text>
                            <Text style = {styles.context}>{this.state.data[9]} {this.state.data[8]}원</Text>
                        </View>
                        <View style = {{marginTop : 16}}>
                            <Text style = {styles.inputTitle}>임금 지급일</Text>
                            <Text style = {styles.context}>{this.state.data[2]}</Text>
                        </View>
                        <View style = {{marginTop : 16}}>
                            <Text style = {styles.inputTitle}>임금지급방법</Text>
                            <Text style = {styles.context}>{this.state.data[4]}</Text>
                        </View>
                        <View style = {{marginTop : 16}}>
                            <Text style = {styles.inputTitle}>사회보험적용여부</Text>
                            <Text style = {styles.context}>{this.state.data[6]}</Text>
                        </View>
                        <View style = {{marginTop : 16, flexDirection : 'row', alignItems : 'center', justifyContent : 'space-around'}}>
                        <Text style = {styles.inputTitle}>사업자 전자서명</Text>
                        <Text style = {styles.inputTitle}>나의 전자서명</Text>
                        </View>
                        <View style = {{ marginTop : 8,  flexDirection : 'row', alignItems : 'center', justifyContent : 'space-around'}}>
                            <Image
                            style = {{width : 100, height : 70,     borderColor : '#0C00AF', borderWidth : 1}}
                            source = {{uri : this.state.data[13]}}
                            />
                            <Image
                                style = {{width : 100, height : 70,     borderColor : '#0C00AF', borderWidth : 1}}
                                source = {{uri : this.state.signature}}
                            />
                        </View>
                    </View>
                    </View>

                    <TouchableOpacity style={styles.button} onPress = {this.captureDocument}>
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
        marginTop : 16,
        marginBottom : 16,
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
    context : {
        marginLeft : 8
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