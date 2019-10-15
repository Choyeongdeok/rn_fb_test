import React, {Component} from 'react';
import {Alert, Text, View, StyleSheet, Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as firebase from 'firebase';


export default class ClockInOutScreen extends Component {

    state = {
        hasCameraPermission: null,
        scanned: false,
        data : '',
        clockinout : [],
        time : ''
    };

    componentDidMount() {
        this.getPermissionsAsync();
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        // var sec = new Date().getSeconds(); //Current Seconds

        this.setState({
            //Setting the value of the date time
            time:
                year + '년 ' + month + '월 ' + date + '일 ' + hours + '시' + min + '분',
            year : year,
            month : month,
            date : date
        });
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
                justifyContent: 'flex-end'
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

       
        

        const userId = firebase.auth().currentUser.uid
        firebase.database().ref('/users/' + userId + '/clock/' + this.state.year + '/' + this.state.month).push({
            clockinout : [this.state.time, data]
        })
        Alert.alert(
            'Alert Title',
            `${this.state.time} ${data}`, 
            [
                {text: 'OK', onPress: () => this.setState({`${this.state.time }`})}
            ],
            {cancelable: false}
        )
    };
}