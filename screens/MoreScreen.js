import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class MoreScreen extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data : [
                {key : "공지사항", value : "Notice"},
                {key : "문의사항", value : "Questions"},
                {key : "구인 등록(기업 회원)", value : "WorkRegistration"},
                {key : "신청자 조회(기업 회원)", value : "CheckRequest"}
                //{key : "전자근로계약서 등록", value : "DocumentRegistration"}
                
            ]
        }
    }

    _renderItem = ({item}) => {
        return <TouchableOpacity
                    onPress = {() => this.props.navigation.navigate(`${item.value}`)}>
                        <Text style = {styles.row}>{item.key}</Text>
               </TouchableOpacity>
    };
    
    render() {
        return (
            <View style = {styles.container}>
                <FlatList 
                    data = {this.state.data}
                    renderItem = {this._renderItem}/>
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