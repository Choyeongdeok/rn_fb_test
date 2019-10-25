import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, ScrollView, TouchableOpacity, Alert} from 'react-native'

export default class QuestionsScreen extends Component {

    render() {
        return (
            <ScrollView style={{flex:1}}>
                <View>
                    <View>
                        <Text style={styles.greeting}>{`문의하고 싶은 내용을 입력한 후에\n'문의하기' 버튼을 눌러주세요!`}</Text>
                    </View>
                    
                    <View style={{marginTop:20}}>
                    <TextInput
                        autoCapitalize='none'
                        autoFocus
                        placeholder="문의사항을 입력하세요"
                        style={styles.textInputContainer}/>
                    </View>

                    <View style={{marginTop:40}}>
                    <TouchableOpacity style={styles.button} onPress={() => Alert.alert(
                        '확인',
                        '임시저장 하시겠습니까?',
                        [
                          {text: '아니오'},
                          {text: '네'}
                        ],
                        {cancelable: false},
                      )}>
                        <Text style = {{color:"#FFF", fontWeight: "500"}}>임시저장</Text>
                    </TouchableOpacity>
                    </View>
                    
                    <View style={{marginTop:20}}>
                    <TouchableOpacity style={styles.button} onPress={() => Alert.alert(
                        '확인',
                        '문의하시겠습니까?',
                        [
                          {text: '아니오'},
                          {text: '네'}
                        ],
                        {cancelable: false},
                      )}>
                        <Text style = {{color:"#FFF", fontWeight: "500"}}>문의하기</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    textInputContainer:{
        alignItems:"center",
        justifyContent:"center",
        height: 250, 
        borderColor: "#0C00AF", 
        borderWidth: 1, 
        marginLeft:25,
        marginRight:25,
    },
    button : {
        marginHorizontal : 30,
        backgroundColor: "#0C00AF",
        borderRadius : 4,
        height : 52,
        alignItems : "center",
        justifyContent : "center",
    },
    greeting: {
        marginTop : 20,
        fontSize : 18,
        fontWeight : "400",
        textAlign : "center"
    },
})