import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

export default class MyPageScreen extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data : [
                {key : "개인정보수정", value : "Update"},
                {key : "출/퇴근 이력 조회", value : "ClockRecord"},
                {key : "근로계약서 조회", value : "WorkingRecord"},
                {key : "기초 보건교육 이수증 등록", value : "Certification"},
                {key : "자격증/경력(서류) 등록", value : "Qualification"},
                {key : "계좌번호 등록", value : "AccountNumber"},
                {key : "전자서명 등록", value : "Signature"}
            ]
        }
    }

    //<Text onPress = {() => this.props.navigation.navigate("Update")}>

    _renderItem = ({item}) => {
        return <TouchableOpacity
                onPress = {() => this.props.navigation.navigate(`${item.value}`)}
                >
                    <Text style = {styles.row}>
                        {item.key}
                    </Text>
               </TouchableOpacity>
    };
    
    render() {
        return (
            <View style = {styles.container}>
                <FlatList 
                    data = {this.state.data}
                    renderItem = {this._renderItem}
                    
                />
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        alignItems : "stretch",
        justifyContent : "center",
        backgroundColor : "#FFF"
    },
    row : {
        flex : 1,
        fontSize : 20,
        padding : 20,
        borderWidth : 1,
        borderColor : "#DDDDDD"
    }
});