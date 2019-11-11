import React, { Component } from 'react'
import { Text, View, StyleSheet, Alert, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import * as firebase from 'firebase'


function Item({index1, index2, index3, index4, index5, index6, index7}) {
    return (
        <View style={styles.item}>
            <View style = {{flexDirection : 'row', justifyContent : 'space-between'}}>
                <View>
                    <Text style = {styles.title}>{index1}</Text>
                </View>
                <View>
                    <Text style = {styles.title2}>{index2}</Text>
                </View>
                <View><Text></Text></View>
            </View>
            <Text style={styles.middle}>{index3} ~ {index4}  |  {index5}명  |  {index6} {index7}</Text>   
        </View>
    
    );
}

export default class CheckRequestScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            data : [],
            selectedData : []
        }
    }
 
    componentDidMount() {
        const userId = firebase.auth().currentUser.uid
        const ref = firebase.database().ref('/users/' + userId)
        ref.on("value", snapshot => {
            this.setState({data: snapshot.val()});
        });

        firebase.database().ref('/work').on("value", async (snapshot) => {
            var snapVal = snapshot.val();
            var documentArray = []
            for (var key in snapVal) {
                if (snapVal.hasOwnProperty(key) && (snapVal[key].userId == userId)) {
                    await documentArray.push(snapVal[key])
                }
            }
            this.setState({ selectedData : documentArray})
        })

    }
    
    render() {

        if(this.state.data.permission == false) {
            Alert.alert(
                '권한 없음',
                '기업회원만 접근 가능합니다.',
                [{text : 'OK', onPress : () => this.props.navigation.navigate("More")}],
                {cancelable : false}
            )
        }

        if(this.state.data.signature == '') {
            Alert.alert(
                '접근 실패',
                '전자서명을 등록해주세요.',
                [{text : 'OK', onPress : () => this.props.navigation.navigate("More")}],
                {cancelable : false}
            )
        }

        return (
            <ScrollView style={styles.container}>
                <FlatList
                data = {this.state.selectedData}
                renderItem = {({item}) =>
                <TouchableOpacity onPress = {() => {
                    this.props.navigation.navigate("RequestList", {
                        selectedKey : item.key
                    })
                }}>
                <Item
                    index1 = {item.city}
                    index2 = {item.address}
                    index3 = {item.firstday}
                    index4 = {item.lastday}
                    index5 = {item.member} 
                    index6 = {item.paytype}
                    index7 = {item.pay}
                />
                </TouchableOpacity>
                }
                />
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
        marginTop : 8
    },
    title: {
        fontSize : 20,
        textAlign : 'left',
        color : '#0C00AF',
        marginLeft : 16
    },
    title2 : {
        fontSize : 20,
        textAlign : 'center'
    },
    middle: {
        fontSize: 15,
        textAlign: 'center',
        marginBottom : 8
    },
})