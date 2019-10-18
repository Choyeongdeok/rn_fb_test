import React, { Component } from 'react'
import {ScrollView, Text, View, StyleSheet } from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from 'firebase';

export default class ClockRecordScreen extends Component {
    
    constructor(props){
        super(props);
        this.state ={
            year : new Date().getFullYear(),
            month : new Date().getMonth() + 1,
            date : new Date().getDate(),
            hours : new Date().getHours(),
            min : new Date().getMinutes(),
            data : []
        };
    }
    
    componentDidMount() {
        this.interval = setInterval(() => this.setState({
            year : new Date().getFullYear(),
            month : new Date().getMonth() + 1,
            date : new Date().getDate(),
            hours : new Date().getHours(),
            min : new Date().getMinutes(),
        }), 100000);
        const userId = firebase.auth().currentUser.uid
        firebase.database().ref('/users/' + userId + '/clock/' + this.state.year + '/' + this.state.month).on("value",snapshot => {
            var snapVal = snapshot.val();
            var clockArray = []
            for (var key in snapVal) {
                if (snapVal.hasOwnProperty(key)){
                    for (var obj in snapVal[key]){
                        for(var i = 0; i < 2; i++){
                            clockArray.push(snapVal[key][obj][i])
                            console.log(snapVal[key][obj][i])
                        }
                    }
                    clockArray.push(`\n`)
                }
            }
            this.setState({data : clockArray })
        })
        
    }
    
    componentWillMount() {
        clearInterval(this.interval);
    }

    minusMonth = () => {
        this.setState({month : this.state.month - 1}, this.readData)
        if (this.state.month == 1) {
            this.setState({year : this.state.year - 1, month : this.state.month = 12}, this.readData)
            // this.setState({month : this.state.month = 12})
        }   
    }


    plusMonth = () => {
        this.setState({month : this.state.month + 1}, this.readData)
        if (this.state.month == 12) {
            this.setState({year : this.state.year + 1, month : this.state.month = 1}, this.readData)
            // this.setState({month : this.state.month = 1})
        }
    }

    readData = () => {
        const userId = firebase.auth().currentUser.uid
        firebase.database().ref('/users/' + userId + '/clock/' + this.state.year + '/' + this.state.month).on("value",snapshot => {
            var snapVal = snapshot.val();
            var clockArray = []
            for (var key in snapVal) {
                if (snapVal.hasOwnProperty(key)){
                    for (var obj in snapVal[key]){
                        for(var i = 0; i < 2; i++){
                            clockArray.push(snapVal[key][obj][i])
                            console.log(snapVal[key][obj][i])
                        }
                    }
                    clockArray.push(`\n`)
                }
                else {
                    clockArray = null
                }
            }

            if (clockArray[0] == null){
                this.setState({data : <Text style = {{fontSize : 24}}>출근 이력이 없습니다.</Text>})
            }
            else{
               this.setState({data : clockArray })
            }
        })
    }


    render() {
        return (
            <ScrollView style = {{flex : 1}}>
                <View>
                <View style = {{alignItems : "center", justifyContent : "space-around", height : 50, backgroundColor : '#0C00AF' , flexDirection : 'row'}}>
                    
                    
                    <TouchableOpacity onPress = {this.minusMonth}><Ionicons name = "ios-arrow-back" size = {30} color = "#FFFFFF"/></TouchableOpacity>
                    <Text style = {{color : "#FFFFFF", fontSize : 20, }}>{`${this.state.year} 년    ${this.state.month} 월`}</Text>
                    <TouchableOpacity onPress = {this.plusMonth}><Ionicons name = "ios-arrow-forward" size = {30} color = "#FFFFFF" /></TouchableOpacity>
                    
                </View>
                <View style = {{alignItems : "center", justifyContent : "space-between", flexDirection : 'row'}}>
                    <Text style = {{fontSize : 24}} >{this.state.data}</Text>
                </View>
                </View>
            </ScrollView>
        )
            
    }
}

