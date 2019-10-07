import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';


export default class MoreScreen extends Component {
    render() {
        return (
            <View style = {styles.container}>
                <Text>더보기</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        alignItems : "center",
        justifyContent : "center"
    }
});