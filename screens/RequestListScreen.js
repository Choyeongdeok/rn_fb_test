import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet } from 'react-native'
import * as firebase from 'firebase'
import {ListItem, CheckBox, Body} from 'native-base'

function Item({index1}) {

    state = {
        checked : false
    }
//함수 해결하기
    return (
        <View style = {styles.item}>
            <ListItem>
                <CheckBox
                checked = {this.state.checked}
                onPress = {this.changeCheck}
                />
                <Body>
                    <View style = {{marginLeft : 8}}>
                    <Text>{index1}</Text>
                    </View>
                </Body>
            </ListItem>
        </View>
    )
}
changeCheck = () => {
    this.setState({checked : !this.state.checked})
}

export default class RequestListScreen extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            key : '',
            data : []
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
                    memberList.push('신청자가 없습니다')
                }
                console.log(memberList)
                await this.setState({data : memberList})
                
            }
        )
    }

    
    render() {
        return (
            <View>
                <FlatList
                data = {this.state.data}
                renderItem = {({item}) =>
                <Item
                    index1 = {item.name}
                />
                }
                />
            </View>
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
})