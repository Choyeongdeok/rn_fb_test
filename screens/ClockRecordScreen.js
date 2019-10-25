import React, { Component } from 'react'
import {ScrollView, Text, View, StyleSheet } from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import * as firebase from 'firebase';


function Item({index1, index2}) {
    return (
        <View style={styles.item}> 
            <Text style={styles.title}>{index1}</Text>
            <Text style={styles.middle}>{index2}</Text>   
        </View>
    
    );
}

export default class ClockRecordScreen extends Component {
    
    constructor(props){
        super(props);
        this.state ={
            year : new Date().getFullYear(),
            month : new Date().getMonth() + 1,
            date : new Date().getDate(),
            hours : new Date().getHours(),
            min : new Date().getMinutes(),
            data : [],
            object : {}
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
<<<<<<< HEAD
        var clockArray = [];
        firebase.database().ref('/users/' + userId + '/clock/' + this.state.year + '/' + this.state.month).on("value", async (snapshot) => {
            var snapVal = snapshot.val();
            if(snapVal == null) {
                clockArray.push({value : ["출근 이력이 없습니다."]})
                this.setState({data : clockArray})
            }
            else {
                for (var key in snapVal) {
                    if (snapVal.hasOwnProperty(key)){
                        await  clockArray.push({time:snapVal[key].clockinout[0], value:snapVal[key].clockinout[1] })   
                    }
                    else {
                        clockArray = null
                    }
                }
                if (clockArray[0] == null){
                    clockArray.push({value : ["출근 이력이 없습니다."]})
                    this.setState({data : clockArray})
                }
                else{
                this.setState({data : clockArray})
                }
            }
=======
        var clockArray = new Array();
        var clockInfo = new Object();

        firebase.database().ref('/users/' + userId + '/clock/' + this.state.year + '/' + this.state.month).on("value",snapshot => {
            var snapVal = snapshot.val();
            
            for (var key in snapVal) {
                if (snapVal.hasOwnProperty(key)){
                    for (var obj in snapVal[key]){
                        clockInfo.keys = snapVal[key][obj][0]
                        clockInfo.value = snapVal[key][obj][1]
                        // clockArray.push(JSON.stringify(clockInfo))
                        

                    }
                }
                clockArray.push(clockInfo)
            }
            // var a = clockArray.toString()
            // a = a.replace(/"keys"/g, 'keys')
            // a = a.replace(/"value"/g, 'value')

            console.log(typeof(clockArray))
            this.setState({data : clockArray})
>>>>>>> 08b543e738e979aeb6289c98c49db0fc7ae4c32b
        })
    }

    componentWillMount() {
        clearInterval(this.interval);
    }

    minusMonth = () => {
        this.setState({month : this.state.month - 1}, this.readData)
        if (this.state.month == 1) {
            this.setState({year : this.state.year - 1, month : this.state.month = 12}, this.readData)
        }   
    }

    plusMonth = () => {
        this.setState({month : this.state.month + 1}, this.readData)
        if (this.state.month == 12) {
            this.setState({year : this.state.year + 1, month : this.state.month = 1}, this.readData)
        }
    }

    readData = () => {
        const userId = firebase.auth().currentUser.uid
        firebase.database().ref('/users/' + userId + '/clock/' + this.state.year + '/' + this.state.month).on("value", async (snapshot) => {
            var snapVal = snapshot.val();
            var clockArray = [];
            for (var key in snapVal) {
                if (snapVal.hasOwnProperty(key)){
                    await  clockArray.push({time:snapVal[key].clockinout[0], value:snapVal[key].clockinout[1] })   
                }
                else {
                    clockArray = null
                }
            }
            if (clockArray[0] == null){
                clockArray.push({value : ["출근 이력이 없습니다."]})
                this.setState({data : clockArray})
            }
            else{
               this.setState({data : clockArray})
            }
        })
    }
    
    render() {
<<<<<<< HEAD
=======
        console.log(this.state.data)
        // console.log(this.state.data)
        // var fixdata = this.state.data.toString();
        // var newdata = fixdata.replace(`"`, ``)
        // console.log(typeof(fixdata))
        // console.log(newdata)
>>>>>>> 08b543e738e979aeb6289c98c49db0fc7ae4c32b
        return (
            
            <ScrollView style = {{flex : 1}}>
                <View style = {{alignItems : "center", justifyContent : "space-around", height : 50, backgroundColor : '#0C00AF' , flexDirection : 'row'}}>
                    
                    <TouchableOpacity onPress = {this.minusMonth}><Ionicons name = "ios-arrow-back" size = {30} color = "#FFFFFF"/></TouchableOpacity>
                    <Text style = {{color : "#FFFFFF", fontSize : 20, }}>{`${this.state.year} 년    ${this.state.month} 월`}</Text>
                    <TouchableOpacity onPress = {this.plusMonth}><Ionicons name = "ios-arrow-forward" size = {30} color = "#FFFFFF" /></TouchableOpacity>
                    
                </View>
<<<<<<< HEAD
                    <FlatList 
                        data = {this.state.data}
                        renderItem = {({item}) => 
                            <Item 
                                index1 = {item.value}
                                index2 = {item.time}
                            />        
                        }
=======
                <View style = {{alignItems : "stretch", justifyContent : "center", flexDirection : 'row'}}>
                    {/* <Text style = {{fontSize : 24}} >{this.state.data}</Text> */}
                    <FlatList 
                        // numColumns = {2}
                        data = {this.state.data}
                        renderItem = {({item}) => {
                            return <Text>
                                {item.keys} {item.value}
                            </Text>
                        }}
>>>>>>> 08b543e738e979aeb6289c98c49db0fc7ae4c32b
                    />
            </ScrollView>
        )
            
    }
}

const styles = StyleSheet.create({
    item: {
        borderBottomWidth:0.5,
        marginVertical: 8,
        alignItems : "stretch"
      },
      title: {
        fontSize: 20,
        textAlign:'left',
        marginLeft : 20
      },
      middle:{
          fontSize: 15,
          textAlign:'left',
          marginLeft : 15
      },
      middle2:{
        fontSize: 20,
        textAlign:'center',
    }
})