import React, {Component} from 'react';
import {Alert, Text, View, StyleSheet, Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as firebase from 'firebase';


export default class ClockInOutScreen extends Component {

    constructor(props){
        super(props);
        this.state ={
            year : new Date().getFullYear(),
            month : new Date().getMonth() + 1,
            date : new Date().getDate(),
            hours : new Date().getHours(),
            min : new Date().getMinutes()
        };
    }

    state = {
        hasCameraPermission: null,
        scanned: false,
        data : '',
        clockinout : []
    };

    componentDidMount() {
        this.getPermissionsAsync();
        this.interval = setInterval(() => this.setState({
            year : new Date().getFullYear(),
            month : new Date().getMonth() + 1,
            date : new Date().getDate(),
            hours : new Date().getHours(),
            min : new Date().getMinutes(),
        }), 1000);
        
    }

    componentWillMount() {
        clearInterval(this.interval);
    }

    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    };

    render() {
        const { hasCameraPermission, scanned } = this.state;

        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }

        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }
        
        return (
            <View
            style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-end',
                marginTop : 32,
                marginBottom : 32
            }}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && (
                <Button title={'터치하여 스캔 해주세요.'} onPress={() => this.setState({ scanned: false })} />
            )}
            </View>
        );
    }
    handleBarCodeScanned = ({ type, data }) => {
        this.setState({ scanned: true })
        this.setState({timerecord : `${this.state.year}년 ${this.state.month}월 ${this.state.date}일 ${this.state.hours}시 ${this.state.min}분`})
        const userId = firebase.auth().currentUser.uid
        firebase.database().ref('/users/' + userId + '/clock/' + this.state.year + '/' + this.state.month).push({
            clockinout : [`${this.state.year}년 ${this.state.month}월 ${this.state.date}일 ${this.state.hours}시 ${this.state.min}분`, data]
        })
        Alert.alert(
            'Alert Title',
            `${this.state.year}년 ${this.state.month}월 ${this.state.date}일 ${this.state.hours}시 ${this.state.min}분 ${data}`, 
            [
                {text: 'OK', onPress: () => console.log
                (`${this.state.timerecord }`)}
            ],
            {cancelable: false}
        )
    };
}