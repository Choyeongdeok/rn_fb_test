import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import RegisterCompanyScreen from './screens/RegisterCompanyScreen'
import RegisterUserScreen from './screens/RegisterUserScreen';

import {Ionicons} from '@expo/vector-icons';

//홈
import HomeScreen from './screens/HomeScreen';
import RequestScreen from './screens/RequestScreen'

//출퇴근 QR코드
import ClockInOutScreen from './screens/ClockInOutScreen';

//마이페이지
import MyPageScreen from './screens/MyPageScreen';
import UpdateScreen from './screens/UpdateScreen';
import ClockRecordScreen from './screens/ClockRecordScreen';
import WorkingRecordScreen from './screens/WorkingRecordScreen';
import CertificationScreen from './screens/CertificationScreen';
import QualificationScreen from './screens/QualificationScreen';
import AccountNumberScreen from './screens/AccountNumberScreen';
import SignatureScreen from './screens/SignatureScreen';
import SaveDocumentScreen from './screens/SaveDocumentScreen';
import DocumentImageScreen from './screens/DocumentImageScreen'

//더보기
import MoreScreen from './screens/MoreScreen';
import QuestionsScreen from './screens/QuestionsScreen';
import WorkRegistrationScreen from './screens/WorkRegistrationScreen'
import NoticeScreen from './screens/NoticeScreen';
import DocumentRegistrationScreen from './screens/DocumentRegistrationScreen';
import CheckRequestScreen from './screens/CheckRequestScreen'
import RequestListScreen from './screens/RequestListScreen'

console.disableYellowBox = true;

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
            headerLeft : <Text style = {{marginLeft : 20}}></Text>,
            headerTitle : <View style={{alignItems: "center", flex : 1}}><Text style = {{fontSize : 24}}>홈</Text></View>,
            headerRight : <TouchableOpacity onPress = {() => {
                firebase.auth().signOut()
                }
            }>
                <Text  style = {{marginRight : 20}}>로그아웃</Text>
            </TouchableOpacity>
        }
    },
    Request : {
        screen : RequestScreen,
        navigationOptions : {
            headerTitle : <View style={{alignItems: "center", flex : 1}}><Text style = {{fontSize : 24}}>신청하기</Text></View>,
            headerRight : <Text style = {{marginRight : 20}}></Text>
        }
    }
})


const ClockInOutStack = createStackNavigator({
    ClockInOut : {
        screen : ClockInOutScreen,
        navigationOptions : {
            headerTitle : <View style={{alignItems: "center", flex : 1}}><Text style = {{fontSize : 24}}>QR코드 촬영(출, 퇴근)</Text></View>,
        }
    }
})

