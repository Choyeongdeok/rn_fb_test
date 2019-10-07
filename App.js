import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs'
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

const AppTabNavigator = createBottomTabNavigator(
    {
        Home : {
            screen : HomeScreen,
            navigationOptions : {
                tabBarIcon: ({tintColor}) => <Ionicons name = "ios-home" size={24} color = {tintColor} ></Ionicons>
            }
        },
        ClockInOut : {
            screen : ClockInOutScreen,
            navigationOptions : {
                tabBarIcon: ({tintColor}) => <Ionicons name = "ios-camera" size={24} color = {tintColor} />
            }
        },
        MyPage : {
            screen : MyPageScreen,
            navigationOptions : {
                tabBarIcon: ({tintColor}) => <Ionicons name = "ios-person" size={24} color = {tintColor} />
            }
        },
        More : {
            screen : MoreScreen,
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
      Auth : AuthStack
    },
    {
      intitialRouteName : "Loading"
    }
  )
)