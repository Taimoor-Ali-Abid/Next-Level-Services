import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../Screens/LoginScreen/LoginScreen";
import SignUpScreen from "../Screens/SignUpScreen/SignUp";
import ForgotPassword from "../Screens/ForgotPassword/Forgot";
import NewPassword from "../Screens/NewPassword/NewPassword";
//import PreQrScan1 from "../Screens/Preqrscan-web/PreQrScan1";
//import PreQrScan2 from "../Screens/Preqrscan-web/PreQrScan2";
import HomeScreen from "../Screens/HomeScreen/HomeScreen";
import ProfileSettingScreen from "../Screens/ProfileSettings/ProfileSettingScreen";
import SettingsScreen from "../Screens/ProfileSettings/SettingsScreen";
import BalanceScreen from "../Screens/BalanceScreen/BalanceScreen";
import BalanceScreenTwo from "../Screens/BalanceScreen/BalanceScreenTwo";
import SplashScreens from "../Screens/SplashScreen/SplashScreen";
import BalanceScreenThree from "../Screens/BalanceScreen/BalanceScreenThree";
import RewardScreen from "../Screens/RewardScreen/RewardScreen";
import RewardScreenT from "../Screens/RewardScreen/RewardScreenT";
import RewardScreenZ from "../Screens/RewardScreen/RewardScreenZ";
import TransactionScreen from "../Screens/TransactionScreen/TransactionScreen";
import PhoneAuthScreen from "../Screens/authscreen/PhoneAuthScreen";
import ChatScreen from "../Screens/chatScreen/ChatScreen";
import GroupChatScreen from "../Screens/chatScreen/GroupChat";
import GroupChatRoom from "../Screens/chatScreen/GroupChatRoom";
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="SignUp" screenOptions={{headerShown:false}}>
        <Stack.Screen
            name="Login"
            component={LoginScreen}
    
        />
        <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
        />
        <Stack.Screen   
            name="ForgotPassword"
            component={ForgotPassword}
            />
        <Stack.Screen
            name="NewPassword"
            component={NewPassword}
            />
        {/* <Stack.Screen
            name="PreQrScan1"
            component={PreQrScan1}
            />
        <Stack.Screen
            name="PreQrScan2"
            component={PreQrScan2}
            /> */}
        <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            />
        <Stack.Screen
            name="ProfileSettingScreen"
            component={ProfileSettingScreen}
            />
        <Stack.Screen
            name="SettingsScreen"
            component={SettingsScreen}
            />
        <Stack.Screen
            name="BalanceScreen"
            component={BalanceScreen}
            />
        <Stack.Screen
            name="BalanceScreenTwo"
            component={BalanceScreenTwo}
            />
        <Stack.Screen
            name="SplashScreens"
            component={SplashScreens}
        />
        <Stack.Screen
            name="BalanceScreenThree"
            component={BalanceScreenThree}
            />
        <Stack.Screen
            name="RewardScreen"
            component={RewardScreen}
            />
        <Stack.Screen
            name="RewardScreenT"
            component={RewardScreenT}
            />
        <Stack.Screen
            name="RewardScreenZ"
            component={RewardScreenZ}
            />
        <Stack.Screen   
                name="TransactionScreen"
                component={TransactionScreen}
                />
        <Stack.Screen
            name="PhoneAuthScreen"
            component={PhoneAuthScreen}
            />
        <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            />
        <Stack.Screen
            name="GroupChatScreen"
            component={GroupChatScreen}
            />
        <Stack.Screen
            name="GroupChatRoom"
            component={GroupChatRoom}
            />
        </Stack.Navigator>
        

    );
}
export default AppNavigator;