const MyPageStack = createStackNavigator({
    MyPage : {
        screen : MyPageScreen,
        navigationOptions : {
            headerTitle : <View style={{alignItems: "center", flex : 1}}><Text style = {{fontSize : 24}}>마이페이지</Text></View>,
        }
    },
    Update : {
        screen : UpdateScreen,
        navigationOptions : {
            headerTitle : <View style={{alignItems: "center", flex : 1}}><Text style = {{fontSize : 24}}>개인정보수정</Text></View>,
            headerRight : <Text style = {{marginRight : 20}}></Text>
        }
    },
    ClockRecord : {
        screen : ClockRecordScreen,
        navigationOptions : {
            headerTitle : <View style={{alignItems: "center", flex : 1}}><Text style = {{fontSize : 24}}>출/퇴근 이력 조회</Text></View>,
            headerRight : <Text style = {{marginRight : 20}}></Text>
        }
    },
    WorkingRecord : {
        screen : WorkingRecordScreen,
        navigationOptions : {
            headerTitle : <View style={{alignItems: "center", flex : 1}}><Text style = {{fontSize : 24}}>근로계약서 작성 이력</Text></View>,
            headerRight : <Text style = {{marginRight : 20}}></Text>
        }
    },
    Certification : {
        screen : CertificationScreen,
        navigationOptions : {
            headerTitle : <View style={{alignItems: "center", flex : 1}}><Text style = {{fontSize : 24}}>보건교육 이수증 등록</Text></View>,
            headerRight : <Text style = {{marginRight : 20}}></Text>
        }
    },
    Qualification : {
        screen : QualificationScreen,
        navigationOptions : {
            headerTitle : <View style={{alignItems: "center", flex : 1}}><Text style = {{fontSize : 24}}>자격증/경력(서류) 등록</Text></View>,
            headerRight : <Text style = {{marginRight : 20}}></Text>
        }
    },
    AccountNumber : {
        screen : AccountNumberScreen,
        navigationOptions : {
            headerTitle : <View style={{alignItems: "center", flex : 1}}><Text style = {{fontSize : 24}}>계좌번호 등록</Text></View>,
            headerRight : <Text style = {{marginRight : 20}}></Text>
        }
    },
    Signature : {
        screen : SignatureScreen,
        navigationOptions : {
            headerTitle : <View style={{alignItems: "center", flex : 1}}><Text style = {{fontSize : 24}}>전자서명 등록</Text></View>,
            headerRight : <Text style = {{marginRight : 20}}></Text>
        }
    },
    SaveDocument : {
        screen : SaveDocumentScreen,
        navigationOptions : {
            headerTitle : <View style={{alignItems: "center", flex : 1}}><Text style = {{fontSize : 24}}>작성중인 계약서</Text></View>,
            headerRight : <Text style = {{marginRight : 20}}></Text>
        }
    },
    DocumentImage : {
        screen : DocumentImageScreen,
        navigationOptions : {
            headerTitle : <View style={{alignItems: "center", flex : 1}}><Text style = {{fontSize : 24}}>근로계약서 이미지</Text></View>,
            headerRight : <Text style = {{marginRight : 20}}></Text>
        }
    }
})

const MoreStack = createStackNavigator({
    More : {
        screen : MoreScreen,
        navigationOptions : {
            headerTitle : <View style={{alignItems: "center", flex : 1}}><Text style = {{fontSize : 24}}>더보기</Text></View>,
        }
    },
    Notice:{
        screen : NoticeScreen,
        navigationOptions : {
            headerTitle : <View style={{alignItems: "center", flex : 1}}><Text style = {{fontSize : 24}}>공지사항</Text></View>,
            headerRight : <Text style = {{marginRight : 20}}></Text>
        }
    },
    WorkRegistration : {
        screen : WorkRegistrationScreen,
        navigationOptions : {
            headerTitle : <View style={{alignItems: "center", flex : 1}}><Text style = {{fontSize : 24}}>구인 등록</Text></View>,
            headerRight : <Text style = {{marginRight : 20}}></Text>
        }
    },
    DocumentRegistration : {
        screen: DocumentRegistrationScreen,
        navigationOptions : {
            headerTitle : <View style={{alignItems: "center", flex : 1}}><Text style = {{fontSize : 24}}>전자근로계약서 등록</Text></View>,
            headerRight : <Text style = {{marginRight : 20}}></Text>
            
        }
    },
    Questions : {
        screen: QuestionsScreen,
        navigationOptions : {
            headerTitle : <View style={{alignItems: "center", flex : 1}}><Text style = {{fontSize : 24}}>문의사항</Text></View>,
            headerRight : <Text style = {{marginRight : 20}}></Text>
        }
    },
    CheckRequest : {
        screen : CheckRequestScreen,
        navigationOptions : {
            headerTitle : <View style={{alignItems: "center", flex : 1}}><Text style = {{fontSize : 24}}>나의 구인글(기업)</Text></View>,
            headerRight : <Text style = {{marginRight : 20}}></Text>
        }
    },
    RequestList : {
        screen : RequestListScreen,
        navigationOptions : {
            headerTitle : <View style={{alignItems: "center", flex : 1}}><Text style = {{fontSize : 24}}>신청자 목록</Text></View>,
            headerRight : <Text style = {{marginRight : 20}}></Text>
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
  Register : RegisterScreen,
  RegisterUser : RegisterUserScreen,
  RegisterCompany : RegisterCompanyScreen
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