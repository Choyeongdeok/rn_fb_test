import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import * as firebase from 'firebase'



function Item({index1}) {
    return (
        <View style={styles.item}>
            <View style = {{flexDirection : 'row', justifyContent : 'space-between'}}>
                <View>
                    <Text style = {styles.title}>{index1} 근로계약서</Text>
                </View>
            </View>
        </View>
    );
}

export default class WorkingRecordScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data : [],
            uri : ''
        }
    }

    componentDidMount() {
        const userId = firebase.auth().currentUser.uid
        firebase.database().ref('/users/' + userId + '/mydocument/').on(
            "value", async snapshot => {
                var snapVal = snapshot.val()
                var mydocumentList = []
                for(var key in snapVal) {
                    mydocumentList.push(snapVal[key])
                    // console.log(snapVal[key])
                    // for (var obj in snapVal[key]) {
                    //     mydocumentList.push(snapVal[key][obj])
                    //     console.log(snapVal[key][obj])
                    // }
                }
                // if(mydocumentList[0] == null) {
                //     mydocumentList.push({})
                // }
                await this.setState({data : mydocumentList})
            }
        )

        firebase.database().ref('/users/' + userId + '/savedDocument/').on(
            "value", async snapshot => {
                var snapVal = snapshot.val()
                var myuriList = []
                for(var key in snapVal) {
                    myuriList.push(snapVal[key].uri)
                    console.log(snapVal[key].uri)
                }
                await this.setState({uri : myuriList})
                
            }
        )
    }

    render() {
        return (
            <ScrollView>
                <View style = {styles.container}>
                <View style = {{marginLeft : 8}}><Text>작성중인 근로계약서</Text></View>
                    <View style = {{marginTop : 8}}>
                        <FlatList
                        data = {this.state.data}
                        renderItem = {({item}) => 
                            <TouchableOpacity onPress = {() => {
                                this.props.navigation.navigate("SaveDocument", {data : item})
                            }}>
                                <Item
                                    index1 = {item.company}
                                />
                            </TouchableOpacity>
                        }
                        />
                    </View>
                </View>
                <View style = {styles.container}>
                <View style = {{marginLeft : 8}}><Text>저장된 근로계약서</Text></View>
                <Image
                style = {{width : 100, height : 100, borderWidth : 1}}
                source = {{uri : this.state.uri}}
                />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        marginTop : 32,
        marginBottom :32
    },
    item: {

    },
    title: {
        fontSize : 20,
        textAlign : 'left',
        color : '#0C00AF',
        marginLeft : 16
    },
})