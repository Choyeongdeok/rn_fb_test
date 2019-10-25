import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, TextInput, FlatList } from 'react-native'

export default class NoticeScreen extends Component {

  constructor(props){
    super(props)
    this.state={
      data : [
        {key: "메인공지 - 사이트이용사항(필독)", value: ""},
        {key: "서브공지 - 개인정보보호법 개정사항", value: ""},
        {key: "공지5 - 개인정보보호법 개정사항", value: ""},
        {key: "공지4 - 개인정보보호법 개정사항", value: ""},
        {key: "공지3 - 개인정보보호법 개정사항", value: ""},
        {key: "공지2 - 개인정보보호법 개정사항", value: ""},
        {key: "공지1 - 개인정보보호법 개정사항", value: ""},
    ]
  }
}

_renderItem = ({item})=>{
  return <TouchableOpacity
              onPress = {() => this.props.navigation.navigate(`${item.value}`)}>
              <Text style={styles.row}>{item.key}</Text>
            </TouchableOpacity>
};

  render() {
    return (
      <View>
        <FlatList
          data={this.state.data}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      flex : 1,
      alignItems : "stretch",
      justifyContent : "center",
      backgroundColor : "#FFF"
  },
  row : {
      flex : 1,
      fontSize : 20,
      padding : 20,
      borderWidth : 1,
      borderColor : "#DDDDDD"
  },
  button : {
      marginHorizontal : 30,
      backgroundColor: "#0C00AF",
      borderRadius : 4,
      height : 52,
      alignItems : "center",
      justifyContent : "center",
      marginTop:30,
      marginBottom:150,
  },
  form: {
      marginBottom : 48,
      marginHorizontal: 30,
      marginTop:48,
  },
  input: {
      borderBottomColor : "#8A8F9E",
      borderBottomWidth : StyleSheet.hairlineWidth,
      height : 40,
      fontSize : 15,
      color : "#161F3D"
  },
});