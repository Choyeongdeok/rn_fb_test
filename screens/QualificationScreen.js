import React, { Component } from 'react'
import { Text, View, ScrollView, Image } from 'react-native'
// import ViewShot from 'react-native-view-shot'

export default class QualificationScreen extends Component {
    
    // state = {
    //     imageURI : ''
    // }
    // onCapture = uri => {
    //     this.setState({imageURI : uri})
    //     console.log(uri)
    // }
    
    // onImageLoad = () => {
    //     this.refs.viewShot.capture().then(uri => {
    //       console.log("do something with ", uri);
    //     })
    // };

    render() {
        return (
            <ScrollView>
                {/* <ViewShot ref = "viewShot"> */}
                    <View>
                        <Text> 자격증/경력(서류) 등록 </Text>
                    </View>
                {/* </ViewShot> */}
                <View style = {{marginTop : 36}}>
                    {/* <Image
                    style = {{width : 100, height : 70, borderColor : '#0C00AF', borderWidth : 1}}
                    onLoad={this.onImageLoad}
                    /> */}
                </View>
            </ScrollView>
        )
    }
}
