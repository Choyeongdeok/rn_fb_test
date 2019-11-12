import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native'
import * as firebase from 'firebase'
import {ListItem, CheckBox, Body} from 'native-base'

export default class RequestListScreen extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            key : '',
            data : [],
            checked : []
        }
    }


    componentDidMount() {
        const {navigation} = this.props;
        selectedKey = navigation.getParam('selectedKey')
        this.setState({key : selectedKey})

        firebase.database().ref('/work/' + selectedKey + '/requestMember/').on(
            "value", async (snapshot) => {
                var snapVal = snapshot.val();
                var memberList = []
                for(var key in snapVal) {
                    memberList.push(snapVal[key])
                }
                if (memberList[0] == null) {
                    memberList.push({name : '신청자가 없습니다'})
                }
                // console.log(memberList)
                await this.setState({data : memberList})
                
            }
        )
    }

    changeCheck = (index) => {
        let checked = [...this.state.checked];
        checked[index] = !checked[index];
        this.setState({ checked });
    }

    selectMember = () => {
        let checked = [...this.state.checked];
        var count = 0
        for (var index in checked) {
            if (checked[index]) {
                count++
            }
        }
        firebase.database().ref('/work/' + this.state.key).on(
            "value", async (snapshot) => {
                var member = snapshot.val().member;
                if(count != member) {
                    Alert.alert(
                        '선택 실패',
                        '선택한 인원 수가 모집 인원 수와 일치하지 않습니다.',
                        [{text : "ok"}]
                    )
                }
                
                else {
                    console.log(snapshot.val().document)
                }
            }
        )
        
    }

    render() {
        let { data, checked } = this.state;
        return (
            <ScrollView>
                <FlatList
                data = {this.state.data}
                extraData={this.state}
                renderItem = {({item, index}) =>
                    <View style = {styles.item}>
                        <ListItem>
                            <CheckBox
                            style = {{borderColor : "#0C00AF"}}
                            checked = {checked[index]}
                            onPress = {() => this.changeCheck(index)}
                            />
                            <Body>
                                <View style = {{marginLeft : 8}}>
                                <Text>{item.name}</Text>
                                </View>
                            </Body>
                        </ListItem>
                    </View>
                }
                />

                <TouchableOpacity style={styles.button} onPress={this.selectMember}>
                    <Text style = {{color:"#FFF", fontWeight: "500"}}>선택 완료</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex :1
    },
    item: {
        borderBottomWidth: 0.5,
        marginTop : 8,
    },
    button : {
        marginHorizontal : 30,
        backgroundColor: "#0C00AF",
        borderRadius : 4,
        height : 52,
        alignItems : "center",
        justifyContent : "center",
        marginBottom : 32,
        marginTop : 32
    }
})