import React, {Component} from 'react';
import {View, Platform, Text, StyleSheet, TouchableOpacity, LayoutAnimation, ScrollView, FlatList, Alert} from 'react-native';
import * as firebase from 'firebase';
import RNPicker from "rn-modal-picker";
import Slider from '../Components/Slider'

const images = [
    "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1485550409059-9afb054cada4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    "https://images.unsplash.com/photo-1429087969512-1e85aab2683d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
    "https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
];

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

export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            subTitle: "실시간 급구 인력모집",
            data : [],
            dataSource: [
                {name: "전체"},
                {name: "서울" },
                {name: "부산" },
                {name: "대구" },
                {name: "광주" },
                {name: "대전" },
                {name: "울산" },
                {name: "인천" },
                {name: "세종" },
                {name: "경기" },
                {name: "강원" },
                {name: "충북" },
                {name: "충남" },
                {name: "전북" },
                {name: "전남" },
                {name: "경북" },
                {name: "경남" },
                {name: "제주" }
            ],
            placeHolderText: "지역을 선택하세요",
            selectedText: ""
        };
    }
    
    componentDidMount() {
        const ref = firebase.database().ref('/work/')
        ref.on("value", async (snapshot) => {
            var snapVal = snapshot.val();
            var documentArray = []
            for (var key in snapVal) {
                if (snapVal.hasOwnProperty(key)) {
                    await documentArray.push(snapVal[key])
                }
            }
            this.setState({data : documentArray})
        });
    }
      
    _selectedValue(index, item) {
        const ref = firebase.database().ref('/work/')
        ref.on("value", async (snapshot) => {
            var snapVal = snapshot.val();
            var documentArray = []
            for (var key in snapVal) {
                if (snapVal.hasOwnProperty(key)) {
                    await documentArray.push(snapVal[key])
                }
            }
            this.setState({data : documentArray})
            this.setState({ selectedText: item.name});
            var selectedData = []
            for (var i = 0; i < this.state.data.length; i++) {
                if (item.name === '전체') {
                    selectedData = documentArray
                    break;
                }
                
                else if (item.name === this.state.data[i].city) {
                    selectedData.push(this.state.data[i])
                }
            }
            this.setState({data : selectedData})
        });
    }
    
    render() {

        return (
          
            <ScrollView style={styles.container}>
                <RNPicker
                dataSource={this.state.dataSource}
                dummyDataSource={this.state.dataSource}
                defaultValue={false}
                pickerTitle={"지역검색"}
                showSearchBar={false}
                disablePicker={false}
                changeAnimation={"none"}
                // searchBarPlaceHolder={"상세지역을 검색하세요"}
                showPickerTitle={true}
                // searchBarContainerstyle={this.props.searchBarContainerstyle}
                pickerStyle={styles.pickerstyle}
                selectedLabel={this.state.selectedText}
                placeHolderLabel={this.state.placeHolderText}
                selectLabelTextStyle={styles.selectLabelTextstyle}
                placeHolderTextStyle={styles.placeHolderTextstyle}
                dropDownImageStyle={styles.dropDownImagestyle}
                selectedValue={(index, name) => this._selectedValue(index, name)}
                />
            <Slider images={images} />
            
            <FlatList
            data = {this.state.data}
            renderItem = {({item}) =>
                <TouchableOpacity onPress = {() => {
                    this.props.navigation.navigate("Request", {
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
        borderBottomWidth: 0.5
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
    row: {
        fontSize: 13,
        textAlign: 'center',
        color: 'blue',
    },
    selectLabelTextstyle: {
        color: "#000",
        textAlign: "center",
        width: "100%",
        padding: 10,
        flexDirection: "row",
        fontSize: 18
    },
    placeHolderTextstyle: {
        color: "#D3D3D3",
        fontSize: 20,
        padding: 9.5,
        textAlign: 'center',
        width: "100%",
        flexDirection: "row"
    },
    pickerstyle: {
        paddingLeft: 30,
        elevation: 3,
        paddingRight: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOpacity: 1.0,
        borderWidth: 1,
        shadowRadius: 10,
        backgroundColor: "rgba(255,255,255,1)",
        shadowColor: "#d3d3d3",
        borderRadius: 5,
        flexDirection: "row",
    }
});