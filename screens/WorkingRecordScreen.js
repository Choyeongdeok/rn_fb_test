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

function Item2({index1, index2}) {
    return (
        <View style={styles.item}>
            <View style = {{flexDirection : 'row', justifyContent : 'space-between'}}>
                <View>
                    <Text style = {styles.title}>{index1}</Text>
                </View>
                <View>
                    <Text style = {styles.title}>{index2}</Text>
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
                }
                await this.setState({data : mydocumentList})
                
            }
        )


        // firebase.database().ref('/users/' + userId).on(
        //     "value", async snapshot => {
        //         await this.setState({uri : snapshot.val().signature})
        //     }
        // )
        firebase.database().ref('/users/' + userId + '/savedDocument/').on(
            "value", async snapshot => {
                var snapVal = snapshot.val()
                var myuriList = []
                for(var key in snapVal) {
                    myuriList.push(snapVal[key])
                }
                console.log(myuriList)
                await this.setState({uri : myuriList})
                
            }
        )
    }

    render() {
        return (
            <ScrollView >
                <View>
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
                    
                    <View style = {{marginLeft : 8}}><Text>저장된 근로계약서</Text></View>
                        <View>
                            <FlatList
                            data = {this.state.uri}
                            renderItem = {({item}) =>
                                <Item2
                                index1 = {item.name}
                                index2 = {item.timerecord}
                                />
                        }
                            />
                            {/* <Image
                            style = {{width : 120, height : 200, borderColor : '#0C00AF', borderWidth : 1}}
                            source = {{uri : this.state.uri[0]}}
                            /> */}
                        </View>
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