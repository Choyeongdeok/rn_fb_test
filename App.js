import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

import {Ionicons} from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import ClockInOutScreen from './screens/ClockInOutScreen';
import MyPageScreen from './screens/MyPageScreen';
import MoreScreen from './screens/MoreScreen';


var firebaseConfig = {
  apiKey: "AIzaSyDdXYffxGYxrftv-HxbB6LGfyRWQ0rAcHY",
  authDomain: "test-a6e2f.firebaseapp.com",
  databaseURL: "https://test-a6e2f.firebaseio.com",
  projectId: "test-a6e2f",
  storageBucket: "",
  messagingSenderId: "102395404433",
  appId: "1:102395404433:web:ac541960f6a2860ec49f30",
  measurementId: "G-13MWHS17LP"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const HomeStack = createStackNavigator({
  Home : {
    screen : HomeScreen,
    navigationOptions : {
      headerLeft : <Text style = {{marginLeft : 20}}>asdf</Text>,
      headerTitle : <View style={{alignItems: "center", flex : 1}}><Text style = {{fontSize : 24}}>Home</Text></View>,
      headerRight : <Text style = {{marginRight : 20}}>asdf</Text>
      }
    }
  })


const ClockInOutStack = createStackNavigator({
  ClockInOut : {
    screen : ClockInOutScreen,
    navigationOptions : {
      headerLeft : <Text style = {{marginLeft : 20}}>asdf</Text>,
      headerTitle : <View style={{alignItems: "center", flex : 1}}><Text style = {{fontSize : 24}}>ClockInOut</Text></View>,
      headerRight : <Text style = {{marginRight : 20}}>asdf</Text>
      }
    }
})

const MyPageStack = createStackNavigator({
  MyPage : {
    screen : MyPageScreen,
    navigationOptions : {
      headerLeft : <Text style = {{marginLeft : 20}}>asdf</Text>,
      headerTitle : <View style={{alignItems: "center", flex : 1}}><Text style = {{fontSize : 24}}>MyPage</Text></View>,
      headerRight : <Text style = {{marginRight : 20}}>asdf</Text>
      }
    }
  })

const MoreStack = createStackNavigator({
  More : {
    screen : MoreScreen,
    navigationOptions : {
      headerLeft : <Text style = {{marginLeft : 20}}>asdf</Text>,
      headerTitle : <View style={{alignItems: "center", flex : 1}}><Text style = {{fontSize : 24}}>More</Text></View>,
      headerRight : <Text style = {{marginRight : 20}}>asdf</Text>
      }
    }
  })


const AppTabNavigator = createBottomTabNavigator(
    {
        Home : {
            screen : HomeStack,
            navigationOptions : {
                tabBarIcon: ({tintColor}) => <Ionicons name = "ios-home" size={24} color = {tintColor} ></Ionicons>
            }
        },
        ClockInOut : {
            screen : ClockInOutStack,
            navigationOptions : {
                tabBarIcon: ({tintColor}) => <Ionicons name = "ios-camera" size={24} color = {tintColor} />
            }
        },
        MyPage : {
            screen : MyPageStack,
            navigationOptions : {
                tabBarIcon: ({tintColor}) => <Ionicons name = "ios-person" size={24} color = {tintColor} />
            }
        },
        More : {
            screen : MoreStack,
            navigationOptions : {
                tabBarIcon: ({tintColor}) => <Ionicons name = "ios-list-box" size={24} color = {tintColor} />
            }
        }
    },
    {
      tabBarOptions : {
        activeTintColor : "#0C00AF",
        inactiveTintColor : "#8888C4",
        showLabel : false
      }
    }
)


const AuthStack = createStackNavigator({
  Login : LoginScreen,
  Register : RegisterScreen
})



export default createAppContainer(
  createSwitchNavigator(
    {
      Loading : LoadingScreen,
      App : AppTabNavigator,
      Auth : AuthStack,
      // Main : AppStackNavigator
    },
    {
      intitialRouteName : "Loading"
    }
  )
)