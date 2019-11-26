import React, {Component} from 'react';
import { StyleSheet, View, Image, Text, Platform,  Button, Alert } from 'react-native';
import * as ExpoPixi from 'expo-pixi';
import * as firebase from 'firebase'

export default class SignatureScreen extends Component {

    constructor(props) {
        super(props)
        this.state = { data : [] }
    }

    state = {
        image: null,
        strokeColor: 0
    };

    componentDidMount() {
        const userId = firebase.auth().currentUser.uid
        const ref = firebase.database().ref('/users/' + userId)
        ref.on("value", snapshot => {
            this.setState({data: snapshot.val()});
            console.log(snapshot.val().signature)
        });
    }

    onReady = () => {
        console.log('ready!');
    };

    saveCanvas = async () => {

        if(this.state.data.signature) {
            Alert.alert(
                '저장 실패',
                '이미 서명이 존재합니다.',
                [{text : 'OK', onPress : () => this.props.navigation.navigate("MyPage")}],
                {cancelable : false}
            )
        }

        else {
            const signature_result = await
            this.refs.signatureCanvas.takeSnapshotAsync({
                format: 'jpeg', // 'png' also supported
                quality: 1, // quality 0 for very poor 1 for very good
                result: 'file' // 
            })
              //console.log(signature_result.uri)
            const userId = firebase.auth().currentUser.uid
            firebase.database().ref('/users/' + userId).update({
                signature : signature_result.uri
            })
            Alert.alert(
                '저장 완료',
                '디지털 서명이 등록되었습니다.',
                [{text : 'OK', onPress : () => this.props.navigation.navigate("MyPage")}],
                {cancelable : false}
            )
        }
    }

    clearCanvas = () => {
        this.refs.signatureCanvas.clear()
    }

    render() {
        return (
            <View style={styles.container}>
               <View style = {{alignItems : 'center', marginTop : 32}}>
                  <View style = {{marginBottom : 8}}>
                      <Text>등록된 서명</Text>
                  </View>
                  <Image
                  style = {{width : 100, height : 70, borderColor : '#0C00AF', borderWidth : 1}}
                  source = {{uri : this.state.data.signature}}
                  />
                </View>
            
                <View style={styles.sketchContainer}>
                <ExpoPixi.Signature
                    ref = 'signatureCanvas'
                    style={styles.sketch}
                    strokeColor={0x000000}
                    strokeAlpha={1}
                    strokeWidth = {2}
                    onReady={this.onReady}
                />
                <Text style = {styles.underline}>서명은 한 번만 등록 가능합니다.</Text>
                </View>
                
                <View style = {{ justifyContent : "space-around", flexDirection : 'row', alignItems : "center", marginTop : 20}}>
                    <Button
                        color={'#0C00AF'}
                        title="reset"
                        style={styles.button}
                        onPress={this.clearCanvas}
                    />
                    <Button
                        color={'#0C00AF'}
                        title="save"
                        style={styles.button}
                        onPress = {this.saveCanvas}
                    />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sketch: {
        flex: 1,
        backgroundColor : 'white',
        borderColor : '#0C00AF',
        borderWidth : 1  
    },
    sketchContainer: {
        height: '50%',
        marginRight : 32,
        marginLeft : 32,
        marginTop : 32
    },
    image: {
        flex: 1,
    },
    label: {
        width: '100%',
        padding: 5,
        alignItems: 'center',
    },
    button: {
        zIndex: 1,
        padding: 12,
        minWidth : 56,
        minHeight: 48,
    },
    underline : {
        marginTop : 5,
        color : 'red',
        fontSize : 10
    }
});