import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';


export default class MyPageScreen extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data : [
                {key : "개인정보수정"},
                {key : "출/퇴근 이력 조회"},
                {key : "근로계약서 조회"},
                {key : "기초 보건교육 이수증 등록"},
                {key : "자격증/경력(서류) 등록"},
                {key : "계좌 등록"},
                {key : "전자서명 등록"}
            ]
        }
    }

    _renderItem = ({item}) => {
        return <Text style = {styles.row}>
                    {item.key}
               </Text>
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
        alignItems : "center",
        justifyContent : "center",
        backgroundColor : "#FFF"
    },
    row : {
        flex : 1,
        fontSize : 24,
        padding : 20,
        borderWidth : 1,
        borderColor : "#DDDDDD"
    }
});