import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import * as firebase from 'firebase'



function Item({index1}) {
    return (
        <View>
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
                    <Text style = {{marginRight : 16}}>{index2}</Text>
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

        firebase.database().ref('/users/' + userId + '/savedDocument/').on(
            "value", async snapshot => {
                var snapVal = snapshot.val()
                var myuriList = []
                for(var key in snapVal) {
                    myuriList.push(snapVal[key])
                }
                await this.setState({uri : myuriList})
                
            }
        )
    }

    render() {
        return (
            <ScrollView >
                <View>
                    <View style = {{marginTop : 16, marginLeft : 8}}>
                        <Text style = {{fontSize : 24}}>작성중인 근로계약서</Text>
                    </View>
                        <View style = {{marginTop : 32, marginBottom : 32}}>
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
                    
                        <View style = {{marginLeft : 8}}>
                            <Text style = {{fontSize : 24}}>저장된 근로계약서</Text>
                        </View>
                            <View style = {{marginTop : 32, marginBottom : 32}}>
                                <FlatList
                                    data = {this.state.uri}
                                    renderItem = {({item}) =>
                                        <TouchableOpacity
                                        onPress = {() => {
                                            this.props.navigation.navigate("DocumentImage", {data : item.imageuri})
                                        }}>
                                            <Item2
                                            index1 = {item.name}
                                            index2 = {item.timerecord}
                                            />
                                        </TouchableOpacity>
                                    }
                                />
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
        marginTop : 8
    },
    title: {
        fontSize : 16,
        textAlign : 'left',
        color : '#0C00AF',
        marginLeft : 16
    },
})