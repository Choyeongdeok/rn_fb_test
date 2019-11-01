import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import SignaturePad from 'react-native-signature-pad'

export default class SignatureScreen extends Component{

  state = {
    sign : ''
  }
  render() {
    return (
      <View style={{flex: 1}}>
          <SignaturePad onError={this._signaturePadError}
                        onChange={this._signaturePadChange}
                        style={{flex: 1, backgroundColor: 'white'}}
                        
                        />
                        
      </View>
    )
  };

  _signaturePadError = (error) => {
    console.error(error);
  };

  _signaturePadChange = ({base64DataUrl}) => {
    this.setState({sign : base64DataUrl})
  };
}
 