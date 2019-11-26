import React, { Component } from 'react'
import { Button, Image, View, Text, TouchableOpacity,StyleSheet, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import * as firebase from 'firebase'

export default class CertificationScreen extends Component {
    
    state = {
        image: '',
        selected: true,
    };

    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }
    
    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 2],
        });

        if (!result.cancelled) {
            this.setState({ image: result.uri, selected: false });
            console.log(result.uri)
        }
    };

    saveImage = () => {
        const userId = firebase.auth().currentUser.uid
        firebase.database().ref('/users/' + userId).update({
            license_uri : image
        })
        Alert.alert(
            '저장 완료',
            '보건교육이수증이 저장되었습니다.',
            [{text : 'OK', onPress : () => this.props.navigation.navigate("MyPage")}],
            {cancelable : false}
        )
    }

    render() {
        return (
            <ScrollView>
                <View style= {{ flex:1, alignItems:'center'}}>
                    <TouchableOpacity onPress={this._pickImage}>
                        <View style={{height: 400,  borderWidth: 0.5, width:350, justifyContent: 'center', alignItems: 'center',marginTop:32 }}>
                        {
                        this.state.selected
                            ?(<View style={{alignItems:'center',justifyContent:'center'}}><FontAwesome name="camera" size={80} color="gray"></FontAwesome>
                                <Text>사진등록</Text></View>)
                            :(<View><Image source={{uri:this.state.image}} style={{height:400,width:350}}/></View>)
                        }
            
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}  onPress={this.saveImage}>
                            <Text style = {{color:"#FFF", fontWeight: "500"}}>등록하기</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}
  
const styles = StyleSheet.create({
    button : {
        marginHorizontal : 20,
        backgroundColor: "#0C00AF",
        borderRadius : 4,
        height : 52,
        alignItems : "center",
        justifyContent : "center",
        marginTop: 32,
        width: 280,
        marginBottom : 32
    }
})
