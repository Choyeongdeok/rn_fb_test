import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import RoundButton from '../Components/RoundButton';

export default class RegisterScreen extends Component {

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>데일리워킹 회원가입 </Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={styles.nav1}>
                        <View style={{width: 100, height: 110,marginTop: 30, backgroundColor:'gray'}}>
                        </View>
                    <RoundButton
                        style={{ marginTop: 30, width:'80%' }}
                        title={'개인 회원 가입'}
                        onPress={() => {
                        this.props.navigation.navigate("RegisterUser");}}
                    />
                </View>

                <View style={styles.nav1}>
                    <View style={{width: 100, height: 110,marginTop: 30, backgroundColor:'gray'}}>
                    </View>
                    <RoundButton
                        style={{ marginTop: 30, width:'80%'}}
                        title={'기업 회원 가입'}
                        onPress={() => {
                        this.props.navigation.navigate("RegisterCompany");}}
                    />
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems :"center"
    },
    title:{
        fontSize: 30,
        marginTop: 25,
        alignContent: 'center',
        textAlign: 'center',
        color: "#0C00AF"   
    },
    nav1:{
        width : 160, 
        height : 240, 
        marginTop : 50, 
        borderWidth : 1,
        alignItems : 'center',
        marginLeft : 8,
        marginRight : 8,
        borderRadius : 10
    }
})